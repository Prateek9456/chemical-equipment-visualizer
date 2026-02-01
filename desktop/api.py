import requests

BASE_URL = "http://127.0.0.1:8000/api"


def upload_csv(file_path):
    url = f"{BASE_URL}/upload/"
    with open(file_path, "rb") as f:
        response = requests.post(
            url,
            files={"file": f}
        )
    response.raise_for_status()
    return response.json()
