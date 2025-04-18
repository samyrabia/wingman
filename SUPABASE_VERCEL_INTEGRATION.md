# Connecting Supabase to Vercel

This guide walks you through the process of connecting your Supabase project to your existing Vercel deployment.

## Step 1: Add Supabase Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" in the left sidebar
5. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL (from `.env.local`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (from `.env.local`)
6. Click "Save" to store these variables

## Step 2: Configure Supabase Authentication Settings

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to "Authentication" → "URL Configuration"
4. Set the Site URL to your Vercel deployment URL:
   - Example: `https://your-project.vercel.app`
5. Add the following Redirect URLs:
   - `https://your-project.vercel.app/auth/callback`
   - `https://your-project.vercel.app`
6. Click "Save" to apply these settings

## Step 3: Configure CORS Settings in Supabase

1. In your Supabase Dashboard, go to "API" → "Settings"
2. Under "API Settings", find the "CORS (Cross-Origin Resource Sharing)" section
3. Add your Vercel deployment URL to the "Additional allowed hosts" field:
   - Example: `https://your-project.vercel.app`
4. Ensure "All subdomains" is checked if you want to allow subdomains
5. Click "Save" to apply these settings

## Step 4: Redeploy Your Vercel Project

1. Go back to your Vercel Dashboard
2. Select your project
3. Go to the "Deployments" tab
4. Click on the "..." menu for your latest deployment
5. Select "Redeploy" to apply the new environment variables
6. Wait for the deployment to complete

## Step 5: Test the Integration

1. Visit your Vercel deployment URL
2. Navigate to the Supabase test page: `/supabase-test`
3. Verify that the connection tests pass
4. Test authentication functionality if implemented

## Troubleshooting

### Authentication Issues

If you encounter authentication issues:

1. **Check Site URL**: Ensure the Site URL in Supabase exactly matches your Vercel deployment URL
2. **Verify Redirect URLs**: Make sure all necessary redirect URLs are added
3. **Check Environment Variables**: Confirm that environment variables are correctly set in Vercel
4. **Clear Browser Cookies**: Try clearing cookies and cache for your site

### CORS Issues

If you encounter CORS errors:

1. **Check Network Tab**: Look at the browser's network tab to identify the specific CORS error
2. **Verify CORS Settings**: Ensure your Vercel URL is added to the allowed hosts in Supabase
3. **Check Protocol**: Make sure you're using `https://` consistently

### Database Connection Issues

If database queries fail:

1. **Check RLS Policies**: Verify Row Level Security policies in Supabase
2. **Test API Keys**: Confirm your API keys are valid and have the necessary permissions
3. **Check Query Syntax**: Ensure your database queries are correctly formatted

## Using Supabase Integration Features in Vercel

Vercel offers native integration with Supabase that can simplify management:

1. Go to your Vercel project
2. Click on "Integrations" tab
3. Search for "Supabase"
4. Click "Add Integration"
5. Follow the prompts to connect your Supabase project
6. This will automatically sync environment variables and simplify deployments

## Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase & Next.js Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
