# 📌 CompanyHub Pro Backend

CompanyHub Pro Backend is a simple **Express.js API server** built for a dummy corporate website.  
It provides endpoints for Home, About, Services, Expertise, Dashboard, and Contact forms.  

---

## 🚀 Features
- Node.js + Express.js backend
- RESTful APIs for website content & dashboard
- In-memory storage (no DB yet)
- Middleware: Morgan, CORS, Error Handling
- Ready to connect with frontend

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Prasen8/CompanyHub-Pro-Backend.git

cd CompanyHub-Pro-Backend

# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

http://localhost:5000

📡 API Endpoints
✅ Root

GET /
{
  "message": "Welcome to CompanyHub Pro API 🚀",
  "docs": {
    "health": "/api/health",
    "home": "/api/home",
    "about": "/api/about",
    "services": "/api/services",
    "expertise": "/api/expertise",
    "dashboard": "/api/dashboard",
    "contacts": "/api/contacts"
  }
}

🏥 Health Check

GET /api/health
{
  "ok": true,
  "service": "CompanyHub Pro API",
  "time": "2025-08-21T18:30:00.000Z"
}

🏠 Home

GET /api/home

ℹ️ About

GET /api/about

🛠 Services

GET /api/services

🎯 Expertise

GET /api/expertise

📊 Dashboard
1. Get Full Dashboard

GET /api/dashboard
Returns summary, projects, and activities.

2. Get Summary

GET /api/dashboard/summary

{
  "activeProjects": 3,
  "downloadsThisMonth": 12,
  "upcomingMeetings": 2,
  "unreadNotifications": 5
}


3. Update Summary

POST /api/dashboard/summary
{
  "downloadsThisMonth": 20,
  "upcomingMeetings": 3
}

4. Get Projects

GET /api/dashboard/projects

5. Add Project

POST /api/dashboard/projects
{
  "name": "AI Research",
  "client": "OpenAI",
  "progress": 30,
  "status": "In Progress",
  "dueDate": "2025-12-31",
  "members": 4
}

6. Get Activities

GET /api/dashboard/activity

7. Add Activity

POST /api/dashboard/activity
{
  "action": "User joined new project",
  "type": "info"
}

📬 Contacts
1. Get All Contacts

GET /api/contacts

2. Create Contact

POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I am interested in your services"
}

##⚡ Error Handling

If you hit a wrong route, you’ll get:
{
  "message": "Not Found - /wrongroute"
}

