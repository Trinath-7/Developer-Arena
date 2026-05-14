# LuxeMart - Modern Advanced E-Commerce Frontend

A fully featured, premium e-commerce web application built using React 18+, Vite, Tailwind CSS, and Redux Toolkit. The application features dynamic routing, complete state persistence, and an optimized visual design responsive across mobile, tablet, and desktop viewports.

## 🚀 Features

- 🔐 **Comprehensive Auth System**: Simulated login, registration, and full route protection with LocalStorage persistence.
- 🛍️ **Dynamic Product Catalog**: Responsive grid layout with intuitive filtering, multi-tier sorting options and dynamic search capabilities.
- 🛒 **Interactive Cart Ecosystem**: Fully reactive cart module featuring live counting, additive tax logic, adjustable item counts, and secure data syncing.
- ❤️ **Wishlist Management**: Persistent favorite item tracking with singular-click transference to active checkout bag.
- 💳 **Seamless Checkout Flow**: Multi-step simulated transaction portal incorporating dynamic summary pricing tracking.
- ✨ **Premium UI & Motion Utilities**: Beautiful transitions using Framer Motion, skeleton loading states, and modern Lucide-icon interactions.
- ⚡ **Performance Tuning**: Implementation of component lazy-loading and code-splitting strategies ensuring rapid initial load performance.

## 🛠️ Technologies Used

- **Core Framework**: React.js + Vite
- **Styling System**: Tailwind CSS
- **State Management**: Redux Toolkit + React Redux
- **Routing**: React Router DOM (v6)
- **Motion/Animations**: Framer Motion
- **Icons**: Lucide React
- **Toast Management**: React Hot Toast

## 📂 Project Structure

```bash
├── src
│   ├── components
│   │   ├── common      # Shared elementary items (Buttons, Skeletons)
│   │   ├── layout      # Wrappers, Navbar, Footer
│   │   ├── product     # Domain specific UI logic elements
│   │   └── cart        # Cart management specific components
│   ├── pages           # Core Routable View Controllers
│   ├── store           # Redux store configuration and slices
│   ├── services        # Simulation API integration and data fixtures
│   ├── utils           # Cross-functional JS utility bindings
│   └── App.jsx         # Global application definition (Router routing)
```

## 🏁 Running Locally

1. Clone the repository dependencies:
   ```bash
   npm install
   ```

2. Initiate local development environment:
   ```bash
   npm run dev
   ```

3. Generate production static application build:
   ```bash
   npm run build
   ```
