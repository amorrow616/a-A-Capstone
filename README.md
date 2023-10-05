# Patternica

My capstone project for App Academy, a Habitica inspired website. As a user you can navigate through the landing page to learn more about the site as well as get to the signup and login pages several different ways to ensure ease of use. Once you are logged in, you can use the site to promote healthy living by creating habits, dailies, todos, and rewards.

[Live Site]('https://patternica.onrender.com')

It is still a work in progress. In the works is customizable avatars, health and experience bars, and gear.

## Installation

Follow the instructions below to set up and run this project locally on your machine.

### Cloning repo

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/amorrow616/a-A-Capstone.git && cd Patternica/
    ```

### Backend Setup

1. **Set Up Virtual Environment with Pipenv:**
    ```bash
    pipenv install
    ```

3. **Environment Configuration:**

   Create a `.env` file in the root directory. Add the following variables:
    ```
    SECRET_KEY=your_secret_key
    DATABASE_URL=sqlite:///dev.db
    SCHEMA=your_schema
    ```

    > Note: Replace placeholders (`your_secret_key`, `your_schema`) with appropriate values.

4. **Database Migration:**

    Initialize and update the database schema:
    ```bash
    pipenv run flask db migrate
    pipenv run flask db upgrade
    ```

5. **Seed Database:**

    To get the seed data, run:
    ```bash
    pipenv run flask seed all
    ```

6. **Start the Backend Server:**

    ```bash
    pipenv run flask run
    ```

    Your backend server should be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory (react-app/):**
    ```bash
    cd react-app
    ```

2. **Environment Configuration:**

   Create a `.env` file in the `react-app` directory. Add the following line:
    ```
    REACT_APP_BASE_URL=http://localhost:5000
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Start the Frontend Development Server:**
    ```bash
    npm start
    ```

   This will automatically open your default browser to `http://localhost:3000`, or you can manually open it.


Checkout the wiki if you'd like more information!
