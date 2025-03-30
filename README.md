# Currency Converter - Next.js App

A real-time currency converter web application developed using Next.js and TypeScript, as part of the Programming IV course at Universidad Nacional, Brunca Campus.

## 👥 Team Members
- Joshua Elizondo Abarca
- Jazmín Gamboa Chacón
- Noemí Murillo Godinez
- Marconi Calvo Campos
- Brian Zeledón Esquivel

## 🚀 Features
- Real-time currency conversion using external API
- Simulated price updates every minute
- Bar chart showing exchange rates
- Protected API Routes with Middleware
- Local storage to persist last conversion
- Modular and scalable code structure
- Clean and intuitive UI/UX

## 🧠 Technologies Used
- Next.js 14
- TypeScript
- React Hooks: `useFetch`, `useLocalStorage`
- API Routes & Middleware
- Observer & Factory Design Patterns
- Chart.js via `react-chartjs-2`
- ESLint, Prettier, CSpell (code quality)

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
```bash
git clone https://github.com/JoshuaEA54/currency-converter-nextjs.git
cd currency-converter
npm install
```

### Running the App
```bash
npm run dev
```

## 🧪 Quality Tools Setup
We use the following tools for maintaining code quality:
- **ESLint** - Linter for JavaScript/TypeScript
- **Prettier** - Code formatter
- **CSpell** - Spell checker for code

Install tools:
```bash
npm install -D eslint prettier cspell
```

## 📁 Folder Structure
```
src/
├── app/
│   ├── api/
│   │   └── convert/route.ts   # API Route for fetching currency data
│   ├── middleware.ts          # Middleware for access control
│   └── page.tsx               # Main page integration
├── components/
│   ├── Barchart.tsx           # Bar chart visualization
│   └── CurrencyComponents.tsx # Conversion form and logic
├── hooks/
│   ├── useFetch.ts            # Custom hook for fetching API data
│   └── useLocalStorage.tsx    # Custom hook for localStorage
```

## 📈 Functionality Overview
- **Conversion Logic:** Fetches exchange rates via API using `useFetch`.
- **Persistence:** Stores the last conversion using `useLocalStorage`.
- **Security:** Validates access to the API using custom middleware and API key from `.env`.
- **Auto-Update:** Refreshes or simulates exchange rates every minute.
- **Visualization:** Displays exchange rates with a responsive bar chart.
