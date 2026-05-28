
## Cấu Trúc Dự Án

```
myapp/
├── frontend/              # React Application
│   ├── src/
│   │   ├── components/    # React Components
│   │   ├── pages/         # Pages
│   │   ├── App.js         # Main App Component
│   │   ├── index.js       # Entry Point
│   │   └── index.css      # Global Styles
│   ├── public/
│   │   └── index.html     # HTML Template
│   ├── Dockerfile         # Frontend Docker Configuration
│   └── package.json
|   └── .env
│
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── routes/        # API Routes
│   │   ├── models/        # MongoDB Schemas
│   │   ├── controllers/   # Business Logic
│   │   └── server.js      # Express Server
│   ├── Dockerfile         # Backend Docker Configuration
│   ├── package.json
│   └── .env
│
├── docker-compose.yml     # Docker Compose Configuration
├── .gitignore
└── README.md
```
