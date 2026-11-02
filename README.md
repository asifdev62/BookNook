<div align="center">

# 📚 BookNook

### Discover Books. Explore Categories. Build Your Reading Journey.

A modern and secure book management platform built with Next.js, TypeScript, MongoDB, and JWT Authentication.

<br />

[🌐 Live Demo](https://book-nook-ivory.vercel.app/) · [💻 Frontend Repository](https://github.com/asifdev62/BookNook.git) · [⚙️ Backend Repository](https://github.com/asifdev62/BookNook-Server.git)

<br />

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 🖥️ Homepage Preview

<div align="center">

![BookNook Homepage](./public/homepage.png)

*BookNook — A modern platform for discovering and exploring books.*

</div>

---

## 📖 About The Project

**BookNook** is a modern book management platform designed to make discovering and exploring books easier. It provides a clean and user-friendly interface where readers can browse books, explore categories, and view individual book details.

The application uses **JWT-based authentication and Next.js Proxy** to help protect restricted routes and manage access to protected areas.

With a responsive interface, organized book categories, and a separate backend repository, BookNook demonstrates full-stack web development using modern technologies.

### 🔗 Project Links

| Resource | Link |
|---|---|
| 🌐 Live Website | [BookNook Live Demo](https://book-nook-ivory.vercel.app/) |
| 💻 Frontend Source Code | [BookNook Frontend](https://github.com/asifdev62/BookNook.git) |
| ⚙️ Backend Source Code | [BookNook Server](https://github.com/asifdev62/BookNook-Server.git) |

## ✨ Features

- 📚 **Browse Books** — Explore a collection of books through a user-friendly interface.
- 🔍 **Book Details** — View information about individual books.
- 🗂️ **Category-Based Browsing** — Discover books organized by category.
- 🔐 **JWT Authentication** — Token-based authentication for protected resources.
- 🛡️ **Proxy-Based Route Protection** — Check authentication before allowing access to designated routes.
- 🗄️ **MongoDB Integration** — Store and manage application data.
- 🔌 **Separate Backend API** — Connect the frontend to a dedicated backend repository.
- 📱 **Responsive Design** — Enjoy a consistent experience across different screen sizes.
- 🎨 **Modern UI** — Clean layouts, attractive styling, and intuitive navigation.
- 🧩 **Reusable Components** — Maintain a structured and reusable component architecture.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling |
| MongoDB | Database |
| JWT | Token-based authentication |
| Next.js Proxy | Request-level checks and route protection |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend API framework |
| Lucide React | Icons |

## 🔒 Security & Authentication

Security is an important part of BookNook.

### JWT Authentication

JSON Web Tokens (JWT) are used as part of the authentication system to support authenticated access to protected resources.

### Next.js Proxy

Next.js Proxy performs request-level checks for designated protected routes. Depending on the application's implementation, it can inspect authentication information and redirect unauthenticated users.

### Backend API Security

The backend provides a separate API layer for application data and operations. Protected endpoints should validate authentication tokens and verify user permissions on the server.

### Security Best Practices

- Validate JWT signatures and relevant claims on the server.
- Protect restricted routes and API endpoints.
- Verify user permissions before performing sensitive operations.
- Store secrets and database credentials in environment variables.
- Avoid exposing sensitive credentials in client-side code.
- Use secure cookie settings where cookie-based authentication is implemented.

**Note:** Proxy-based checks are not a replacement for backend authorization. Protected API endpoints must independently validate authentication and permissions.

## 🚀 Getting Started

Follow these instructions to run BookNook locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- MongoDB or a MongoDB Atlas connection

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/asifdev62/BookNook.git
```

### 2. Navigate to the Frontend Directory

```bash
cd BookNook
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the frontend project root.

Add the environment variables required by your source code. For example:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Replace the example with your actual deployed backend API URL. The environment variable name must match what the frontend code expects.

If the application requires additional environment variables, configure them as well.

**Important:** Never commit environment files containing secrets to a public repository.

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## ⚙️ Backend Setup

BookNook uses a separate backend repository.

### 1. Clone the Backend Repository

```bash
git clone https://github.com/asifdev62/BookNook-Server.git
```

### 2. Navigate to the Backend Directory

```bash
cd BookNook-Server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Backend Environment Variables

Create a `.env` file using the variable names required by your backend implementation.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

These are example names. Confirm the actual names used in your backend source code before configuring the environment.

### 5. Start the Backend Server

Use the development command configured in your backend's `package.json`.

For example, if the project defines a `dev` script:

```bash
npm run dev
```

Check the backend repository's documentation and scripts for the correct startup command.

## 📂 Project Architecture

BookNook separates its frontend and backend into two repositories.

```text
BookNook/
│
├── public/
│   └── homepage.png
│
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
│
├── package.json
├── next.config.ts
└── README.md
```

The frontend structure above is illustrative and should be adjusted to match the actual repository.

**Backend Repository:** [BookNook-Server](https://github.com/asifdev62/BookNook-Server.git)

The backend handles API operations, database integration, and server-side authentication or authorization according to its implementation.

## 🌐 Deployment

The BookNook frontend is available online:

**Live Website:** https://book-nook-ivory.vercel.app/

When deploying or updating the project:

1. Push your changes to the appropriate GitHub repository.
2. Configure the frontend and backend deployment environments.
3. Add the required environment variables.
4. Verify the database connection.
5. Confirm that the frontend points to the correct backend API.
6. Test authentication and protected routes.
7. Verify the production build and deployed website.

## 🎯 What I Learned

This project provides practical experience with:

- Building a full-stack application.
- Developing a modern interface with Next.js and React.
- Writing type-safe code using TypeScript.
- Integrating a MongoDB database.
- Working with JWT-based authentication.
- Protecting routes using Next.js Proxy.
- Connecting a frontend to a separate backend API.
- Managing environment variables and deployment configuration.
- Creating reusable and responsive UI components.

## 🔮 Future Improvements

Potential improvements include:

- Advanced book search and filtering.
- Book ratings and reviews.
- Personalized reading lists.
- Reading progress tracking.
- Enhanced user profiles.
- Additional authorization and security checks.

## 🤝 Contributing

Suggestions and contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Open a pull request.

## 📄 License

Add a `LICENSE` file if you intend to distribute BookNook under a specific open-source license.

---

<div align="center">

### 📚 BookNook

**Read More. Discover More.**

Built with ❤️ using Next.js, TypeScript, and MongoDB.

<br />

[Live Demo](https://book-nook-ivory.vercel.app/) · [Frontend GitHub](https://github.com/asifdev62/BookNook.git) · [Backend GitHub](https://github.com/asifdev62/BookNook-Server.git)

</div>
