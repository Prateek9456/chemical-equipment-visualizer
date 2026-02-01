from PyQt5.QtWidgets import QTableWidget, QTableWidgetItem, QVBoxLayout


def render_table(container, data):
    for i in reversed(range(container.layout().count())):
        container.layout().itemAt(i).widget().setParent(None)

    table = QTableWidget()
    table.setRowCount(len(data))
    table.setColumnCount(2)
    table.setHorizontalHeaderLabels(["Equipment Type", "Count"])

    for row, (key, value) in enumerate(data.items()):
        table.setItem(row, 0, QTableWidgetItem(key))
        table.setItem(row, 1, QTableWidgetItem(str(value)))

    layout = QVBoxLayout()
    layout.addWidget(table)
    container.setLayout(layout)
