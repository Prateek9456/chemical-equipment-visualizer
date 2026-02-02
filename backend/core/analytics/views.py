from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.utils.timezone import now
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import pandas as pd

from analytics.models import Dataset
from analytics.serializers import DatasetSerializer


@api_view(["POST"])
def upload_csv(request):
    file = request.FILES.get("file")
    if not file:
        return Response({"error": "No file provided"}, status=400)

    df = pd.read_csv(file)

    required_columns = {
        "equipment_type",
        "flow_rate",
        "pressure",
        "temperature",
    }

    if not required_columns.issubset(df.columns):
        return Response(
            {"error": "CSV does not match required format"},
            status=400,
        )

    summary = {
        "total_equipment": len(df),
        "average_flowrate": round(df["flow_rate"].mean(), 2),
        "average_pressure": round(df["pressure"].mean(), 2),
        "average_temperature": round(df["temperature"].mean(), 2),
        "type_distribution": df["equipment_type"].value_counts().to_dict(),
    }

    Dataset.objects.create(name=file.name, summary=summary)

    ids = list(
        Dataset.objects.order_by("uploaded_at")
        .values_list("id", flat=True)
    )
    if len(ids) > 5:
        Dataset.objects.filter(id__in=ids[:-5]).delete()

    return Response(summary)


@api_view(["GET"])
def history(request):
    datasets = Dataset.objects.order_by("-uploaded_at")[:5]
    return Response(DatasetSerializer(datasets, many=True).data)


@api_view(["GET"])
def generate_report(request):
    latest = Dataset.objects.last()
    if not latest:
        return Response({"error": "No data available"}, status=400)

    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="report.pdf"'

    p = canvas.Canvas(response, pagesize=A4)
    width, height = A4

    y = height - 50
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, y, "Chemical Equipment Analytics Report")

    y -= 30
    p.setFont("Helvetica", 10)
    p.drawString(50, y, f"Generated on: {now()}")

    y -= 30
    for k, v in latest.summary.items():
        if k != "type_distribution":
            p.drawString(60, y, f"{k.replace('_',' ').title()}: {v}")
            y -= 15

    y -= 20
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Equipment Distribution")

    y -= 20
    p.setFont("Helvetica", 10)
    for k, v in latest.summary["type_distribution"].items():
        p.drawString(60, y, f"{k}: {v}")
        y -= 15

    p.showPage()
    p.save()
    return response
