# LeetLab - Full-Stack Coding Platform

LeetLab is a full-stack coding platform inspired by LeetCode, designed to help developers practice coding interview questions, track their progress, and improve their problem-solving skills. With a modern tech stack and robust features, LeetLab provides an authentic coding interview experience.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT validation
- **Coding Problems**: Curated problems with test cases and constraints
- **Code Editor**: Monaco Editor with multi-language support (JavaScript, Python, Java)
- **Code Execution**: Judge0 integration for real-time code compilation
- **Submission Tracking**: History of all code submissions with results
- **Admin Dashboard**: Role-based access for problem management

### Advanced Features
- **Problem Playlists**: Create custom problem sets for focused practice
- **Progress Tracking**: Visualize your solving statistics and improvement
- **Leaderboards**: Compete with other developers worldwide
- **Responsive Design**: Fully responsive layout for all devices
- **Toast Notifications**: Real-time feedback on user actions

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router
- **Code Editor**: Monaco Editor
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Code Execution**: Judge0 API
- **HTTP Client**: Axios

### Development Tools
- **Bundler**: Vite
- **Linting**: ESLint + Prettier
- **Version Control**: Git

## 📂 Folder Structure

```
leetlab/
├── client/                  # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Application pages
│   │   ├── store/           # Zustand state management
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Backend application
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── app.js           # Express application
│   ├── .env
│   ├── package.json
│   └── server.js            # Server entry point
│
├── prisma/                  # Database configuration
│   ├── migrations/          # Database migration history
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.js              # Database seeding script
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/leetlab.git
   cd leetlab
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   cd ../prisma && npm install
   ```

3. Set up environment variables (see below)

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. Start the development servers:
   ```bash
   # In server directory
   npm run dev
   
   # In client directory
   npm run dev
   ```

6. Access the application at:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

## 🔒 Environment Variables

Create a `.env` file in both `client` and `server` directories:

### Client/.env
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_JWT_SECRET_KEY=your_jwt_secret_key
```

### Server/.env
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/leetlabdb?schema=public"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN=7d
JUDGE0_API_KEY=your_judge0_api_key
JUDGE0_URL=https://judge0-ce.p.rapidapi.com
```

## 🌐 API Routes

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get single problem
- `POST /api/problems` - Create new problem (Admin only)
- `PUT /api/problems/:id` - Update problem (Admin only)
- `DELETE /api/problems/:id` - Delete problem (Admin only)

### Submissions
- `POST /api/submissions` - Submit code for execution
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/:id` - Get single submission

### Playlists
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create new playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist


## 📚 Credits

- **Judge0 API** - For code execution functionality
- **Monaco Editor** - For the VS Code-like editor experience
- **DaisyUI** - For beautiful UI components
- **React Community** - For amazing libraries and tools


---

**LeetLab** © 2023 - A full-stack coding platform for developers to practice and master coding interview skills.
