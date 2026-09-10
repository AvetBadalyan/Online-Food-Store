# Avet's Food Store

A modern, responsive food ordering web application built with React 19 and Firebase. Features a curated menu of 32 dishes spanning 10 categories, including authentic Armenian cuisine alongside international favourites.

**Live Demo:** [https://online-foodstore.web.app](https://online-foodstore.web.app)

---

## Features

- **32 Dishes** across 10 categories: Armenian, Burgers, Pizza, Sushi, Pasta, Salads, Soups, Desserts, Drinks
- **Search, Filter & Sort** by category, name, description, price, or rating
- **Real-time Cart** with localStorage persistence and free-delivery threshold indicator
- **User Authentication** via Firebase (register, login, logout)
- **3-Step Checkout** with form validation — delivery details, payment method, order review
- **Order History** stored in Firebase Realtime Database, visible on the Profile page
- **Protected Routes** — checkout and profile require authentication; users are redirected back after login
- **Smooth Animations** powered by Framer Motion throughout
- **Fully Responsive** — optimised for desktop, tablet, and mobile

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| UI | React 19, CSS Modules |
| Routing | React Router v7 |
| State | React Context + useReducer |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Auth & DB | Firebase Authentication + Realtime Database |
| Build | Vite |
| Hosting | Firebase Hosting |
| Linting | ESLint (react, react-hooks, react-refresh) |
| Formatting | Prettier |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication and Realtime Database enabled

### Installation

```bash
git clone https://github.com/AvetBadalyan/Online-Food-Store.git
cd Online-Food-Store
npm install
```

### Environment setup

```bash
cp .env.example .env
```

Fill in your Firebase config in `.env`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Run

```bash
npm run dev        # http://localhost:5173
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run deploy` | Build + deploy to Firebase Hosting |

---

## Project Structure

```
src/
├── components/
│   ├── CartDrawer/     # Animated slide-out cart panel
│   ├── Layout/         # Header, Footer, Hero, Layout wrapper
│   ├── MealCard/       # Individual meal card with add-to-cart
│   └── UI/             # Button, Input, Tag, Rating, QuantityStepper,
│                       # Loader, Skeleton, EmptyState
├── context/
│   ├── AuthContext     # Firebase auth state + reducer
│   └── CartContext     # Cart state + reducer, localStorage sync
├── data/
│   └── meals.js        # Static meal data (32 dishes + MEALS_MAP)
├── hooks/
│   ├── useMealDetail   # Fetch single meal by id
│   ├── useMeals        # Return all meals
│   └── useOrders       # Fetch orders for authenticated user
├── pages/
│   ├── Home            # Menu grid with search/filter/sort
│   ├── MealDetail      # Full meal page with quantity stepper
│   ├── Checkout        # 3-step checkout form
│   ├── Login           # Firebase email/password login
│   ├── Register        # New account registration
│   ├── Profile         # Account info + order history
│   └── NotFound        # 404 page
├── services/
│   ├── firebase.js     # Firebase app init, auth, db exports
│   └── mealsService.js # fetchMealById, postOrder, fetchOrdersByUser
├── styles/
│   └── variables.css   # Design tokens (colors, spacing, typography,
│                       # radius, shadows, transitions, z-index)
├── utils/
│   ├── formatters.js   # formatPrice, formatDate
│   ├── imageUtils.js   # handleImageError fallback
│   └── orderConstants.js # FREE_DELIVERY_THRESHOLD, DELIVERY_FEE
└── validators/
    ├── authSchemas.js  # Zod login + register schemas
    └── checkoutSchema.js # Zod checkout form schema
```

---

## Design System

All visual values are defined as CSS custom properties in `src/styles/variables.css` and consumed via CSS Modules throughout the app. No hardcoded colours or spacing values exist in component files.

Key tokens: `--color-primary`, `--color-text`, `--color-bg`, `--space-*`, `--text-*`, `--radius-*`, `--shadow-*`, `--focus-ring`, `--badge-size`, tint/transparency tokens for status colours.

---

## Deployment

```bash
npm run deploy
```

This runs `npm run build` then `firebase deploy` using the config in `firebase.json`.

---

## Author

**Avet Badalyan** — [GitHub](https://github.com/AvetBadalyan)
