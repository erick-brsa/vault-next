# Vault - Subscription Manager

> A robust solution for managing, optimizing, and tracking digital subscriptions.

**Vault** is a subscription management platform designed for users who want total control over their digital finances. It centralizes payments, visualizes billing periods, and optimizes personal cash flow.

---

## Technical Highlights
- **Data Architecture:** Optimized relational schema powered by PostgreSQL.
- **Intelligent Seeding:** Automated master data loading (Categories, Services, Billing Periods) with built-in cleanup logic for **idempotency**.
- **Developer-Centric CLI:** Visual data load summary featuring ANSI colors and dynamic tables.
- **Full Type-Safety:** Seamless TypeScript integration with Prisma Client.

## 🚀 Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/erick-brsa/vault-next.git
cd vault-next
pnpm install
```

### 2. Environment Variables
Create a `.env` file based on the provided template:
```env
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=verify-full"
```

### 3. Database Setup (Prisma)
Sync the schema with your Neon instance and populate master data:
```bash
pnpm prisma migrate dev
pnpm db:seed
```

### 4. Run Development Server
```bash
pnpm dev
```

---

## 🛠️ Available Scripts
| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server. |
| `pnpm db:seed` | Clears and populates the database (Idempotent). |
| `pnpm db:studio` | Opens Prisma GUI to explore your data. |
| `pnpm build` | Creates an optimized production build. |

---
Made with ❤️ by Erick Briones