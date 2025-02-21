# Organization Chart Builder

## Overview

The Organization Chart Builder is a minimal, interactive application that allows users to visualize and manage an organizational structure. It consists of a FastAPI backend and a React frontend, enabling users to view employee data and update reporting relationships through a drag-and-drop interface.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

- **main.py**: Entry point for the FastAPI application.
- **database.py**: Defines SQLAlchemy models for employee data.
- **doc.py**: Contains API documentation using FastAPI's automatic documentation generation.
- **crud**: Contains CRUD operations for employee data. -
  - **employee.py**: Defines endpoints for employee data retrieval and updates.
- **models/**: Contains SQLAlchemy models for the database.
  - **employee.py**: Defines the SQLAlchemy model for employee data.
- **schemas/**: Contains Pydantic models for request and response validation.
  - **employee.py**: Defines the Pydantic schema for employee data validation.
  - **requirements.txt**: Lists the dependencies required for the backend.

### Frontend

- **src/**: Contains the source code for the React application.
  - **components/**: Contains reusable React components.
    - **Card.tsx**: Component for displaying individual employee information.
    - **Loading.tsx**: Component for displaying a loading spinner.
    - **Node.tsx**: Component for rendering a node in the organization chart.
    - **OrgChart.tsx**: Component for rendering the organization chart.
  - **utils/**: Contains utility functions and instances.
    - **axios.instance.ts**: Axios instance for making HTTP requests.
    - **api.ts**: API functions for interacting with the backend.
    - **org.ts**: Utility functions for building and managing the organization hierarchy.
  - **enums/**: Contains enumerations used in the application.
    - **dnd.enum.ts**: Enumeration for drag-and-drop types.
  - **types/**: Contains TypeScript type definitions.
    - **org.type.ts**: Type definitions for organization-related data.
  - **providers.tsx**: Contains context providers for the application.
  - **main.tsx**: The entry point for the React application.
  - **App.tsx**: The root component that sets up the application.
  - **assets/**: Contains static assets such as CSS files.
    - **index.css**: Main CSS file for the application.

## Tech Stack

### Backend

- FastAPI
- SQLite

### Frontend

- React
- Typescritp
- Tanstack Query
- Axios
- React-organizational-chart
- tailwindcss
- toastify

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the FastAPI application:
   ```
   uvicorn app.main:app --reload
   ```
4. Access the API at `http://127.0.0.1:8000`.

### Frontend

1. Navigate to the `frontend` directory.
2. Rename from `.env.example` to `.env.`

   ```
   VITE_BASE_URL={{backend_api}}
   ```

3. Install the required dependencies:
   ```
   yarn
   ```
4. Start the React application:
   ```
   yarn dev
   ```
5. Access the application at `http://localhost:5173`.

## Technical Choices

- **Backend**: FastAPI was chosen for its simplicity and performance in building APIs. SQLite is used for easy setup and lightweight data storage.
- **Frontend**: React was selected for its component-based architecture, making it easy to manage UI state and interactions. TypeScript is used for type safety.

## Time Log

- Backend Development: 45 minutes
- Frontend Development: 60 minutes
- Integration: 10 minutes
- Documentation: 10 minutes

## AI collaboration

For this challenge, I collaborated with AI to streamline development, improve efficiency, and ensure best practices were followed within the 2-hour time limit. Below is a breakdown of how AI assisted in different stages of the project:

### Project Planning & Structuring

- Used AI to outline the project structure, ensuring a well-organized backend (FastAPI) and frontend (React).
- Received recommendations on file organization, endpoint design, and database structure.
- AI suggested efficient ways to implement drag-and-drop functionality using react-dnd.

### Backend Development

- AI provided FastAPI boilerplate code, including: Setting up SQLite with SQLAlchemy.
- Defining Pydantic models for request validation.
- Implementing API routes (GET /employees, PUT /update_manager).

### Frontend Development

- AI suggested using React with TailwindCSS for rapid UI development.
- Recommended the best drag-and-drop library (react-dnd) and provided a sample integration.
- Helped optimize API calls by implementing loading states and error messages.

## TODO & Future Improvements

Due to the 2-hour time constraint, some features were prioritized, while others were left as future improvements:

### Backend Enhancements

Implemented:

- Employee data retrieval (GET /employees).
- Update manager functionality (POST /update_manager).
- Basic error handling for invalid IDs.
- Swagger Documentation.

TODO:

- Add more validation for circular management structures (e.g., an employee cannot be their own manager).
- Implement unit tests and integrate testing for API endpoints.

### Frontend Enhancements

Implemented:

- Organization chart UI with employee cards.
- Drag-and-drop feature to change managers.
- API integration with loading and error states.

TODO:

- Improve UI with better styling & responsiveness.
- Implement component tests and e2e testing.

### Deployment & Documentation

Implemented:

- Clear README with setup instructions.

TODO:

- Implement automate shipping environment with Docker.
- Deploy backend using FastAPI with Uvicorn on a cloud platform (e.g., AWS).
- Deploy frontend using Vercel.
- Improve documentation with API request/response examples.

## Demo

To see the application in action, follow the setup instructions above to run both the backend and frontend. You can interact with the organization chart and update employee managers through drag-and-drop functionality.
