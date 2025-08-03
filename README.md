# NewsFlow

A React-based news aggregation app with modern UI and infinite scrolling.

## Features

- Real-time news from multiple categories
- Responsive design with Tailwind CSS
- Infinite scrolling
- Modern UI with animations
- Search functionality (coming soon)

## Quick Start

```bash
git clone https://github.com/meshramvibhor/NewsWala.git
cd NewsWala
npm install
npm start
```

## API Setup

1. Get API key from [NewsAPI.org](https://newsapi.org/)
2. Add your key to `src/App.js` or `src/components/Screen.jsx`

## Tech Stack

- React.js
- Tailwind CSS
- Lucide React (icons)
- react-infinite-scroll-component
- NewsAPI.org

## Project Structure

```
src/
├── components/
│   ├── News.js          # Main news component
│   ├── NewsItem.js      # News item card
│   ├── Screen.jsx       # Modern UI
│   └── Spinner.js       # Loading
├── App.js              # Main app
└── index.js            # Entry point
```

## Deployment

```bash
npm run build
```

Deploy the `build` folder to Netlify, Vercel, or any static hosting.

## Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open PR

---

⭐ Star if helpful!

