# LearnLingo

![LearnLingo](./assets/learn_lingo.webp)

LearnLingo is a responsive web application for finding online language tutors. Users can browse teachers, filter them by language, level, and price, view detailed information and reviews, add teachers to favorites, and book a trial lesson.

## Live Demo

[LearnLingo](https://learn-lingo-chi-self.vercel.app/)

## Features

- Responsive Home page
- Teachers catalog with teacher cards
- Filtering by:
  - language
  - level of knowledge
  - price per hour

- Teacher details with experience and student reviews
- "Read more" functionality
- Trial lesson booking modal
- Form validation with React Hook Form and Yup
- User registration and login with Firebase Authentication
- Logout functionality
- Protected Favorites page
- Add and remove teachers from favorites
- Favorites stored in Firebase Realtime Database
- Mobile responsive navigation menu
- Password visibility toggle
- Loading and error states
- Toast notifications

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-4B5563?style=flat-square&logo=yup&logoColor=white)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF6B6B?style=flat-square&logo=react&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## Authentication

Authentication is implemented with Firebase Authentication.

Users can:

- create an account;
- log in with email and password;
- log out;
- access the private Favorites page after authentication.

The current authenticated user is managed through React Context.

## Firebase Database

Firebase Realtime Database is used to store:

- teacher information;
- user favorites.

Each teacher contains information about their name, languages, levels, rating, completed lessons, price, experience, conditions, and reviews.

## Forms

Forms are implemented using React Hook Form with Yup validation.

The project includes:

- Login form
- Registration form
- Trial lesson booking form

Validation errors are displayed directly in the forms, while Firebase errors are handled with toast notifications.

## Responsive Design

The application is adapted for:

- desktop;
- tablet;
- mobile devices.

Responsive layouts are implemented with CSS Modules and media queries.

The header also includes a mobile navigation menu with scroll locking while the menu is open.

## Environment Variables

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_FIREBASE_DATABASE_URL=
```

See `.env.example` for the required variables.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Anastasiia-Kosh/LearnLingo.git
```

Navigate to the project directory:

```bash
cd LearnLingo
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add your Firebase configuration.

Start the development server:

```bash
npm run dev
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Lint

```bash
npm run lint
```

Runs ESLint to check the project for code quality issues.

### Build

```bash
npm run build
```

Creates a production build of the application.

### Preview

```bash
npm run preview
```

Runs the production build locally.

## Deployment

The application is deployed on Vercel.

[Open LearnLingo](https://learn-lingo-chi-self.vercel.app/)
