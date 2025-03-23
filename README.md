# Currency Converter - Next.js App

A real-time currency converter web application developed using **Next.js** and **TypeScript**, as part of the Programming IV course at Universidad Nacional, Brunca Campus.

## 🚀 Features

- Real-time currency conversion
- Simulated price updates every minute
- Bar chart showing recent exchange rates
- API Routes with protected access via Middleware
- Local storage to remember the last conversion
- Clean UI and UX design

## 🧠 Technologies Used

- Next.js 14
- TypeScript
- React Hooks: `useFetch`, `useLocalStorage`
- API Routes & Middleware
- Observer & Factory Design Patterns
- Chart.js or Recharts (for bar chart)
- ESLint, Prettier, CSpell (for code quality)

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/JoshuaEA54/currency-converter-nextjs.git
cd currency-converter-nextjs
npm install
```

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## 🧪 Quality Tools Setup
- `eslint`
- `prettier`
- `cspell`

Install all quality tools:
```bash
npm install -D eslint prettier cspell
```

## 🧩 Folder Structure
```
/pages
  /api
    convert.ts       # API route for conversion
/middleware.ts       # Auth & access control
/components
  BarChart.tsx       # Chart component
/hooks
  useFetch.ts
  useLocalStorage.ts
```

## 📈 Functionality Overview

- **Conversion Logic**: Fetch exchange rates from an external API using `useFetch`.
- **Storage**: Save the latest conversion result using `useLocalStorage`.
- **Security**: API access is protected with a custom `middleware.ts`.
- **Auto-Update**: Every minute, the app updates the rates (or simulates if no change).
- **Graph**: Renders a bar chart with the last N conversions.

## 🌐 Deployment

The app is deployed on **Vercel**: [https://currency-converter.vercel.app](https://currency-converter.vercel.app)

