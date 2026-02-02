import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from .models import Dataset
from .serializers import DatasetSerializer


EXPECTED_COLUMNS = {
    "type": ["type", "equipment type", "equipment"],
    "flowrate": ["flowrate", "flow rate", "flow_rate"],
    "pressure": ["pressure", "pressure(bar)", "pressure bar"],
    "temperature": ["temperature", "temp", "temp(c)", "temp c"],
}


def normalize_columns(df):
    df.columns = [c.strip().lower() for c in df.columns]

    rename_map = {}
    for target, aliases in EXPECTED_COLUMNS.items():
        for col in df.columns:
            if col in aliases:
                rename_map[col] = target

    df = df.rename(columns=rename_map)
    return df


@api_view(["POST"])
def upload_csv(request):
    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    df = pd.read_csv(file)
    df = normalize_columns(df)

    required = ["type", "flowrate", "pressure", "temperature"]
    missing = [col for col in required if col not in df.columns]
    if missing:
        return Response(
            {"error": f"Missing required columns: {missing}"},
            status=400,
        )

    summary = {
        "total_equipment": int(len(df)),
        "average_flowrate": round(df["flowrate"].mean(), 2),
        "average_pressure": round(df["pressure"].mean(), 2),
        "average_temperature": round(df["temperature"].mean(), 2),
        "type_distribution": df["type"].value_counts().to_dict(),
    }

    Dataset.objects.create(name=file.name, summary=summary)

    excess = Dataset.objects.count() - 5
    if excess > 0:
        ids = Dataset.objects.order_by("uploaded_at").values_list("id", flat=True)[:excess]
        Dataset.objects.filter(id__in=list(ids)).delete()

    return Response(summary)


@api_view(["GET"])
def history(request):
    datasets = Dataset.objects.order_by("-uploaded_at")[:5]
    serializer = DatasetSerializer(datasets, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def generate_report(request):
    dataset = Dataset.objects.order_by("-uploaded_at").first()
    if not dataset:
        return Response({"error": "No data available"}, status=400)

    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 50
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, y, "Chemical Equipment Analytics Report")

    y -= 40
    p.setFont("Helvetica", 11)
    for key, value in dataset.summary.items():
        p.drawString(50, y, f"{key}: {value}")
        y -= 20

    p.showPage()
    p.save()

    buffer.seek(0)
    return HttpResponse(buffer, content_type="application/pdf")
