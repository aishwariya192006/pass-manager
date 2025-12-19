# Smart Warranty & Bill Management System

A MERN stack application for digitally managing product warranties and bills.

## Features

- Upload and store bill images
- Track warranty expiration dates
- Visual status indicators (Active/Expired)
- Automatic expiry date calculation
- Delete unwanted records

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start MongoDB service on your system

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

### Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure
```
mern stack/
├── backend/
│   ├── models/
│   │   └── Bill.js
│   ├── routes/
│   │   └── bills.js
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BillForm.js
    │   │   └── BillCard.js
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```

## Technology Stack
- **Frontend**: React.js, Axios, CSS
- **Backend**: Node.js, Express.js, Multer
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer for image handling