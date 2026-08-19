# FarmGuru — Frontend

A premium AI-powered Soil Quality Analysis web application built with React.

## Tech Stack

- **React 19** + **Vite** — Fast development & builds
- **Tailwind CSS v4** — Utility-first styling with custom agritech theme
- **React Router** — Client-side routing
- **Framer Motion** — Smooth animations
- **Recharts** — Data visualization (charts)
- **Lucide React** — Modern icon library
- **Axios** — HTTP client for API integration

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── assets/              # Images and static assets
├── components/          # Reusable UI components
│   ├── Navbar.jsx       # Responsive navbar (transparent → solid on scroll)
│   ├── Footer.jsx       # 4-column footer
│   ├── Hero.jsx         # Cinematic hero section
│   ├── FeatureCard.jsx  # Reusable feature card
│   ├── StatsSection.jsx # Animated statistics counters
│   ├── SoilInputForm.jsx # NPK input form with validation
│   ├── SoilResultCard.jsx # Analysis result display with charts
│   └── LoadingState.jsx  # Loading/analyzing state
├── pages/               # Route pages
│   ├── Home.jsx         # Landing page
│   ├── Analysis.jsx     # Soil analysis form & results
│   ├── Dashboard.jsx    # Analysis history & charts
│   ├── About.jsx        # About the project
│   └── Contact.jsx      # Contact form
├── services/
│   └── api.js           # API client with mock fallbacks
├── App.jsx              # Router setup
├── main.jsx             # Entry point
└── index.css            # Tailwind config & custom theme
```

## Backend Integration

The frontend connects to a FastAPI backend. Set the API URL:

```env
VITE_API_URL=http://localhost:8000/api
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | Predict soil condition from NPK values |
| GET | `/api/history` | Get analysis history |
| GET | `/api/stats` | Get platform statistics |

The frontend includes **mock fallbacks** — it works without a backend by generating simulated responses.
