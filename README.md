# Avet's Food Store

A modern, responsive food ordering web application built with React 19 and
Firebase. Features a curated menu with authentic Armenian dishes alongside
international cuisine.

**Live Demo:**
[https://online-foodstore.web.app](https://online-foodstore.web.app)

## Features

- **40+ Dishes** across 10 categories including Armenian, Burgers, Pizza, Sushi,
  Pasta, Salads, Soups, Desserts, and Drinks
- **Real-time Cart** with localStorage persistence
- **User Authentication** via Firebase (sign up, login, logout)
- **Order Management** with Firebase Realtime Database
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Search & Filter** by category, name, or description
- **Sorting Options** by price, rating, or name
- **Smooth Animations** powered by Framer Motion

## Tech Stack

- **Frontend:** React 19, React Router v7, CSS Modules
- **State Management:** React Context + useReducer
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **Backend:** Firebase Authentication & Realtime Database
- **Build Tool:** Vite
- **Hosting:** Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for auth and database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AvetBadalyan/Online-Food-Store.git
   cd Online-Food-Store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Add your Firebase configuration to `.env`:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── CartDrawer/   # Slide-out cart panel
│   ├── Layout/       # Header, Footer, Hero, Layout
│   ├── MealCard/     # Individual meal display
│   └── UI/           # Button, Input, Loader, Modal, etc.
├── context/          # React Context providers
│   ├── AuthContext   # Firebase authentication state
│   └── CartContext   # Shopping cart state
├── data/             # Static meal data
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── services/         # Firebase configuration & API
├── styles/           # Global CSS variables
├── utils/            # Helper functions
└── validators/       # Zod validation schemas
```

## Key Features Explained

### Armenian Cuisine

The app features 8 authentic Armenian dishes with images sourced from Wikimedia
Commons:

- Khorovats (BBQ)
- Tolma (Dolma)
- Lahmajun
- Khash
- Harissa
- Ghapama
- Jingalov Hats
- Spas

### Cart Persistence

Cart data is automatically saved to localStorage, so users don't lose their
selections when refreshing the page.

### Protected Routes

Checkout and Profile pages require authentication. Users are redirected to login
and returned to their intended destination after signing in.

### Order History

Authenticated users can view their complete order history on the Profile page.

## Deployment

The app is configured for Firebase Hosting:

```bash
npm run build
firebase deploy
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Avet Badalyan**

- GitHub: [@AvetBadalyan](https://github.com/AvetBadalyan)
