# Blog Platform Backend

This is the backend for a blogging platform that allows users to write, update, and delete their own blogs. The platform features role-based access control, with two roles: Admin and User. Admins can manage users and blogs, while Users can create, update, and delete their own blogs.

**Technologies Used**

    TypeScript
    Node.js
    Express.js
    MongoDB (with Mongoose for ORM)

**Features**

    User Roles:
        Admin: Can manage users and their blogs, including blocking users and deleting blogs.
        User: Can create, update, and delete their own blogs. Cannot perform admin tasks.
    Authentication & Authorization:
        JWT-based user authentication and role-based access control.
    Blog API:
        Public API for viewing blogs with support for searching, sorting, and filtering.
        Admins can delete any blog, while users can only delete their own.

**API Endpoints**
1. Authentication
Register User

    POST /api/auth/register
    Allows new users to register with the platform.

Login User

    POST /api/auth/login
    Authenticates users and generates a JWT token.

2. Blog Management
Create Blog

    POST /api/blogs
    Allows a logged-in user to create a new blog.

Update Blog

    PATCH /api/blogs/:id
    Allows a logged-in user to update their own blog.

Delete Blog

    DELETE /api/blogs/:id
    Allows a logged-in user to delete their own blog.

Get All Blogs (Public)

    GET /api/blogs
    Fetch all blogs with options for searching, sorting, and filtering.

3. Admin Actions
Block User

    PATCH /api/admin/users/:userId/block
    Allows an admin to block a user.

Delete Blog

    DELETE /api/admin/blogs/:id
    Allows an admin to delete any blog.

**Authentication**

JWT Authentication

    Users must log in to perform CRUD operations on blogs.
    Upon successful login, a JWT token is generated, which must be included in the Authorization header of subsequent requests.

**Models**

User Model

The User model includes properties for the user's name, email, password, role (admin or user), and a flag indicating if the user is blocked.
Blog Model

The Blog model includes properties for the title, content, the author (linked to the User model), and a flag indicating if the blog is published.
Installation

**Live url**
https://blog-website-backend-virid.vercel.app
