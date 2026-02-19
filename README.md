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
└── README.md
```

---

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
