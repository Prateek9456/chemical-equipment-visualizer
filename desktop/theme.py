LIGHT_THEME = """
QWidget {
    background-color: #f8fafc;
    color: #020617;
    font-family: Inter, Segoe UI, sans-serif;
    font-size: 13px;
}

QPushButton {
    background-color: #2563eb;
    color: white;
    border-radius: 8px;
    padding: 8px 16px;
}

QPushButton:hover {
    background-color: #1d4ed8;
}

QPushButton:disabled {
    background-color: #94a3b8;
}

QTableWidget {
    background-color: white;
    border: none;
    gridline-color: #e5e7eb;
}

QHeaderView::section {
    background-color: #f1f5f9;
    padding: 6px;
    border: none;
    font-weight: bold;
}
"""

DARK_THEME = """
QWidget {
    background-color: #020617;
    color: #e5e7eb;
    font-family: Inter, Segoe UI, sans-serif;
    font-size: 13px;
}

QPushButton {
    background-color: #38bdf8;
    color: #020617;
    border-radius: 8px;
    padding: 8px 16px;
}

QPushButton:hover {
    background-color: #0ea5e9;
}

QPushButton:disabled {
    background-color: #475569;
}

QTableWidget {
    background-color: #020617;
    border: none;
    gridline-color: #334155;
}

QHeaderView::section {
    background-color: #020617;
    padding: 6px;
    border: none;
    font-weight: bold;
}
"""
