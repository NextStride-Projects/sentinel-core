# Sentinel Core 🧠

> Central API for collecting metrics, managing thresholds, users, and real-time alerts.

---

## 🔧 Features

- 🔐 Secure API key + JWT-based authentication
- 📊 Metric ingestion with threshold-based alerting
- 📣 Multi-channel alert notifications (Slack, Discord, Gmail)
- ⚙️ Server + user management
- 🔌 Real-time WebSocket broadcasting
- 🧱 Built with NestJS + Prisma

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_ORG/sentinel-core
cd sentinel-core
npm install
```

### 2. Setup Environment

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/sentinel
API_KEY=your_encrypted_api_key
ENCRYPTION_KEY=64_char_hex_key
JWT_SECRET=jwt_secret_key
NODE_ENV=development

GMAIL_USER=your@email.com
GMAIL_PASS=your_app_password

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

Generate secure keys:

```bash
npm run generate:secrets
npm run generate:jwt
```
---

## 🛠 Commands

| Script              | Description                     |
|---------------------|---------------------------------|
| `npm run start:dev` | Start with live reload          |
| `npm run build`     | Build the project               |
| `npm run lint`      | Lint code with ESLint           |
| `npm run format`    | Format with Prettier            |
| `npm run test`      | Run unit tests                  |
| `npm run release`   | Create version + changelog      |

---

## 📦 API

> Swagger docs available at `/api/docs` once the server is running.

---

## 🔐 Auth

Authentication is done via **encrypted JWTs** and **API keys**. Use the `/auth/login` endpoint to retrieve a token.

---

## 🧠 Project Structure

```bash
src/
├── controllers/
├── services/
├── middlewares/
├── gateways/
├── modules/
├── config/
├── utils/
```

---

## 🧪 Tech Stack

- **NestJS** + **Prisma**
- **PostgreSQL**
- **Socket.IO**
- **Winston & Morgan**
- **Swagger + Commitlint + Standard-Version**

---

## 📜 License

MIT — Built with ♥ by NextStride
