# 🔐 Full Stack Authentication System
**React + TypeScript (Frontend) | NestJS + Hexagonal Architecture (Backend)**

A complete authentication system demonstrating professional architectural patterns, clean code principles, and real frontend-backend integration.

---

## 🎯 Project Overview

This project showcases:

- ✅ **Hexagonal Architecture** (Backend)
- ✅ **Atomic Design** (Frontend)
- ✅ **TypeScript** throughout
- ✅ **Real HTTP integration** (no mocks in frontend)
- ✅ **Clean separation** of concerns
- ✅ **Professional Git workflow**

---

## 🏗️ Architecture

### **Backend - NestJS (Hexagonal/Ports & Adapters)**

```
src/
├── domain/           # Core business logic (framework-independent)
│   ├── entities/     # Business models
│   ├── repositories/ # Repository interfaces (ports)
│   └── exceptions/   # Business exceptions
│
├── application/      # Use cases (orchestration)
│   ├── use-cases/    # Business logic
│   └── dto/          # Application DTOs
│
└── infrastructure/   # External adapters
    ├── controllers/  # HTTP endpoints
    ├── repositories/ # Mock implementations
    ├── dto/          # Request/response validation
    └── filters/      # Exception handling
```

**Key Principles:**
- Domain layer has **zero framework dependencies**
- Use cases depend on **interfaces, not implementations**
- Easy to swap repositories (mock → database)

---

### **Frontend - React (Atomic Design)**

```
src/
├── components/
│   ├── atoms/        # Basic UI elements (Button, Input, Text)
│   ├── molecules/    # Simple combinations (FormField, LoginActions)
│   ├── organisms/    # Complex components (LoginForm)
│   ├── templates/    # Page layouts (AuthTemplate)
│   └── pages/        # Complete views (LoginPage)
│
├── domain/           # Business logic
│   └── auth/
│       ├── types/    # Domain types
│       └── repositories/ # Repository interfaces
│
├── application/      # Use cases
│   └── use-cases/
│       └── auth/
│           └── login/ # useLogin hook
│
└── infrastructure/   # External adapters
    └── repositories/
        └── auth-http.repository.ts # HTTP implementation
```

**Key Principles:**
- Components follow **single responsibility**
- State flows **unidirectionally**
- Business logic separated from UI

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                        │
│                                                          │
│  User fills form                                        │
│      ↓                                                   │
│  LoginForm validates (syntax)                           │
│      ↓                                                   │
│  useLogin hook orchestrates                             │
│      ↓                                                   │
│  AuthHttpRepository                                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ HTTP POST /auth/login
                       │
┌──────────────────────▼──────────────────────────────────┐
│ BACKEND (NestJS)                                        │
│                                                          │
│  AuthController validates request                       │
│      ↓                                                   │
│  LoginUseCase executes business logic                   │
│      ↓                                                   │
│  UserMockRepository checks credentials                  │
│      ↓                                                   │
│  Response: { accessToken, user }                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 API Endpoint

### **POST /auth/login**

Authenticates user with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Success Response (200):**
```json
{
  "accessToken": "mock-token",
  "user": {
    "email": "admin@example.com",
    "name": "Administrator"
  }
}
```

**Error Response (401):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "timestamp": "2026-02-10T18:42:55.000Z"
}
```

---

## 🧪 Test Credentials

| Email | Password | Name |
|-------|----------|------|
| `admin@example.com` | `123456` | Administrator |
| `user@test.com` | `password` | Test User |
| `demo@demo.com` | `demo123` | Demo User |

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+
- npm or yarn

### **Backend Setup**

```bash
cd backend
npm install
npm run start:dev
```

Server runs on: **http://localhost:3000**

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Application runs on: **http://localhost:5173**

---

## 📋 Features

### **Backend**
- ✅ Hexagonal Architecture (testable, maintainable)
- ✅ Dependency Injection with tokens
- ✅ Input validation with `class-validator`
- ✅ Global exception handling
- ✅ CORS configured
- ✅ Password hashing with bcrypt
- ✅ TypeScript strict mode

### **Frontend**
- ✅ Atomic Design methodology
- ✅ Fully typed with TypeScript
- ✅ Real-time form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ CSS Modules (scoped styles)

---

## 🎓 Key Concepts Demonstrated

### **Hexagonal Architecture**
- **Domain** is pure business logic (no frameworks)
- **Application** orchestrates use cases
- **Infrastructure** handles I/O (HTTP, DB, etc.)
- Easy to test, maintain, and extend

### **Atomic Design**
- **Atoms** → Basic elements (Button, Input)
- **Molecules** → Simple combinations (FormField)
- **Organisms** → Complex components (LoginForm)
- **Templates** → Page layouts
- **Pages** → Complete views

### **Dependency Injection**
```typescript
// Backend uses tokens to avoid coupling
{
  provide: USER_REPOSITORY,
  useClass: UserMockRepository,
}

// Frontend uses constructor injection
const authRepository = new AuthHttpRepository();
const { login } = useLogin(authRepository);
```

### **Separation of Concerns**
```
UI Components → Use Cases → Repositories → Data Source
```

Each layer only knows about its immediate neighbor through interfaces.

---

## 🔄 Migration Path: Mock → Real Database

To connect a real database, **only change the infrastructure layer**:

### **Backend**

```typescript
// Create new repository
@Injectable()
export class UserPostgresRepository implements IUserRepository {
  // Implementation with TypeORM/Prisma
}

// Update module
{
  provide: USER_REPOSITORY,
  useClass: UserPostgresRepository, // ← Only this changes
}
```

**No changes needed in:**
- ❌ Domain layer
- ❌ Use cases
- ❌ Controllers

---

## 🧪 Testing Strategy

### **Backend (Unit Tests)**
```typescript
// Mock repository for testing
const mockRepo: IUserRepository = {
  findByEmail: jest.fn().mockResolvedValue(mockUser),
};

const useCase = new LoginUseCase(mockRepo);
```

### **Frontend (Component Tests)**
```typescript
// Test with mock repository
const mockRepo: IAuthRepository = {
  login: jest.fn().mockResolvedValue(mockResponse),
};

render(<LoginPage authRepository={mockRepo} />);
```

---

## 📚 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Backend** | NestJS | Server framework |
| **Backend** | TypeScript | Type safety |
| **Backend** | class-validator | DTO validation |
| **Backend** | bcrypt | Password hashing |
| **Frontend** | React 18 | UI library |
| **Frontend** | TypeScript | Type safety |
| **Frontend** | Vite | Build tool |
| **Frontend** | CSS Modules | Scoped styling |

---

## 🛡️ Security Features

- ✅ Password hashing (bcrypt)
- ✅ Input validation (class-validator)
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Type safety throughout

**Note:** This is a demonstration project. Production systems need:
- Real JWT tokens
- Refresh token rotation
- Rate limiting
- Database encryption
- HTTPS

---

## 🎯 Development Practices

- ✅ **Conventional commits** (semantic versioning)
- ✅ **Feature branches** (short-lived)
- ✅ **Clean code** principles
- ✅ **SOLID** principles
- ✅ **DRY** (Don't Repeat Yourself)
- ✅ **Separation of concerns**

---

## 📈 Next Steps

### **Backend**
- [ ] Implement real JWT tokens
- [ ] Connect PostgreSQL/MySQL
- [ ] Add refresh token mechanism
- [ ] Implement role-based authorization
- [ ] Add rate limiting
- [ ] Add logging (Winston)

### **Frontend**
- [ ] Add React Router (navigation)
- [ ] Implement protected routes
- [ ] Add form validation with Zod/Yup
- [ ] Save token in localStorage
- [ ] Add "Remember Me" feature
- [ ] Implement token refresh logic

---

## 📝 Project Structure

```
login-system/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── package.json
│   └── README.md
│
└── frontend/                # React App
    ├── src/
    │   ├── components/
    │   ├── domain/
    │   ├── application/
    │   └── infrastructure/
    ├── package.json
    └── README.md
```

---

## 🤝 Contributing

This is a demonstration project for learning purposes. Feel free to:
- Fork and experiment
- Suggest improvements
- Use as a template for your projects

---


**Happy Coding! 🚀**