# Inventory Management System

A modern inventory management system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- User Authentication (Login/Signup)
- Password Reset with Email
- Asset Management
- Stock Management
- Dashboard Analytics
- Role-based Access Control
- Real-time Updates
- Responsive Design

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- Zustand
- SendGrid (for emails)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-management-system.git
cd inventory-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

## Environment Setup

### Supabase Setup

1. Create a new Supabase project
2. Set up email service using SendGrid
3. Deploy the email function:
```bash
supabase functions deploy send-email
```

### SendGrid Setup

1. Create a SendGrid account
2. Create an API key
3. Verify your sender email
4. Add secrets to Supabase:
```bash
supabase secrets set SENDGRID_API_KEY=your_sendgrid_api_key
supabase secrets set SENDGRID_FROM_EMAIL=your_verified_sender_email
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request