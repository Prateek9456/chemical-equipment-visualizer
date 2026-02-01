from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg
from matplotlib.figure import Figure


def render_pie_chart(container, data):
    for i in reversed(range(container.layout().count())):
        container.layout().itemAt(i).widget().setParent(None)

    figure = Figure(figsize=(4, 4))
    canvas = FigureCanvasQTAgg(figure)
    ax = figure.add_subplot(111)

    ax.pie(
        data.values(),
        labels=data.keys(),
        autopct="%1.1f%%",
        startangle=90
    )
    ax.set_title("Equipment Type Distribution")

    container.layout().addWidget(canvas)
