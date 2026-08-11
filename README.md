# California House Price Prediction Interface

This project contains an interactive React frontend and a FastAPI backend to run predictions using the scikit-learn machine learning model saved in `notebooks/house_price_model.joblib`.

---

## 🚀 How to Run the Project

### Prerequisites
Make sure you have:
1. **Python 3.8+** installed.
2. **Node.js** and **npm** installed.

---

### Step 1: Run the Backend API

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   python run.py
   ```
The backend API will start running on **`http://127.0.0.1:8000`**. You can view the interactive Swagger documentation at `http://127.0.0.1:8000/docs`.

---

### Step 2: Run the React Frontend

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
The web application will launch at **`http://localhost:5173/`**.

---

## 🎨 Features Implemented

- **California Presets**: Instantly fill coordinates and details for San Francisco, Los Angeles, San Diego, Fresno, and Lake Tahoe.
- **Computed Metrics**: Ratios such as *Rooms per Household*, *Bedrooms per Room*, and *Occupancy* are computed in real-time as inputs are adjusted.
- **Interactive Price Indicator**: The predicted price counts up dynamically, color-coding into affordable, moderate, upscale, or luxury tiers.
- **Premium Glassmorphic Design**: Built with a sleek dark theme, responsive grid layouts, custom slider styles, and micro-animations.
