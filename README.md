# LearnLingo

LearnLingo is a responsive web application for finding online language tutors. Users can browse teachers, filter them by language, level, and price, view detailed information and reviews, add teachers to favorites, and book a trial lesson.

![LearnLingo](./assets/learn_lingo.webp)

## Live Demo

[LearnLingo](https://learn-lingo-chi-self.vercel.app/)

## Features

- Responsive design for mobile, tablet, and desktop devices.
- Teacher catalog with hybrid pagination: server-side pagination for the unfiltered catalog and client-side pagination for filtered results.
- Client-side filtering by language, proficiency level, and hourly price with combined filter support.
- Favorites management with persistent user data stored in Firebase Realtime Database.
- User authentication with Firebase Authentication, including registration, login, and logout.
- Teacher cards with expandable information, reviews, experience details, and favorite controls.
- Trial lesson booking through a validated modal form.
- Loading, empty, and error states for a better user experience.
- Reusable React components with TypeScript for type-safe development.
- Toast notifications for user feedback.

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

- Login form;
- Registration form;
- Trial lesson booking form.

Validation errors are displayed directly in the forms, while Firebase errors are handled with toast notifications.

## Responsive Design

The application uses CSS Modules and media queries to provide a responsive layout across different screen sizes.

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
