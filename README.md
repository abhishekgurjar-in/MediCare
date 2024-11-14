# Medicare - Doctor Appointment Booking Website

Medicare is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users book appointments with doctors. This project enables patients to browse available doctors, view profiles, and schedule appointments based on doctor availability.

## Features

- **User Authentication**: Secure user registration and login.
- **Doctor Search and Filter**: Browse and filter doctors based on specialty, location, and availability.
- **Booking System**: Schedule appointments with doctors for specific dates and times.
- **Profile Management**: Update personal and medical profile details.
- **Doctor Dashboard**: View and manage upcoming appointments for doctors.
- **Admin Panel**: Manage users, doctors, and appointments.

## Tech Stack

- **Frontend**: React, Redux, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) for secure access control


## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhishekgurjar-in/medicare.git
   cd medicare
   ```

2. **Install server dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables** in the `.env` file in the server folder:
   ```
   MONGODB_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

5. **Run the application**:

   - Start the server:
     ```bash
     cd backend
     npm start
     ```
   - Start the client:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Open the application**:
   - Visit `http://localhost:3000` in your browser.

## Usage

- **Users**: Sign up and log in to search for doctors and book appointments.
- **Doctors**: Log in to manage scheduled appointments.
- **Admin**: Access the admin panel to manage users and doctors.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.



## Author
**Abhishek Gurjar** is a dedicated web developer passionate about creating practical and functional web applications. Check out more of his projects on [GitHub](https://github.com/abhishekgurjar-in).
