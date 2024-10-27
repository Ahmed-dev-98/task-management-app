# Project Name

[Brief description of the project, its purpose, and main features.]

## Table of Contents

- [How It Works](#how-it-works)
- [Main Features](#main-features)
- [Main Packages](#main-packages)
- [Project Structure](#project-structure)

## How It Works

This project consists of:

1. **Landing Page**: Describes the need we fulfill and our work.

   - The landing page is simple, with the main part being the call to action for login and registration.
   - After clicking on it, the user will be redirected to the Kinde login screen to either log in or register.
   - After successfully logging in, the user will be redirected to the dashboard view.

2. **Dashboard**: The core of the app where all work is put together.

   - There are two main roles: **Manager** and **Employee**.
   - The manager has full access control and is injected directly into Kinde, so there is only one manager:
     - **Credentials**:
       - Email: ahmed.h.mohamed98@gmail.com
       - Password: Pass@1234
   - The manager can **CREATE**, **DELETE**, **EDIT**, **VIEW**, and assign tasks or employees.
   - The manager also has access to one hidden module (Analytics).
   - Employees can **CREATE** and **VIEW** tasks in general and change task status (if the employee is a team member).
   - The task owner can fully manage their tasks.
   - There is a special Kanban board in the profile module to manage tasks easily.

3. **Installation**: this project depending on vite combined with 2 main Third-party

   - Clone the repository: git clone https://github.com/Ahmed-dev-98/task-management-app.git
   - run npm istall
   - Create a .env file in the root directory.
   - Add the following variables to configure the integration with Kinde and Firebase services:

   **Kinde Configuration**
   -VITE_KINDE_CLIENT_ID=c5709494d0174c8abf5cfa18ccc82072
   -VITE_KINDE_DOMAIN=https://ahmedhassanmohamedahmad.kinde.com
   -VITE_KINDE_REDIRECT_URL=http://localhost:5173/dashboard
   -VITE_KINDE_LOGOUT_URL=http://localhost:5173

   **Firebase Configuration**
   -VITE_API_KEY=AIzaSyAA3OeYa0YDdNYdnSabs7BUQdEPpIc45IA
   -VITE_AUTH_DOMAIN=task-management-7913d.firebaseapp.com
   -VITE_PROJECT_ID=task-management-7913d
   -VITE_STORAGE_BUCKET=task-management-7913d.appspot.com
   -VITE_MESSAGING_SENDER_ID=945678658013
   -VITE_APP_ID=1:945678658013:web:a51b24b002f802b68fee34
   -VITE_MEASUREMENT_ID=G-JBZM1Z0W3K

- This app is configured to run on port 5173 as required by Kinde for proper authentication handling. Changing this port will affect the integration.
- finally run npm run dev

## Main Features

- Kanban board
- Firebase integration for image storage
- Authentication using Kinde
- Permissions-based actions using Kinde
- Filter & sorting for all tables
- Column control to toggle columns in the UI
- Pagination and table data count control
- Used mock user data via API for random employees

## Main Packages

- **Shadcn**: UI library
- **React Hook Form**: Form management
- **Kinde**: Authentication and authorization
- **Firebase**: Image storage for both employees and tasks
- **React Beautiful DnD**: For Kanban board
- **Yup**: Validation
- **React Redux**: State management
- **React Router**: App routing for SPA

## Project Structure

Here's an overview of the project structure:

```plaintext
project-root
├── public                  # Static files, favicon, index.html, etc.
│   └── index.html          # Main HTML file for the app entry
├── src                     # Source files for the project
│   ├── assets              # Static assets like images, fonts, etc.
│   ├── components          # Reusable UI components
│   │   └── any.tsx         # Shadcn UI components
│   ├── hooks               # Custom hooks
│   │   └── usePermissions  # For permissions
│   ├── modules             # Dashboard and app modules
│   │   ├── Tasks.tsx       # Tasks module for managing tasks
│   │   ├── Profile.tsx     # Profile module for managing user profiles
│   │   ├── Analytics.tsx   # Analytics module for managing data
│   │   ├── Auth.tsx        # Auth for landing page and login or registration
│   │   └── Employees.tsx   # Employees module for managing employee data
│   ├── services            # API service files or external interactions
│   │   └── media.ts        # API for Firebase storage to save images
│   ├── store               # Redux configured store
│   │   ├── slices          # Each module has its own slice
│   │   └── index.ts        # Root of the store
│   ├── App.ts              # Main app component, routing setup
│
│
│
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
└── package.json            # Project metadata, dependencies, scripts
```
