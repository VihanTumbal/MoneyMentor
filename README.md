# 💰 Money Mentor

A modern, AI-powered finance management platform built with Next.js 14, leveraging cutting-edge tools for seamless account tracking, transaction management, budgeting, and insightful analytics.

---

## 🛠 Tech Stack

### ⚙️ Frontend

- **Next.js 14** – App Router, API Routes, SSR
- **Tailwind CSS** – Utility-first styling, responsive design
- **shadcn/ui** – Customizable UI components (Cards, Buttons, Toasts)

### 🔗 Backend & Database

- **Prisma** – Type-safe ORM, schema modeling
- **Supabase (PostgreSQL)** – Stores users, accounts, transactions, budgets

### 🔐 Authentication & Security

- **Clerk** – User auth, OAuth, protected routes
- **ArcJet** – API security, rate limiting, bot protection

### 🔄 Background Processing

- **Inngest** – Handles recurring jobs like:
  - Monthly reports
  - Budget alerts
  - Transaction cleanup

### 🤖 AI Integration

- **Google Gemini** – Enables:
  - Receipt scanning
  - Spending analysis
  - Budget suggestions

---

## 🎯 Core Features

### 1. Authentication & Onboarding

- Clerk-powered sign-in/sign-up
- OAuth providers
- User profile and session management

### 2. Account Management

- Create/check multiple accounts
- Balance tracking
- Default account settings

### 3. Transaction Management

- Add/edit/delete transactions
- Smart categorization
- Receipt uploads
- Search & filter history

### 4. Budget Management

- Monthly budget creation
- Overspending alerts
- Category-level limits

### 5. Analytics & Reports

- Income vs Expense tracking
- Category-based charts
- Trends and summaries

### 6. AI-Powered Features

- Insightful financial summaries
- Smart budget recommendations
- Receipt-to-data conversion

### 7. Security

- Bot detection with ArcJet
- Secure API endpoints
- Rate-limiting and validation

---

## 📊 Database Schema Overview

| Table          | Description                           |
| -------------- | ------------------------------------- |
| `Users`        | Personal info, auth details           |
| `Accounts`     | Balance, type, currency, default flag |
| `Transactions` | Amount, category, description, date   |
| `Budgets`      | Limits, categories, alerts            |

---

## 🎨 UI/UX Features

- **Dashboard**: Overview with expenses, budgets, transactions
- **Responsive Design**: Mobile-first layout with Tailwind
- **Visuals**: Charts for category analysis, trends, comparisons

---

## 🔄 Background Jobs

- **Monthly**: Reset budgets, generate reports, update analytics
- **Notifications**: Budget limit alerts, summaries, key updates

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
