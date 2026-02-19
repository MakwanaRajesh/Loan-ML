<<<<<<< HEAD
# 🔮 LoanPredict — Full Stack AI Loan Risk App

Built by **Hurii** | [Instagram](https://instagram.com/rajesh_1oo3) · [LinkedIn](https://www.linkedin.com/in/rajesh-makwana-397913328)

---

## 📁 Project Structure

```
loanpredict/
├── backend/
│   └── app.py              ← Enhanced Flask API (auth + history + predict)
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx       ← Beautiful landing page
│   │   │   ├── AuthPages.jsx     ← Login + Register
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx     ← Stats + recent predictions
│   │   │   ├── Predict.jsx       ← Full prediction form
│   │   │   └── History.jsx       ← Full history with delete
│   │   └── components/
│   │       └── Navbar.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
=======
# 🏦 LoanPredict — Full Stack Loan Approval Prediction System

LoanPredict is a **Full Stack Machine Learning Web Application** that predicts whether a loan will be **Approved or Rejected** based on applicant details. It integrates a trained ML model with a secure backend and a modern frontend dashboard.

This project demonstrates real-world implementation of:

* Machine Learning Model Deployment
* REST API Development
* Authentication using JWT
* Database Integration
* Full Stack Application Development

---

# 🚀 Live Features

## 👤 User Features

* User Registration & Login (Secure JWT Authentication)
* Loan Approval Prediction using ML Model
* Prediction History Tracking
* User Dashboard
* Modern and responsive UI

## 🤖 Machine Learning Features

* Trained Loan Approval Prediction Model
* Real-time predictions via API
* Uses Scikit-Learn trained model (`loan_model.pkl`)
* Handles user input and converts to ML-ready format

## 🔐 Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Secure database storage

---

# 🧠 Machine Learning Model

The ML model predicts loan approval based on:

* Age
* Income
* Loan Amount
* Credit Score
* Employment Status
* Marital Status
* Education
* Employment Type

### ML Stack Used

* Scikit-Learn
* Pandas
* Joblib / Pickle

---

# 🛠️ Tech Stack

## Frontend

* React.js (Vite)
* JavaScript
* HTML5
* CSS3

## Backend

* Flask
* Flask-JWT-Extended
* Flask-SQLAlchemy
* Flask-CORS

## Database

* SQLite (can be upgraded to MySQL/PostgreSQL)

## Machine Learning

* Scikit-Learn
* Pandas
* Joblib

---

# 📁 Project Structure

```
loan_project/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── loan_model.pkl
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
>>>>>>> aa0c8f4465a1e632abcc2a261a8ef6046415e5b2
└── README.md
```

---

<<<<<<< HEAD
## ⚡ Quick Setup

### 1. Backend Setup

```bash
cd backend

# Install dependencies
pip install flask flask-cors flask-sqlalchemy flask-jwt-extended bcrypt pandas scikit-learn

# Place your model file
cp /path/to/loan_model.pkl .

# Run the server
python app.py
# → Runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
# → Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/predict` | Run ML prediction (auth required) |
| GET | `/api/history` | Get user's prediction history |
| DELETE | `/api/history/:id` | Delete a prediction |
| GET | `/api/stats` | Get user statistics |

---

## 🎨 Features

- **Landing Page** — Beautiful dark hero with animations
- **Authentication** — JWT-based login/register with bcrypt passwords
- **Predict Form** — All 10 input fields with live credit score indicator
- **Dashboard** — Stats cards, progress bar, recent predictions
- **History** — Full table with filter (All/Safe/Risk), delete, averages
- **Persistent Storage** — SQLite database via SQLAlchemy
- **CORS** — Configured for localhost:5173 and 3000

---

## 🧠 Model Input Fields

| Field | Type | Notes |
|-------|------|-------|
| Age | int | e.g. 28 |
| Income | float | Annual in ₹ |
| LoanAmount | float | In ₹ |
| CreditScore | int | 300–850 |
| MonthsEmployed | int | Work history |
| InterestRate | float | % |
| DTIRatio | float | 0.0–1.0 |
| Education | string | High School/Bachelor's/Master's/PhD |
| EmploymentType | string | Full-time/Part-time/Self-employed/Unemployed |
| MaritalStatus | string | Single/Married/Divorced |

Static defaults (set by backend):
- NumCreditLines: 2
- LoanTerm: 36
- HasMortgage: No
- HasDependents: No
- LoanPurpose: Other
- HasCoSigner: No

---

## 🔐 Security Notes

- Change `JWT_SECRET_KEY` in `app.py` before deploying
- Passwords are hashed with bcrypt
- All prediction endpoints require valid JWT token

---

*Built with ❤️ by Hurii*
=======
# ⚙️ Backend Installation

## Step 1: Go to backend folder

```
cd backend
```

## Step 2: Create virtual environment

```
python -m venv venv
```

Activate environment:

Windows:

```
venv\Scripts\activate
```

Mac/Linux:

```
source venv/bin/activate
```

## Step 3: Install dependencies

```
pip install -r requirements.txt
```

## Step 4: Place trained model

Place:

```
loan_model.pkl
```

inside backend folder.

## Step 5: Run backend server

```
python app.py
```

Server runs at:

```
http://localhost:5000
```

---

# ⚙️ Frontend Installation

## Step 1: Go to frontend folder

```
cd frontend
```

## Step 2: Install dependencies

```
npm install
```

## Step 3: Run frontend

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Authentication

### Register

```
POST /register
```

### Login

```
POST /login
```

---

## Prediction

### Predict Loan Approval

```
POST /predict
```

Requires JWT Token

---

## History

### Get Prediction History

```
GET /history
```

Requires JWT Token

---

# 🧪 Example Prediction Input

```
{
  "age": 25,
  "income": 50000,
  "loan_amount": 200000,
  "credit_score": 720,
  "employment_status": "Employed",
  "education": "Bachelor",
  "marital_status": "Single"
}
```

---

# 📊 How It Works

1. User registers and logs in
2. JWT token is generated
3. User enters loan details
4. Backend sends data to ML model
5. Model predicts loan approval
6. Result is saved in database
7. User can view prediction history

---

# 💾 Database Tables

## Users Table

* id
* name
* email
* password

## Predictions Table

* id
* user_id
* input data
* prediction result
* timestamp

---

# 🌍 Deployment Options

You can deploy using:

Frontend:

* Vercel
* Netlify
* Railway

Backend:

* Railway
* Render
* AWS
* PythonAnywhere

Database:

* SQLite (local)
* MySQL
* PostgreSQL

---

# 🎯 Learning Outcomes

This project demonstrates:

* ML Model Deployment
* Full Stack Development
* Authentication & Security
* API Development
* Database Integration
* Production-ready Architecture

---

# 🔮 Future Improvements

* Deploy ML model using Docker
* Use PostgreSQL database
* Add Admin Dashboard
* Add Model Accuracy Display
* Improve UI/UX
* Add more ML features

---

# 👨‍💻 Author

**Rajesh Makwana**

B.Tech Software Engineering Student
Machine Learning & Full Stack Developer

GitHub: https://github.com/MakwanaRajesh

---

# ⭐ If you like this project

Please give it a ⭐ on GitHub!

---
>>>>>>> aa0c8f4465a1e632abcc2a261a8ef6046415e5b2
