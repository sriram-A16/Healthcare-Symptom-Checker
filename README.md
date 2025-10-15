# 🩺 Symptom Checker App

A full-stack healthcare assistant built with the MERN stack and Google Gemini AI. Users can enter symptoms to receive possible medical conditions and precautions. Queries are stored in MongoDB and can be viewed in history.

---

## 🚀 Features

- AI-powered symptom analysis using Google Gemini
- Responsive UI with glassmorphism and animations
- Markdown rendering for structured output
- Query history stored in MongoDB
- Toggle to view recent queries (clears previous output)

---

## 🛠 Technologies Used

- **Frontend**: React, Axios, Marked, DOMPurify
- **Backend**: Node.js, Express, Mongoose
- **AI Model**: Google Generative AI (Gemini)
- **Database**: MongoDB
- **Styling**: CSS (custom animations, gradients)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/symptom-checker.git
cd symptom-checker
```

2.  **Setup the Backend:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install the required npm packages:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `backend` directory. This file will store your secret keys. Add the following variables, replacing the placeholder values with your actual credentials:

        ```
        # .env

        # Your MongoDB connection string
        MONGO_URI=mongodb://localhost:27017/symptomchecker

        # Your Google Gemini API Key
        GOOGLE_API_KEY="your-google-api-key-here"

        # Or, if you are using OpenAI
        # OPENAI_API_KEY="your-openai-api-key-here"
        ```

3.  **Setup the Frontend:**
    * Navigate to the frontend directory from the root folder:
        ```bash
        cd ../frontend
        ```
    * Install the required npm packages:
        ```bash
        npm install
        ```

---

## Running the Application

You need to have both the backend and frontend servers running simultaneously in two separate terminals.

1.  **Start the Backend Server:**
    * From the `backend` directory, run:
        ```bash
        node index.js
        ```
    * The server should now be running on `http://localhost:5000`.

2.  **Start the Frontend Application:**
    * From the `frontend` directory, run:
        ```bash
        npm start
        ```
    * The React development server will open a new tab in your browser at `http://localhost:3000`.

You can now use the application by entering symptoms in the text area and submitting the form.











Tools

2.5 Pro


