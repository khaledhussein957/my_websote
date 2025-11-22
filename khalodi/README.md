# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring dynamic data fetching from an Express API, beautiful animations with Framer Motion, and a professional UI using ShadCN UI components.

## Features

- 🎨 **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- 🌙 **Dark/Light Mode**: Theme switching with persistence
- 📱 **Responsive Design**: Mobile-first approach with smooth animations
- 🔄 **Dynamic Data**: Fetches data from Express API endpoints
- ⚡ **Performance**: Optimized with Next.js 15 and React 19
- 🎭 **Animations**: Smooth transitions and interactions with Framer Motion
- 📊 **State Management**: Redux Toolkit for global state, Zustand for local state
- 🎯 **TypeScript**: Full type safety throughout the application

## Sections

- **Hero Section**: Welcome message with profile image and social links
- **About**: Personal information and core technologies
- **Skills**: Technology stack with skill levels and categories
- **Experience**: Work experience timeline
- **Education**: Academic background and achievements
- **Projects**: Featured and other projects with live demos
- **Testimonials**: Client feedback and reviews
- **Contact**: Contact form and social media links

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit, Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Handling**: Date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Express API backend running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Update the API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

The application expects the following API endpoints:

- `GET /api/users` - User information
- `GET /api/projects` - Project data
- `GET /api/educations` - Education history
- `GET /api/experiences` - Work experience
- `GET /api/testimonials` - Client testimonials
- `GET /api/techstacks` - Technology skills
- `GET /api/categories` - Project categories
- `GET /api/news` - News/blog posts

## Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # Reusable components
│   ├── ui/                # ShadCN UI components
│   ├── sections/          # Page sections
│   ├── navigation/        # Navigation components
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and API client
└── store/                 # State management
    ├── portfolioSlice.ts  # Redux slice
    ├── themeStore.ts      # Zustand theme store
    └── uiStore.ts         # Zustand UI store
```

## Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add the section to the main page in `src/app/page.tsx`
3. Update the navigation in `src/components/navigation/navbar.tsx`

### Modifying API Calls

Update the API client in `src/lib/api.ts` and add corresponding Redux actions in `src/store/portfolioSlice.ts`.

### Styling

The application uses Tailwind CSS with ShadCN UI components. Customize the theme in `tailwind.config.js` and `src/app/globals.css`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub or contact me directly.