# e-TenderAlert Application

This is a React application with a Node.js backend for tender tracking and analytics.

## Prerequisites

- Node.js v20.19+ or v22.12+ (required for Vite compatibility)
- npm (comes with Node.js)

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Build the React application:
   ```
   npm run build
   ```

3. Start the Node.js server:
   ```
   npm start
   ```

   Or for development with auto-restart:
   ```
   npm run dev:server
   ```

4. Visit the application at http://localhost:5000

## Development

To run the React development server:
```
npm run dev
```

To run the Node.js server in development mode:
```
npm run dev:server
```

## API Endpoints

- `/api/health` - Health check endpoint
- `/api/statistics` - All statistics data
- `/api/statistics/overview` - Overview statistics
- `/api/statistics/lifecycle` - Tender lifecycle data
- `/api/statistics/departments` - Department statistics
- `/api/statistics/authorities` - Top authorities data
- `/api/statistics/categories` - Category distribution
- `/api/statistics/values` - Tender values by department

## Project Structure

```
etender-react/
├── dist/                  # Built React application
├── server/                # Node.js server files
│   ├── routes/            # API route handlers
│   └── server.js          # Main server file
├── src/                   # React source files
│   ├── components/        # React components
│   └── ...                # Other React files
├── package.json           # Project dependencies and scripts
└── ...
```

## Features

- Real-time tender tracking dashboard
- Statistics visualization with Chart.js
- RESTful API for data access
- Responsive design for all devices