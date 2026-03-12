# Enterprise Service Portal

## Overview

The **Enterprise Service Portal** is a full-stack web application designed to manage and access enterprise services through a centralized platform. It provides a responsive interface and a scalable backend for handling service requests and data management.

## Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Version Control:** Git & GitHub

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd enterprise-service-portal
```

### 2. Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create a `.env` file inside the **backend** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm start
```

Frontend runs on **http://localhost:3000** and backend on **http://localhost:5000**.

## Assumptions

* MongoDB connection string is provided in the `.env` file.
* Node.js and npm are installed on the system.
* Backend and frontend run locally during development.
