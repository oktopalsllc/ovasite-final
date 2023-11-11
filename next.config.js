/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
    env:{
        API_URL: process.env.API_URL,
        // POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        VERCEL_URL: process.env.VERCEL_URL,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
        // POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        // CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        // WEBHOOK_SECRET: process.env.WEBHOOK_SECRET
    }
}

module.exports = nextConfig
