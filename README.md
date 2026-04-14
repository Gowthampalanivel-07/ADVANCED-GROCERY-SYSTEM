# Advanced Grocery System - AI-Powered Store Management

A comprehensive, next-generation grocery management system with 24 extreme features powered by AI, dynamic pricing, real-time analytics, and modern UX.

## 🧠 Core Features (24 Extreme Features)

### 🏪 Store Management
1. **Dynamic Pricing Engine** - Auto-adjusts prices based on demand, expiry dates, and time of day
2. **Smart Store Layout** - AI suggests optimal product placement based on buying patterns
3. **Customer Behavior Heatmap** - Real-time visualization of customer movement and product interest
4. **Auto Supplier Integration** - Automatically creates POs when stock is low
5. **Profit Intelligence** - Tracks actual profit margin per product (not just revenue)
6. **GST & Tax Automation** - India-specific GST calculation and tax reports

### 💳 Customer Experience
7. **Self-Checkout Mode** - Customers scan items via phone and pay without queues
8. **Smart Promotion Engine** - Auto-generates targeted offers based on sales velocity
9. **WhatsApp/SMS Automation** - Sends offers, bills, and restock alerts
10. **Voice + Chat Assistant** - Owner can ask "Today profit?" and get instant answers
11. **Online + Offline Hybrid** - Order online, pick up in store
12. **Gamification** - Daily spin rewards, scratch cards, referral bonuses

### 🔒 Security & Intelligence
13. **AI Fraud Detection** - Detects unusual billing patterns and staff misuse
14. **CCTV + AI Integration** - Shoplifting detection, crowd monitoring, counter suggestions
15. **Face Recognition Loyalty** - Recognizes repeat customers automatically
16. **Plug-in System** - Modular architecture for bakery, pharmacy, dairy extensions

### 📊 Analytics & Forecasting
17. **Predictive Sales Forecasting** - Forecasts tomorrow's sales and weekly trends
18. **Smart Cold Storage Monitoring** - Tracks fridge temps and alerts on spoilage risk
19. **Sustainability Tracker** - Shows waste reduced and eco-score
20. **Competitive Price Tracker** - Tracks nearby shop prices

### 🚀 Gold Tier Features (Advanced)
21. **Drone Delivery Integration** - For nearby quick delivery
22. **Emotion-Based Offers** - Detects mood via camera and suggests offers
23. **Blockchain Billing System** - Tamper-proof transactions
24. **Smart Budget Shopping Mode** - Customers set budget, system suggests best items

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Animations**: GSAP, Framer Motion, Three.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Real-time**: Socket.io
- **Backend**: Node.js/Express (optional)
- **Database**: MongoDB/PostgreSQL (optional)

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Navigate to project**
   ```bash
   cd "Advanced Grocery System"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Getting Started

### Running Commands

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # REST API endpoints
│   │   ├── products/     # GET/POST products
│   │   ├── pricing/      # Dynamic pricing calculations
│   │   ├── analytics/    # Heatmap data
│   │   ├── inventory/    # Stock management
│   │   ├── alerts/       # Fraud detection
│   │   ├── tax/          # GST calculations
│   │   ├── checkout/     # Self-checkout
│   │   ├── promotions/   # Promotions
│   │   └── dashboard/    # Dashboard metrics
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/landing page
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── Hero.tsx      # Animated hero with particles
│   │   ├── ScrollStories.tsx   # Feature cards
│   │   ├── Dashboard.tsx       # Analytics dashboard
│   │   └── Footer.tsx    # Footer
│   ├── dashboard/        # Admin dashboard components
│   └── features/         # Feature-specific components
├── types/
│   └── index.ts          # TypeScript interfaces
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── stores/               # Zustand state stores
└── styles/               # Global styles
```

## 🎨 Key Features

### Animated Landing Page
- **Hero Section**: Particle system with mouse tracking and neural network effects
- **Scroll Stories**: 24 feature cards with parallax and scroll-triggered animations
- **Dashboard Preview**: Real-time analytics with charts and metrics
- **Smooth Transitions**: GSAP scroll triggers and Framer Motion interactions

### Dynamic Pricing
- Expiry-based discounts (30% off for 2 days to expiry)
- Demand multipliers
- Time-of-day pricing
- Automatic price optimization

### Analytics
- Customer behavior heatmaps
- Zone-based traffic analysis
- Profit margin tracking
- Sales forecasting

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product

### Pricing
- `POST /api/pricing/calculate` - Calculate dynamic price

### Analytics
- `GET /api/analytics/heatmap` - Get heatmap data
- `POST /api/analytics/heatmap` - Record heatmap data

### Reports
- `GET /api/reports/profit` - Get profit reports

### Inventory
- `GET /api/inventory` - Get inventory status
- `POST /api/inventory` - Update inventory

### Alerts
- `GET /api/alerts/fraud` - Get fraud alerts
- `POST /api/alerts/fraud` - Record fraud alert

### Tax
- `POST /api/tax/calculate` - Calculate GST
- `GET /api/tax/calculate` - Get GST info

### Checkout
- `POST /api/checkout/self-checkout` - Create checkout session
- `GET /api/checkout/self-checkout` - Get session status

### Promotions
- `GET /api/promotions` - Get active promotions
- `POST /api/promotions` - Create new promotion

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Performance

- Server-side rendering
- Image optimization
- Code splitting
- Lazy loading
- WebGL particle animations

## 🔐 Security

- HTTPS in production
- Input validation
- CORS configuration
- Fraud detection system
- Rate limiting ready

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## 📝 License

MIT License
