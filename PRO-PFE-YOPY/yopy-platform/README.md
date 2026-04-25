

# YOPY — Growing Brighter Together

YOPY is an AI-assisted, child-focused educational platform that combines **interactive games**, **parental monitoring**, and **dashboard analytics** to create a safe and engaging digital environment for children.  

The platform is built using **PHP, JavaScript, Bootstrap**, and **MySQL**, with a modular architecture to support multiple games, child accounts, and parental dashboards.

---

## 📂 Project Structure

```

yopy/
│
├── assets/             # CSS, JS, images, and sounds
├── controllers/        # PHP controllers for authentication, child, game, score, dashboard
├── models/             # PHP models (User, Child, Game, Score)
├── views/              # Frontend views for auth, child, parent, admin
├── games/              # Individual game modules
├── config/             # Database configuration
├── public/             # Entry point (index.php)
└── docs/               # Documentation files




```
## 📄 Documentation

The project is fully documented in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [overview.md](docs/overview.md) | High-level technical summary of YOPY’s modules, AI, and security design |
| [architecture.md](docs/architecture.md) | Overall system architecture and component structure |
| [domain-model.md](docs/domain-model.md) | Domain entities and relationships |
| [database-schema.md](docs/database-schema.md) | MySQL database tables and relations |
| [security-architecture.md](docs/security-architecture.md) | Security design, authentication, and RBAC |
| [game-architecture.md](docs/game-architecture.md) | Game engine, session management, and scoring logic |
| [system-workflows.md](docs/system-workflows.md) | Main system workflows: login, gameplay, score, parent dashboard |
| [api-design.md](docs/api-design.md) | Backend endpoints and data interactions |
| [deployment.md](docs/deployment.md) | Installation, configuration, and deployment instructions |

---

## 🚀 Features

- **Child-Focused Games**: Memory, logic, and math games.
- **Parent Dashboard**: Track child performance and statistics.
- **Admin Panel**: Manage users and games.
- **Secure Authentication**: Role-based access control and password hashing.
- **Score Tracking**: Game sessions and results stored in MySQL.
- **Modular Architecture**: Easy to add new games or features.

---

## ⚙️ Deployment

1. Install Apache/Nginx, PHP 8+, MySQL.
2. Import the database schema from `database-schema.md`.
3. Configure `config/database.php` with your DB credentials.
4. Place the project in your web server root.
5. Open the application in a browser at `http://localhost/yopy`.

For full instructions, see [deployment.md](docs/deployment.md).

---

## 💻 Development

- Follow the same stack as production (XAMPP/LAMP/WAMP recommended).
- Add new games under the `games/` folder.
- Controllers handle logic; models interact with the database.
- Use prepared statements for all database operations.

---

## 🔒 Security Highlights

- Secure password hashing (bcrypt)
- Role-based access (child, parent, admin)
- Input validation and CSRF protection
- Game score verification to prevent tampering

---

## 📚 References

- PHP: [https://www.php.net](https://www.php.net)
- MySQL: [https://www.mysql.com](https://www.mysql.com)
- Bootstrap: [https://getbootstrap.com](https://getbootstrap.com)

-

