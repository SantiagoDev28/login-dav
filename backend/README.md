# 🔐 Login System - Backend API

NestJS backend with **Hexagonal Architecture** (Ports & Adapters) for authentication system.

---

## 🏗️ Architecture Overview

This project follows **Hexagonal Architecture** principles, separating concerns into three distinct layers:

```
Infrastructure (Adapters) → Application (Use Cases) → Domain (Core Business Logic)
```

### **Why Hexagonal Architecture?**
- ✅ **Testable**: Business logic independent of frameworks
- ✅ **Flexible**: Easy to swap implementations (mock → database)
- ✅ **Maintainable**: Clear separation of responsibilities
- ✅ **Scalable**: Add features without breaking existing code

---

## 📁 Project Structure

```
src/
├── domain/                          # Core business logic (pure TypeScript)
│   ├── entities/
│   │   └── user.entity.ts          # User domain model
│   ├── repositories/
│   │   └── user.repository.ts      # Repository interface (port)
│   ├── exceptions/
│   │   └── invalid-credentials.exception.ts
│   └── types/
│       └── auth-response.type.ts
│
├── application/                     # Use cases (business rules)
│   ├── dto/
│   │   └── auth/
│   │       └── login.dto.ts        # Application-level DTO
│   └── use-cases/
│       └── auth/
│           └── login/
│               └── login.use-case.ts   # Login orchestration
│
└── infrastructure/                  # External adapters (frameworks, DB, HTTP)
    ├── controllers/
    │   └── auth/
    │       └── auth.controller.ts  # HTTP endpoints
    ├── dto/
    │   └── auth/
    │       ├── login-request.dto.ts   # Request validation
    │       └── login-response.dto.ts  # Response shape
    ├── repositories/
    │   └── user-mock.repository.ts    # Mock DB implementation
    ├── filters/
    │   └── global-exception.filter.ts # Error handling
    └── modules/
        └── auth.module.ts          # Dependency injection
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+
- npm or yarn

### **Installation**

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev
```

Server runs on: `http://localhost:3000`

---

## 🔑 API Endpoints

### **POST /auth/login**

Authenticate user with email and password.

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
  "timestamp": "2026-02-10T..."
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

## 🎯 Hexagonal Architecture Explained

### **Domain Layer** (Core Business Logic)
**Location:** `src/domain/`

Contains pure business logic with **zero framework dependencies**.

- **Entities**: Core domain models (`User`)
- **Repository Interfaces**: Contracts defining what data operations exist
- **Exceptions**: Business rule violations
- **Types**: Domain-level type definitions

**Example:**
```typescript
// user.repository.ts (interface/port)
export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
}
```

---

### **Application Layer** (Use Cases)
**Location:** `src/application/`

Orchestrates business logic without knowing implementation details.

- **Use Cases**: Application-specific business rules
- **DTOs**: Data transfer objects for use cases

**Example:**
```typescript
// login.use-case.ts
@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  
  async execute(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    // Validation logic...
    return { accessToken, user };
  }
}
```

**Key principle:** Use cases depend on **interfaces**, not concrete implementations.

---

### **Infrastructure Layer** (Adapters)
**Location:** `src/infrastructure/`

Implements interfaces and handles external concerns (HTTP, database, etc.).

- **Controllers**: HTTP request handlers
- **Repository Implementations**: Concrete data access (mock, database, etc.)
- **DTOs with Validation**: Request/response schemas
- **Filters**: Error handling

**Example:**
```typescript
// user-mock.repository.ts (adapter/implementation)
@Injectable()
export class UserMockRepository implements IUserRepository {
  private users: User[] = [...]; // Mock data
  
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }
}
```

---

## 🔄 Data Flow

```
1. HTTP Request
   ↓
2. Controller (infrastructure)
   → Validates input (class-validator)
   → Calls Use Case
   ↓
3. Use Case (application)
   → Executes business logic
   → Calls Repository (via interface)
   ↓
4. Repository (infrastructure)
   → Accesses data source (mock/database)
   → Returns domain entity
   ↓
5. Use Case
   → Processes result
   → Returns response
   ↓
6. Controller
   → Formats HTTP response
   ↓
7. HTTP Response
```

---

## 🔌 Dependency Injection

NestJS uses **Dependency Injection** to connect layers without tight coupling.

**Module configuration:**
```typescript
@Module({
  providers: [
    LoginUseCase,
    {
      provide: USER_REPOSITORY,      // Token
      useClass: UserMockRepository,  // Implementation
    },
  ],
})
export class AuthModule {}
```

**Usage in Use Case:**
```typescript
constructor(
  @Inject(USER_REPOSITORY)  // Inject via token
  private readonly userRepository: IUserRepository,
) {}
```

**Benefits:**
- Easy to swap implementations (mock → real database)
- Testable (inject mock repositories)
- No hard dependencies between layers

---

## 📚 Key Technologies

| Technology | Purpose |
|------------|---------|
| **NestJS** | Server framework |
| **TypeScript** | Type safety |
| **class-validator** | DTO validation |
| **bcrypt** | Password hashing |

---

## 🧪 Testing Strategy

### **Unit Tests** (Use Cases)
```typescript
// Mock repository for testing
const mockUserRepo: IUserRepository = {
  findByEmail: jest.fn().mockResolvedValue(mockUser),
};

const loginUseCase = new LoginUseCase(mockUserRepo);
await loginUseCase.execute({ email, password });
```

### **Integration Tests** (Controllers)
```typescript
// Test entire endpoint
request(app.getHttpServer())
  .post('/auth/login')
  .send({ email, password })
  .expect(200);
```

---

## 🔄 Migration Path: Mock → Real Database

To switch from mock to real database, **only change the infrastructure layer**:

### **Step 1:** Create real repository implementation
```typescript
// user-postgres.repository.ts
@Injectable()
export class UserPostgresRepository implements IUserRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
}
```

### **Step 2:** Update module
```typescript
{
  provide: USER_REPOSITORY,
  useClass: UserPostgresRepository,  // ✅ Changed from UserMockRepository
}
```

**That's it!** No changes needed in:
- ❌ Domain layer
- ❌ Application layer (use cases)
- ❌ Controllers

---

## 🛡️ Security Features

- ✅ **Password hashing** with bcrypt
- ✅ **Input validation** with class-validator
- ✅ **CORS** configured for frontend
- ✅ **Global exception handling**
- ✅ **Type safety** throughout

---

## 🚀 Next Steps

- [ ] Implement real JWT tokens
- [ ] Connect to PostgreSQL/MySQL
- [ ] Add user registration endpoint
- [ ] Implement refresh tokens
- [ ] Add role-based authorization
- [ ] Add rate limiting
- [ ] Add logging with Winston

---

## 📝 Environment Variables

Create `.env` file in root:

```env
PORT=3000
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRES_IN=1h
```

---

## 🎓 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Hexagonal Architecture](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

## 📄 License

MIT License - Free to use for learning and commercial projects.

---

**Built with ❤️ using NestJS + Hexagonal Architecture**