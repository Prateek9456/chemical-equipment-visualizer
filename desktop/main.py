import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QPushButton,
    QFileDialog, QLabel, QHBoxLayout
)
from PyQt5.QtCore import QTimer, Qt
from PyQt5.QtGui import QFont

from api import upload_csv
from charts import render_pie_chart
from table import render_table
from theme import LIGHT_THEME, DARK_THEME


class Splash(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowFlags(Qt.FramelessWindowHint)
        self.setFixedSize(420, 300)

        layout = QVBoxLayout(self)
        layout.setAlignment(Qt.AlignCenter)

        title = QLabel("Chemical Equipment Analytics")
        title.setFont(QFont("Inter", 16, QFont.Bold))
        subtitle = QLabel("Visualizing industrial data intelligently")
        subtitle.setStyleSheet("opacity: 0.6")

        layout.addWidget(title)
        layout.addWidget(subtitle)


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.resize(1000, 700)

        self.theme = "light"
        self.setStyleSheet(LIGHT_THEME)

        self.layout = QVBoxLayout(self)
        self.layout.setContentsMargins(24, 24, 24, 24)

        # Top bar
        top_bar = QHBoxLayout()
        self.theme_btn = QPushButton("🌙 Dark")
        self.theme_btn.clicked.connect(self.toggle_theme)
        top_bar.addStretch()
        top_bar.addWidget(self.theme_btn)
        self.layout.addLayout(top_bar)

        # Upload button
        self.upload_btn = QPushButton("Upload CSV")
        self.upload_btn.clicked.connect(self.handle_upload)
        self.layout.addWidget(self.upload_btn)

        # Metrics
        self.metrics = QLabel("")
        self.metrics.setWordWrap(True)
        self.layout.addWidget(self.metrics)

        # Chart + Table containers
        self.chart_container = QWidget()
        self.layout.addWidget(self.chart_container)

        self.table_container = QWidget()
        self.layout.addWidget(self.table_container)

    def toggle_theme(self):
        if self.theme == "light":
            self.setStyleSheet(DARK_THEME)
            self.theme_btn.setText("☀️ Light")
            self.theme = "dark"
        else:
            self.setStyleSheet(LIGHT_THEME)
            self.theme_btn.setText("🌙 Dark")
            self.theme = "light"

    def handle_upload(self):
        path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV", "", "CSV Files (*.csv)"
        )
        if not path:
            return

        data = upload_csv(path)

        self.metrics.setText(
            f"Total Equipment: {data['total_equipment']}\n"
            f"Average Flowrate: {data['average_flowrate']:.2f}\n"
            f"Average Pressure: {data['average_pressure']:.2f}\n"
            f"Average Temperature: {data['average_temperature']:.2f}"
        )

        render_pie_chart(
            self.chart_container,
            data["type_distribution"]
        )

        render_table(
            self.table_container,
            data["type_distribution"]
        )


def main():
    app = QApplication(sys.argv)

    splash = Splash()
    splash.show()

    app.main_window = None

    def start_main():
        splash.close()
        app.main_window = MainWindow()
        app.main_window.show()

    QTimer.singleShot(2000, start_main)
    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
