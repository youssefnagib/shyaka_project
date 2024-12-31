# Shyaka Project

Shyaka Project is a full-stack web application designed to manage user profiles, orders, and more. It includes a backend built with Django and a React-based frontend for an intuitive user experience.

## Features

- User authentication (login and logout).
- User profile management.
- Order management and display.
- Responsive design using Bootstrap.

## Tech Stack

### Backend
- Django
- Django REST Framework
- Simple JWT for token-based authentication

### Frontend
- React.js
- Bootstrap 5

## Installation and Setup

### Prerequisites
- Python 3.8+ and pip
- Node.js and npm
- Miniconda (recommended for managing environments)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/youssefnagib/shyaka_project.git
   cd shyaka_project/Back-end
   ```
2. Create a virtual environment:
    ```bash
    conda create --name shyaka_project python=3.8
    conda activate shyaka_project
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4. Run migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
5. Start the backend server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../Front-end
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    npm start
    ```

### Usage
 - Navigate to [http://localhost:3000] for the frontend.
 - Use [http://localhost:8000/admin] for Django admin (ensure you create a superuser).
 - Interact with API endpoints at [http://localhost:8000/api/].

### Project Structure
    ```vbnet
    shyaka_project/
    │
    ├── Back-end/
    │   ├── manage.py
    │   ├── shyaka_backend/
    │   ├── account/
    │   ├── order/
    │   └── product/
    │
    ├── Front-end/
    │   ├── public/
    │   └── src/
    │       ├── components/
    │       ├── styles/
    │       └── App.js
    │
    └── README.md
    ```

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or new features.

### Contact
For questions or feedback, please contact [youssefnagib].
    ```vbnet
    
    Copy and paste the content into a file named `README.md`. Let me know if you need further adjustments!
    ```
