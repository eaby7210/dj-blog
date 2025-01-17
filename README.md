# User Blog Management Platform

This repository contains a **Blog Management Platform** built using Django DRF and React. The platform enables users to register, log in, and perform CRUD operations on blogs, with support for image uploads and JWT cookie-based authentication. The application is designed to run both in development and production environments, with Docker configurations provided for containerization.

---

## Features

### Backend (Django DRF)

- **User Authentication & Authorization**: JWT cookie-based authentication using `dj-rest-auth`.
- **Post CRUD Operations**: API endpoints for creating, reading, updating, and deleting blog posts.
- **Image Uploads**: Secure image upload and storage linked to posts.
- **Database Support**: PostgreSQL for data persistence.
- **Dockerized Backend**: Configurations provided for development and production.

### Frontend (React with Vite)

- **User Interface**: Simple and responsive interface for managing blog posts.
- **API Integration**: Seamless integration with the backend APIs.
- **Dockerized Frontend**: Configurations provided for development and production.

---

## Installation and Setup

### Prerequisites

Ensure the following are installed on your system:

- Python (>=3.9)
- Pipenv (for Python environment and package management)
- Node.js (>=16.x)
- Docker (if running in a containerized environment)

### Backend Setup

1. Clone the repository and navigate to the backend directory:

   ```bash
   git clone https://github.com/eaby7210/dj-blog
   cd dj-blog
   ```

2. Install dependencies using Pipenv:

   ```bash
   pipenv install
   ```

3. Apply migrations:

   ```bash
   python manage.py migrate
   ```

4. Run the development server:

   ```bash
   python manage.py runserver
   ```

5. Update the `.env` file for development or production settings as needed. Example:

   ```env
   DEBUG=True
   SECRET_KEY=your_secret_key
   DATABASE_URL=postgres://username:password@hostname:port/dbname
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd dj-blog/blog-react-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Docker Setup

For production, use the `prod` branch:

1. You can Build Images using Dockerfile in the Project directory of frontend and backend:
   ```bash
   git checkout prod
   ```
2. Update environment variables in the Docker configuration files if needed.

---

## Additional Notes

- Use the `main` branch for development purposes.
- Ensure you adjust environment variables in `.env` files for production and development configurations.
- For any issues, feel free to create an issue in the repository or contact the maintainers.

---
