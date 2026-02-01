import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QPushButton, QLabel,
    QFileDialog, QVBoxLayout
)

from api import upload_csv
from charts import render_pie_chart
from table import render_table


class App(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setGeometry(200, 200, 600, 600)

        self.layout = QVBoxLayout()

        self.upload_btn = QPushButton("Upload CSV")
        self.upload_btn.clicked.connect(self.upload_file)

        self.metrics = QLabel("Upload a CSV file to view analytics")

        self.chart_container = QWidget()
        self.chart_container.setLayout(QVBoxLayout())

        self.table_container = QWidget()
        self.table_container.setLayout(QVBoxLayout())

        self.layout.addWidget(self.upload_btn)
        self.layout.addWidget(self.metrics)
        self.layout.addWidget(self.chart_container)
        self.layout.addWidget(self.table_container)

        self.setLayout(self.layout)

    def upload_file(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV File", "", "CSV Files (*.csv)"
        )

        if not file_path:
            return

        data = upload_csv(file_path)

        self.metrics.setText(
            f"Total Equipment: {data['total_equipment']}\n"
            f"Avg Flowrate: {data['average_flowrate']}\n"
            f"Avg Pressure: {data['average_pressure']}\n"
            f"Avg Temperature: {data['average_temperature']}"
        )

        render_pie_chart(self.chart_container, data["type_distribution"])
        render_table(self.table_container, data["type_distribution"])


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = App()
    window.show()
    sys.exit(app.exec_())
