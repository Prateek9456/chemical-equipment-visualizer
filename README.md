# Employee Attrition Prediction System

An end-to-end, modular ML system to predict employee attrition, expose predictions via APIs, visualize insights through multiple UIs, and maintain audit + governance controls.

---

## 📌 Project Overview

This project predicts whether an employee is likely to leave an organization using historical HR data.  
It is built in **modular phases** so that data science, backend APIs, frontend dashboards, desktop tools, and governance can evolve independently.

### Core Goals
- Train and evaluate a robust attrition prediction model
- Serve predictions via REST APIs
- Provide both web and desktop interfaces
- Ensure logging, auditability, and governance
- Maintain clean Git workflow and modular codebase

---

## 🧱 Architecture (High Level)


---

## ⚙️ What Has Been Implemented So Far

### ✅ Module 1 – Data & Model
- Dataset cleaning and preprocessing
- Feature encoding and scaling
- Model training (classification)
- Evaluation metrics (accuracy, precision, recall)
- Model persistence using `.pkl`

### ✅ Module 2 – Backend (FastAPI)
- REST API for predictions
- Input validation using Pydantic
- Model + preprocessing loaded at startup
- `/predict` endpoint fully functional
- Error handling and logging
- Deployment-ready structure

### ✅ Module 3 – UI (In Progress / Stable)
- **React UI (mod2-react)**
  - Form-based employee input
  - API integration
  - Prediction display
- **PyQt Desktop UI (mod3-pyqtv)**
  - Native desktop app
  - API consumption
  - Clean separation of UI and services

### ✅ Governance & Audit
- Logging of:
  - Requests
  - Predictions
  - Timestamps
- Basic governance rules scaffolded
- Audit report placeholders

---

## 🧠 How the System Works (Flow)

1. User enters employee details
2. UI sends request to FastAPI backend
3. Backend:
   - Validates input
   - Applies preprocessing pipeline
   - Loads trained model
   - Generates prediction
4. Prediction is:
   - Returned to UI
   - Logged for audit
5. Governance layer tracks usage & behavior

---

## 🧪 Git & Branch Strategy

### Branches Used
- `main` – stable production-ready code
- `feature/module-2-fastapi-db` – backend development
- `feature/module-3-audit-governance` – audit & governance
- `mod3-pyqtv` – PyQt UI work

### Practices
- Feature-based branching
- Merges only after stability
- Tags used for deployment milestones
- `.gitignore` configured for:
  - models
  - logs
  - environment files

---

## 🛠 Problems Faced & Solutions

| Problem | Solution |
|------|---------|
Model reload latency | Load model once at app startup |
CORS issues | FastAPI CORS middleware |
Mismatch between UI & API schema | Centralized Pydantic schemas |
Deployment issues on Render | Environment-based configs |
Offline Render confusion | Services stopped safely; no billing |

---

## 🚧 What Is Left To Do

### 🔜 Immediate Next Steps
- UI/UX polishing (React & PyQt)
- Better error messages
- Audit report generation
- Governance rules enforcement
- Role-based access (optional)

### 🔮 Future Enhancements
- Model retraining pipeline
- Database integration
- User authentication
- Admin dashboard
- Model explainability (SHAP)

---

## ▶️ How to Run

```bash
pip install -r requirements.txt
uvicorn src.api.main:app --reload
