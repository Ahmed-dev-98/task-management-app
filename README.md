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
