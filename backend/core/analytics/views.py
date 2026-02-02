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

    total_equipment = len(df)
    average_flowrate = round(df["flow_rate"].mean(), 2)
    average_pressure = round(df["pressure"].mean(), 2)
    average_temperature = round(df["temperature"].mean(), 2)
    type_distribution = df["equipment_type"].value_counts().to_dict()

    summary = {
        "total_equipment": total_equipment,
        "average_flowrate": average_flowrate,
        "average_pressure": average_pressure,
        "average_temperature": average_temperature,
        "type_distribution": type_distribution,
    }

    Dataset.objects.create(
        name=file.name,
        summary=summary
    )

    # Keep only last 5 uploads
    excess = Dataset.objects.count() - 5
    if excess > 0:
        Dataset.objects.all().order_by("uploaded_at")[:excess].delete()

    return Response(summary)


@api_view(["GET"])
def history(request):
    datasets = Dataset.objects.all().order_by("-uploaded_at")[:5]
    serializer = DatasetSerializer(datasets, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def generate_report(request):
    latest = Dataset.objects.last()
    if not latest:
        return Response({"error": "No dataset available"}, status=400)

    response = HttpResponse(content_type="application/pdf")
    response["Content-Disposition"] = 'attachment; filename="equipment_report.pdf"'

    p = canvas.Canvas(response, pagesize=A4)
    width, height = A4
    y = height - 50

    # Title
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, y, "Chemical Equipment Analytics Report")

    # Timestamp
    y -= 30
    p.setFont("Helvetica", 10)
    p.drawString(
        50,
        y,
        f"Generated on: {now().strftime('%Y-%m-%d %H:%M:%S')}"
    )

    # Summary metrics
    y -= 40
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Summary Metrics")

    y -= 20
    p.setFont("Helvetica", 10)
    summary = latest.summary

    p.drawString(60, y, f"Total Equipment: {summary['total_equipment']}")
    y -= 15
    p.drawString(60, y, f"Average Flow Rate: {summary['average_flowrate']}")
    y -= 15
    p.drawString(60, y, f"Average Pressure: {summary['average_pressure']}")
    y -= 15
    p.drawString(60, y, f"Average Temperature: {summary['average_temperature']}")

    # Equipment distribution
    y -= 30
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, y, "Equipment Type Distribution")

    y -= 20
    p.setFont("Helvetica", 10)
    for equipment, count in summary["type_distribution"].items():
        p.drawString(60, y, f"{equipment}: {count}")
        y -= 15

    p.showPage()
    p.save()

    return response
