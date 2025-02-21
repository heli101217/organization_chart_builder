# Organization Chart Builder

## Overview

The Organization Chart Builder is a minimal, interactive application that allows users to visualize and manage an organizational structure. It consists of a FastAPI backend and a React frontend, enabling users to view employee data and update reporting relationships through a drag-and-drop interface.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

- **app/**: Contains the FastAPI application code.
  - **main.py**: Entry point for the FastAPI application.
  - **models.py**: Defines SQLAlchemy models for employee data.
  - **schemas.py**: Contains Pydantic schemas for request and response validation.
  - **database.py**: Manages SQLite database connection and session.
  - **routers/**: Contains API endpoint definitions.
    - **employee.py**: Defines endpoints for employee data retrieval and updates.
- **requirements.txt**: Lists the dependencies required for the backend.
- **README.md**: Documentation for setting up and running the backend.

### Frontend

- **public/**: Contains static files for the React application.
  - **index.html**: Main HTML file serving as the entry point.
- **src/**: Contains the source code for the React application.
  - **components/**: Contains React components.
    - **EmployeeCard.tsx**: Displays an employee's name and title.
    - **OrgChart.tsx**: Renders the organization chart and handles drag-and-drop.
    - **LoadingIndicator.tsx**: Displays a loading indicator during API calls.
  - **App.tsx**: Main application component integrating the OrgChart.
  - **index.tsx**: Entry point for the React application.
  - **api.ts**: Functions for interacting with the FastAPI backend.
  - **styles.css**: Styles for the React application.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration file.
- **README.md**: Documentation for setting up and running the frontend.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the FastAPI application:
   ```
   uvicorn main:app --reload
   ```
4. Access the API at `http://localhost:8000`.

### Frontend

1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```
4. Access the application at `http://localhost:3000`.

## Technical Choices

- **Backend**: FastAPI was chosen for its simplicity and performance in building APIs. SQLite is used for easy setup and lightweight data storage.
- **Frontend**: React was selected for its component-based architecture, making it easy to manage UI state and interactions. TypeScript is used for type safety.

## Time Log

- Backend Development: 40 minutes
- Frontend Development: 60 minutes
- Integration: 15 minutes
- Documentation: 5 minutes

## Demo

To see the application in action, follow the setup instructions above to run both the backend and frontend. You can interact with the organization chart and update employee managers through drag-and-drop functionality.
