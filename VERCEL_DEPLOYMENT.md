# Deploying to Vercel with Supabase

This guide walks you through the process of deploying your Next.js application with Supabase to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/signup) (or GitLab/BitBucket)
3. Your project pushed to a Git repository
4. A [Supabase project](https://supabase.com)

## Step 1: Prepare Your Project for Deployment

Your project is already configured with `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Step 2: Set Up Git Repository (if not already done)

1. Initialize a Git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. Follow the prompts and configure your project settings
5. Set environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

## Step 4: Configure Supabase for Production

1. Go to your Supabase project dashboard
2. Navigate to Authentication > URL Configuration
3. Add your Vercel deployment URL to the Site URL field:
   - Example: `https://your-project.vercel.app`
4. Add the following redirect URLs:
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app`

## Step 5: Verify Deployment

1. Visit your deployed application at the Vercel URL
2. Test Supabase functionality (authentication, database queries, etc.)
3. Check for any errors in the Vercel deployment logs

## Continuous Deployment

Vercel automatically sets up continuous deployment from your Git repository. Any new commits pushed to your main branch will trigger a new deployment.

## Troubleshooting

### Environment Variables

If Supabase isn't working in production, check that your environment variables are correctly set in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" > "Environment Variables"
3. Verify that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set

### CORS Issues

If you're experiencing CORS issues:

1. Go to your Supabase project dashboard
2. Navigate to API > Settings
3. Add your Vercel URL to the "Additional allowed hosts" field

### Authentication Redirect Issues

If authentication redirects aren't working:

1. Verify that your Site URL and redirect URLs are correctly set in Supabase
2. Check that your application is using the correct redirect URLs

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
