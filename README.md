# Dev Finder

A platform for developers to find and join coding rooms.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Video**: Stream.io Video SDK
- **Chat**: Stream.io Chat

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Google OAuth credentials

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="mongodb://admin:example@localhost:27017/dev-finder?authSource=admin"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Stream.io (for video and chat)
STREAM_API_KEY="your-stream-api-key"
STREAM_API_SECRET="your-stream-api-secret"
```

### Database Setup

#### Option 1: Local MongoDB with Docker

```bash
# Start MongoDB container
docker-compose up -d

# Push schema to database
npm run db:push
```

#### Option 2: MongoDB Atlas (Cloud)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `DATABASE_URL` in `.env.local`

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Run development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma client

### Database Management

- **Prisma Studio**: `npm run db:studio` - Visual database browser
- **Schema Changes**: Edit `prisma/schema.prisma` then run `npm run db:push`
- **Reset Database**: Delete collections in MongoDB and run `npm run db:push`

## Features

- 🔐 Google OAuth authentication
- 🏠 Create and manage coding rooms
- 🎥 Video calls with Stream.io
- 💬 Real-time chat
- 🏷️ Room tagging and search
- 📱 Responsive design
- 🌙 Dark/light mode

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── browse/         # Room browsing
│   ├── create-room/    # Room creation
│   ├── edit-room/      # Room editing
│   ├── rooms/          # Individual room pages
│   └── your-rooms/     # User's rooms
├── components/         # Reusable components
├── data-access/        # Database operations
├── db/                 # Database configuration
└── lib/                # Utility functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
