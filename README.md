# Resort Booking System

A full-stack web application for managing resort bookings, built with Next.js. This application allows users to browse and book resort accommodations, while administrators can manage products and view user data.

## Features

- **User Authentication**: Secure login and registration using NextAuth
- **Role-Based Access**: Separate interfaces for users and administrators
- **Product Management**: Admins can add and manage resort products (accommodations)
- **Booking System**: Users can view and book available stays
- **Invoice Generation**: Users can view their booking invoices
- **Responsive Design**: Clean and modern UI for all devices
- **Database Integration**: MongoDB with Mongoose for data persistence

## Tech Stack

- **Frontend**: Next.js 16, React 19
- **Backend**: Next.js API Routes, Server Actions
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS Modules
- **Date Handling**: date-fns, react-date-range
- **Loading States**: react-loader-spinner
- **Security**: bcryptjs for password hashing

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd resort_booking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Users:

- Register or login to access the application
- Browse available resort accommodations
- View product details and book stays
- Access your booking invoices

### For Administrators:

- Login with admin credentials
- Add new products/accommodations
- Manage existing products
- View user information and bookings

## Project Structure

```
resort_booking/
├── src/
│   ├── app/
│   │   ├── (user)/
│   │   │   ├── detail/[id]/      # Product detail pages
│   │   │   ├── invoice/           # User invoices
│   │   │   ├── login/             # Login page
│   │   │   └── register/          # Registration page
│   │   ├── admin/                 # Admin dashboard
│   │   ├── api/                   # API routes
│   │   │   ├── admin/             # Admin-only APIs
│   │   │   ├── auth/              # Authentication
│   │   │   └── users/             # User management
│   │   ├── components/            # Reusable components
│   │   ├── serverActions/         # Server-side actions
│   │   └── utils/                 # Utilities and models
│   ├── middleware.js              # Next.js middleware
│   └── globals.css                # Global styles
├── public/                        # Static assets
└── package.json                   # Dependencies and scripts
```

## API Endpoints

- `GET /api/admin/add-product` - Fetch all products
- `POST /api/admin/add-product` - Add new product (admin only)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/[id]` - Get user by ID
- `POST /api/auth/[...nextauth]` - Authentication routes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
