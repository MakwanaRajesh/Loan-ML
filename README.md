# 🏦 Loan Default Prediction System (Full-Stack ML Project)

A full-stack Machine Learning web application that predicts whether a loan applicant is likely to default or not. This system helps financial institutions make smarter lending decisions using Machine Learning.

🌐 **Live Demo:** https://loan-predict-nine.vercel.app/

---

# 📌 Project Overview

The Loan Default Prediction System uses a trained Machine Learning model integrated into a full-stack web application. Users can register, log in, enter loan details, and instantly receive a prediction.

This project demonstrates:

* Machine Learning model development
* Backend API development
* JWT authentication
* Database integration
* Frontend development
* Full deployment (Frontend + Backend)

---

# 🚀 Features

## 👤 User Authentication

* User registration
* User login
* Secure password hashing using bcrypt
* JWT-based authentication

## 🤖 Machine Learning Prediction

* Predict loan default risk
* Real-time prediction using trained ML model
* Fast and accurate predictions

## 📊 Dashboard & History

* View prediction history
* Track previous predictions
* User-specific data storage

## 🌐 Full Stack Deployment

* Frontend deployed on Vercel
* Backend API deployed
* Production-ready architecture

---

# 🧠 Machine Learning Details

## Model Used

* Random Forest Classifier

## Libraries Used

* scikit-learn
* pandas
* numpy
* pickle

## ML Workflow

1. Data collection
2. Data preprocessing
3. Feature selection
4. Model training
5. Model evaluation
6. Model saving using pickle
7. Backend integration

---

# 🛠️ Tech Stack

## Frontend

* React.js (Vite)
* HTML5
* CSS3
* JavaScript
* Axios

## Backend

* Python
* Flask
* Flask-JWT-Extended
* Flask-SQLAlchemy
* bcrypt

## Database

* SQLite

## Machine Learning

* scikit-learn
* pandas
* numpy

## Deployment

* Frontend: Vercel
* Backend: Flask API

---

# 📂 Project Structure

```
LoanPredict_FullStack/
│
├── backend/
│   ├── app.py
│   ├── loan_model.pkl
│   ├── requirements.txt
│   ├── loanpredict.db
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Backend Setup

```
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

## Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 API Endpoints

## Authentication

Register

```
POST /api/auth/register
```

Login

```
POST /api/auth/login
```

Get User

```
GET /api/auth/me
```

---

## Prediction

Predict Loan Default

```
POST /api/predict
```

---

## History

Get History

```
GET /api/history
```

Delete History

```
DELETE /api/history/{id}
```

---

# 📈 Model Input Features

* Age
* Income
* Loan Amount
* Credit Score
* Employment Status
* Gender

---

# 🎯 Prediction Output

* Safe (Loan Approved)
* Risky (Loan Default Risk)

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Secure API endpoints

---

# 🌐 Live Deployment

Frontend:
https://loan-predict-nine.vercel.app/

Backend:
Flask API deployed

---

# 👨‍💻 Author

Rajesh Makwana

B.Tech Computer Engineering Student
Machine Learning & Full Stack Developer

---

# 🎓 Project Purpose

This project was developed for:

* Machine Learning learning
* Full Stack Development practice
* Placement portfolio
* Real-world ML application implementation

---

# ⭐ Future Improvements

* Improve model accuracy
* Add more features
* Use PostgreSQL database
* Deploy backend on cloud (Render / Railway / AWS)
* Add admin dashboard

---

# 📜 License

This project is for educational and portfolio purposes.
