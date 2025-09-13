# Backend API

A comprehensive Node.js backend API built with Express.js, TypeScript, and MongoDB. This API provides endpoints for managing user profiles, projects, education, experience, news, and more.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based authentication with protected routes
- **User Management** - Complete user profile management with image uploads
- **Project Portfolio** - Project management with tech stack associations
- **Education & Experience** - Professional background management
- **News Management** - News/article publishing system
- **Category & Tech Stack** - Categorization and technology stack management
- **File Upload** - Cloudinary integration for image uploads
- **Data Validation** - Joi validation for all endpoints
- **TypeScript** - Full TypeScript support with strict type checking

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary
- **Validation**: Joi
- **Security**: bcryptjs for password hashing
- **Development**: Nodemon, ts-node

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── Aws.ts       # AWS S3 configuration
│   │   ├── cloudinary.ts # Cloudinary configuration
│   │   ├── db.ts        # Database connection
│   │   └── ENV.ts       # Environment variables
│   ├── controllers/      # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── category.controller.ts
│   │   ├── education.controller.ts
│   │   ├── experience.controller.ts
│   │   ├── news.controller.ts
│   │   ├── project.controller.ts
│   │   ├── techstach.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/      # Custom middlewares
│   │   ├── authValidate.middleware.ts
│   │   ├── categoryValidate.middleware.ts
│   │   ├── educationValidate.middleware.ts
│   │   ├── experienceValidate.middleware.ts
│   │   ├── newsValidate.middleware.ts
│   │   ├── projectValidate.middleware.ts
│   │   ├── protectRoute.ts
│   │   ├── techstackValidate.middleware.ts
│   │   ├── upload.ts
│   │   └── userValidate.middleware.ts
│   ├── models/          # MongoDB models
│   │   ├── category.model.ts
│   │   ├── education.model.ts
│   │   ├── experience.model.ts
│   │   ├── news.model.ts
│   │   ├── project.model.ts
│   │   ├── techstack.model.ts
│   │   └── user.model.ts
│   ├── routes/          # API routes
│   │   ├── auth.route.ts
│   │   ├── category.route.ts
│   │   ├── education.route.ts
│   │   ├── experience.route.ts
│   │   ├── news.route.ts
│   │   ├── project.route.ts
│   │   ├── techstack.route.ts
│   │   └── user.route.ts
│   ├── utils/           # Utility functions
│   │   ├── phoneValidate.ts
│   │   └── s3Uploader.ts
│   ├── validations/     # Joi validation schemas
│   │   ├── auth.validator.ts
│   │   ├── category.validator.ts
│   │   ├── education.validator.ts
│   │   ├── experience.validator.ts
│   │   ├── news.validator.ts
│   │   ├── project.validator.ts
│   │   ├── techstack.validator.ts
│   │   └── user.validator.ts
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-jwt-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/check-auth` - Check authentication status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Education
- `GET /api/educations` - Get all education records
- `POST /api/educations` - Create education record
- `PUT /api/educations/:id` - Update education record
- `DELETE /api/educations/:id` - Delete education record

### Experience
- `GET /api/experiences` - Get all experience records
- `POST /api/experiences` - Create experience record
- `PUT /api/experiences/:id` - Update experience record
- `DELETE /api/experiences/:id` - Delete experience record

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Tech Stacks
- `GET /api/techstacks` - Get all tech stacks
- `POST /api/techstacks` - Create tech stack
- `PUT /api/techstacks/:id` - Update tech stack
- `DELETE /api/techstacks/:id` - Delete tech stack

### News
- `GET /api/news` - Get all news articles
- `POST /api/news` - Create news article
- `GET /api/news/:id` - Get news article by ID
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Data Models

### User Model
```typescript
{
  name: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
  imageKey?: string;
  title?: string;
  about_me?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Project Model
```typescript
{
  user: ObjectId;
  title: string;
  description: string;
  techStack: ObjectId[];
  githubUrl?: string;
  liveDemoUrl?: string;
  image?: string;
  featured: boolean;
}
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation with Joi
- Protected routes middleware
- CORS enabled
- Environment variable configuration

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `joi` - Data validation
- `cloudinary` - Image upload service
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `multer` - File upload handling
- `morgan` - HTTP request logger
- `slugify` - URL-friendly strings
- `sophone` - Phone number validation

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Development server
- `@types/*` - TypeScript type definitions

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.
