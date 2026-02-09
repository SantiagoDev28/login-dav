# 🔐 Login UI — React + TypeScript + Atomic Design

A professional login UI built with **React**, **TypeScript**, and **Atomic Design**, focused on clean architecture, strict typing, and component reusability.  
Authentication is simulated using mock data (no backend).

---

## 🎯 What This Project Demonstrates
- Atomic Design–based architecture
- Clear separation between UI, logic, and domain
- Client-side form validation
- Loading, error, and success states
- Fully typed components with TypeScript
- Scoped styling using CSS Modules

---

## 🏗️ Architecture (Atomic Design)

## Atoms → Molecules → Organisms → Templates → Pages

Each layer has a single responsibility and respects the design hierarchy.

---

## 📁 Project Structure

src/
├─ components/
│ ├─ atoms/ # Button, Input, Label, Text
│ ├─ molecules/ # FormField, LoginActions
│ ├─ organisms/ # LoginForm
│ ├─ templates/ # AuthTemplate
│ └─ pages/ # LoginPage
│
├─ domain/auth/ # auth.types | auth.mock | auth.service
├─ hooks/ # useLogin
└─ App.tsx

---

## 🔄 Data Flow

LoginForm → onSubmit
↓
LoginPage
↓
useLogin (hook)
↓
auth.service
↓
auth.mock

- The UI does **not** know how authentication works  
- The domain layer is **independent of React**

---

## 🧠 Key Layers

### 🧬 LoginForm (Organism)
- Manages form state
- Performs syntactic validation (required fields, email format)
- Emits `{ email, password }`
- **Does not authenticate**

### 🪝 useLogin (Hook)
- Orchestrates the login flow
- Manages `isLoading`, `error`, `isAuthenticated`
- Calls the authentication service

### 🔐 auth.service
- Simulates async authentication
- Validates credentials against a mock data source
- Completely decoupled from React

---

## 🎨 Styling
- CSS Modules
- Component-scoped styles
- Responsive layout
- No CSS frameworks used

---

## 🧪 Test Credentials

| Email             | Password |
|-------------------|----------|
| admin@example.com | 123456   |

---

## 🚀 Scripts

```bash
npm install
npm run dev
npm run build

```


## 🧩 Technologies

React 18

TypeScript

Vite

CSS Modules

## 🏆 Best Practices Applied

Separation of Concerns

Single Responsibility Principle

Strict typing (no any)

UI decoupled from business logic

Scalable and maintainable architecture

This project was built as a technical exercise to demonstrate modern frontend architecture, strong TypeScript usage, and clean component design.