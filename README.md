# securetasks-be

# 🔐 SecureTasks API

SecureTasks is a Node.js and Express-based REST API for managing tasks with built-in authentication, role-based access control, and OWASP Top 10 security mitigations.

This project was designed as an application security demo to showcase secure API design principles. 

Notes: This demo is in progress. 

---

## 🚀 Features

- ✅ JWT Authentication (Login & Register)
- ✅ Role-Based Access Control (`user`, `admin`)
- ✅ Task CRUD (Create, Read, Delete)
- ✅ Password policy enforcement
- ✅ Middleware-based input validation
- ✅ Helmet for secure HTTP headers
- ✅ Rate limiting for API & login
- ✅ Centralized error handling
- ✅ Prisma ORM with PostgreSQL
- ✅ Secure middleware architecture

---

## 🧠 OWASP Top 10 Mitigations

| OWASP Category                     | Status           |
|-----------------------------------|------------------|
| A01: Broken Access Control         | ✅ `protect` & `allowRoles` middleware |
| A02: Cryptographic Failures        | ✅ bcrypt hashing, JWT with secret and expiration |
| A03: Injection                     | ✅ Prisma param queries + input validation |
| A04: Insecure Design               | ✅ STRIDE threat model in `security.md` |
| A05: Security Misconfiguration     | ✅ Helmet, rate limiter, CORS, CSRF (TBD) |
| A06: Vulnerable Components         | ✅ Semgrep + CodeQL CI scanning |
| A07: Identification/Auth Failures  | ✅ Password policy, login throttling |
| A08: Software/Data Integrity       | ⏳ CI/CD integrity practices planned |
| A09: Logging/Monitoring Failures   | ⏳ Winston audit logging planned |
| A10: SSRF                          | ✅ Not applicable (no outbound requests) |

---

## 🛠 Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- Helmet, Rate Limiter, Validator
- GitHub Actions (CodeQL, Semgrep)

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourname/securetasks-be.git
