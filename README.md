# Chemical Equipment Visualizer

A visualization-focused application designed to represent **chemical engineering equipment** (reactors, distillation columns, heat exchangers, etc.) in an interactive and understandable way.

The project focuses on **visual clarity, modular structure, and educational usability**, rather than heavy numerical simulation.

---

## 🎯 Project Purpose

The Chemical Equipment Visualizer is built to:
- Help students and learners **visualize chemical equipment**
- Represent **structure, components, and flow paths**
- Provide an interactive UI instead of static textbook diagrams
- Act as a foundation for future extensions like:
  - Parameter inputs
  - Animations
  - Simulation overlays

---

## 🧠 What the Project Is (and Is NOT)

### ✅ It IS
- A **visualization tool**
- UI + logic separation
- Equipment-centric
- Modular and extensible
- Focused on clarity and correctness of representation

### ❌ It is NOT (yet)
- A full CFD simulator
- A thermodynamics solver
- A process optimization engine

---

## 🧱 High-Level Architecture


---

## ⚙️ What Has Been Implemented So Far

### ✅ Core Structure
- Clean separation of:
  - UI
  - Equipment logic
  - Rendering logic
- Base equipment class created to enforce consistency

### ✅ Visualization Layer
- Canvas-based drawing system
- Coordinate-based rendering
- Equipment drawn programmatically (not static images)

### ✅ Equipment Modules
- Individual files per equipment type
- Shared interface for:
  - Dimensions
  - Input/output ports
  - Labels

### ✅ UI
- Main window layout finalized
- Equipment selection controls
- Canvas refresh logic working correctly

---

## 🔁 How the Application Works

1. Application starts from `run.py`
2. Main window initializes UI components
3. User selects equipment type
4. Corresponding equipment class is instantiated
5. Equipment is rendered on canvas
6. Connections / flow paths are displayed
7. UI updates dynamically on interaction

---

## 🧪 Git Structure & Workflow

### Branching
- `main` → stable, working visualizer
- `feature/equipment-*` → individual equipment additions
- `ui-refactor` → UI improvements

### Practices
- One equipment = one module
- No direct UI logic inside equipment classes
- Frequent small commits
- Clear commit messages

---

## 🚧 Problems Faced & How They Were Solved

| Problem | Solution |
|------|---------|
Messy UI logic | Strict UI–logic separation |
Hardcoded dimensions | Centralized constants |
Re-render flickering | Controlled canvas refresh |
Scaling issues | Relative coordinate system |

---

## 🔜 What Needs to Be Done Next

### Immediate
- UI/UX polishing
- Better labeling & legends
- Equipment interconnection visualization
- Flow animation (basic)

### Future Enhancements
- Parameter sliders (temp, pressure, flow rate)
- Step-by-step operation mode
- Export diagrams
- Simulation overlay (optional)

---

## ▶️ How to Run

```bash
pip install -r requirements.txt
python run.py
