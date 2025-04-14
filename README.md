# BookShelf - A Community Book Exchange Platform

BookShelf is a modern web application built with Next.js that allows users to share, rent, and exchange books within their community. The platform connects book owners with book seekers, making it easy to discover and access books in your area.

## 🚀 Features

- **User Authentication**: Secure login and registration system with role-based access (Book Owner or Book Seeker)
- **Book Listings**: Book owners can create, update, and delete their book listings
- **Book Status Management**: Owners can mark books as "Available", "Rented", or "Exchanged"
- **Book Discovery**: Seekers can browse and search available books by title, author, genre, and location
- **Saved Books**: Seekers can save books to their personal collection for quick access
- **Responsive UI**: Modern, mobile-friendly design that works across all device sizes
- **Real-time Updates**: Changes to book status are immediately reflected across the platform

## 🔧 Tech Stack

- **Frontend**: Next.js 13+ with App Router, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Custom JWT-based auth system
- **Styling**: TailwindCSS for responsive design
- **Deployment**: Ready for Vercel deployment

## 📋 Setup Instructions

### Prerequisites

- Node.js 16+ installed
- MongoDB instance (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/bookshelf.git
   cd bookshelf
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚦 What's Working and What's Not

### Working Features

- ✅ User registration and login system
- ✅ Book creation, editing, and deletion
- ✅ Book status management (Available, Rented, Exchanged)
- ✅ Book search and filtering
- ✅ Saved books functionality
- ✅ Responsive UI across device sizes
- ✅ MongoDB database integration

### In Progress

- ⏳ Direct messaging between owners and seekers
- ⏳ Notification system for status changes
- ⏳ Rating and review system
- ⏳ Social sharing functionality

## 🎯 Bonus Features

- **MongoDB Integration**: Fully integrated with MongoDB for scalable data storage
- **Optimistic UI Updates**: Status changes reflect immediately in the UI before server confirmation
- **Detailed Book Filtering**: Advanced filtering options by multiple criteria
- **Book Statistics**: Dashboard shows counts of books by status
- **Elegant Error Handling**: User-friendly error states throughout the application

## 🤖 AI Tools Used

- **Cursor**: Used Cursor's AI assistant for code completion, debugging, and implementing complex features
- **Claude**: Leveraged Claude for generating boilerplate code and refining the UI design
- **GitHub Copilot**: Utilized for real-time code suggestions and documentation

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

## 📱 Mobile Support

The application is fully responsive and works on:

- Desktops
- Tablets
- Mobile phones

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Cursor team for building an incredible AI-powered coding tool
- All open-source contributors whose libraries made this project possible
