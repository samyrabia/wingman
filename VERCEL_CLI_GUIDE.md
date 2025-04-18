# Deploying to Vercel using the CLI

This guide provides step-by-step instructions for deploying your Next.js application to Vercel using the Vercel CLI.

## Prerequisites

1. Node.js installed on your machine
2. A Vercel account
3. Your project code ready for deployment

## Step 1: Install the Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to complete the login process. This will open a browser window where you can authorize the CLI.

## Step 3: Prepare Your Project

Make sure your project has the following:

1. A proper `package.json` file with build scripts
2. A `vercel.json` file (already created in your project)
3. Environment variables set up in `.env.local`

## Step 4: Deploy Your Project

Navigate to your project directory and run:

```bash
vercel
```

The CLI will guide you through the deployment process:

1. Set up and deploy: `Y`
2. Link to existing project: Choose based on your situation
3. Select scope: Choose your account or team
4. Project name: Accept default or provide a custom name
5. Directory: Usually `.` (current directory)
6. Override settings: Usually `N` unless you need to change something

## Step 5: Set Environment Variables

After initial deployment, you need to set your environment variables:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

Enter your Supabase URL when prompted.

```bash
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Enter your Supabase anon key when prompted.

## Step 6: Redeploy with Environment Variables

```bash
vercel --prod
```

This will create a production deployment with your environment variables.

## Step 7: Configure Supabase for Your Vercel Deployment

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Add your Vercel deployment URL to the Site URL field:
   - Example: `https://your-project.vercel.app`
4. Add the following redirect URLs:
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app`

## Step 8: Verify Your Deployment

1. Visit your deployed application at the Vercel URL
2. Test Supabase functionality (authentication, database queries, etc.)
3. Check for any errors in the Vercel deployment logs

## Common Commands

- `vercel`: Deploy to development
- `vercel --prod`: Deploy to production
- `vercel env ls`: List environment variables
- `vercel logs`: View deployment logs
- `vercel domains`: Manage custom domains

## Troubleshooting

### Deployment Fails

If your deployment fails, check:

1. Vercel logs: `vercel logs`
2. Build output for errors
3. Environment variables are correctly set

### Environment Variables Not Working

If your environment variables aren't working:

1. Check they're correctly set: `vercel env ls`
2. Ensure you've redeployed after setting them: `vercel --prod`
3. Verify they're being accessed correctly in your code

### Authentication Issues

If authentication isn't working:

1. Verify your Supabase URL configuration includes your Vercel URL
2. Check redirect URLs are correctly set
3. Ensure cookies are working properly in production

## Resources

- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
