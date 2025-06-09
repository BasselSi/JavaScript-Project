# Payment Simulation App

This is a [Next.js](https://nextjs.org) full-stack project that simulates a user payment and premium access system. It demonstrates authentication, premium feature gating, and secure user management using modern Next.js features.

---

## Features

- **User Authentication**: Secure login and session management using cookies and JWT.
- **Profile Management**: Sign up, view your profile, upgrade to premium, or delete your account.
- **Premium Access**: Users can purchase premium access via a simulated payment form. Premium users see extra navigation and can access `/premium`.
- **Secure API**: All sensitive actions (profile, payment, delete) are protected and require authentication.
- **Radix UI & Bootstrap**: Modern, accessible UI components.
- **Prisma ORM**: Type-safe database access.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up your environment

Create a `.env` file in the root directory with at least:

```
SESSION_SECRET=your-very-secret-key
DATABASE_URL=your-database-url
```

### 3. Set up the database

Edit your `prisma/schema.prisma` to match:

```prisma
model User {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  password   String
  isPremium  Boolean  @default(false)
  premiumAt  DateTime?
}
```

Then run:

```bash
npx prisma migrate dev --name init
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Sign Up / Log In**: Create an account or log in.
- **Profile**: View your details. If not premium, you can upgrade.
- **Payment**: Enter credit card details (simulated, no real payment). On success, you become a premium user.
- **Premium Page**: Only visible and accessible to premium users.
- **Delete Account**: Permanently delete your account (with confirmation).

---

## Project Structure

```
app/
  api/
    users/
      me/
        route.js      # API for current user (GET, DELETE)
    logout/
      route.js        # API for logging out
  payment/
    page.js           # Payment form and logic
    actions.js        # Server actions for payment
  premium/
    page.js           # Premium-only content
  profile/
    page.js           # User profile
    delete/
      page.js         # Delete account page
  navbar.js           # Navigation bar
  layout.js           # Root layout
  page.js             # Home page (requires authentication)
prisma/
  schema.prisma       # Prisma schema
.env                  # Environment variables
```

---

## Security Notes

- All sensitive actions require authentication via a secure session cookie.
- Premium status and user deletion are only possible for the logged-in user.
- Never expose secrets or sensitive data in the UI or codebase.
