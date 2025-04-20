# Contributing to Sentinel Core

Thanks for your interest in contributing to **Sentinel Core**! 🚀  
We welcome bug reports, feature suggestions, and code contributions from the community.

---

## 📦 Repository Structure

```bash
src/
├── controllers/   → REST API endpoints
├── services/      → Business logic
├── middlewares/   → Custom Express/Nest middleware
├── gateways/      → WebSocket handlers
├── config/        → Environment and constants
├── utils/         → Utility and helper functions
```

---

## ✅ Requirements

- Node.js v20+
- PostgreSQL
- Yarn or npm
- A `.env` file (see README)

---

## 🛠 Setup

```bash
npm install
npm run start:dev
```

---

## ✍️ Commit Conventions

We use **Conventional Commits**:

- `feat:` — New feature  
- `fix:` — Bug fix  
- `chore:` — Maintenance/cleanup  
- `refactor:` — Code improvement  
- `docs:` — Documentation only  
- `test:` — Testing-related  
- `ci:` — CI/CD scripts  

Example:

```bash
git commit -m "feat(metrics): add netOut to threshold comparison"
```

---

## 🔃 Create a Pull Request

1. Fork the repo
2. Create a new branch:  
   ```bash
   git checkout -b feat/my-feature
   ```
3. Make your changes and commit
4. Push to your fork:  
   ```bash
   git push origin feat/my-feature
   ```
5. Open a pull request 🚀

---

## 🧪 Run Tests

```bash
npm run test
```

---

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.
