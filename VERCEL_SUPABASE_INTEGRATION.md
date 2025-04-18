# Setting Up Supabase Integration in Vercel Dashboard

Vercel offers a native integration with Supabase that simplifies the connection between your Vercel project and Supabase. This guide walks you through setting up this integration.

## Step 1: Access Vercel Integrations

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on the "Integrations" tab in the top navigation

## Step 2: Add Supabase Integration

1. In the Integrations marketplace, search for "Supabase"
2. Click on the Supabase integration card
3. Click "Add Integration"

## Step 3: Configure the Integration

1. Select the Vercel project you want to connect (your current project)
2. Select the Vercel team (if applicable)
3. Click "Continue"
4. You'll be redirected to Supabase to authorize the connection
5. Select your Supabase project from the dropdown
6. Click "Install"

## Step 4: Verify Environment Variables

After the integration is set up, Vercel will automatically:

1. Add the necessary environment variables to your project:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. You can verify these by going to "Settings" > "Environment Variables" in your Vercel project

## Step 5: Redeploy Your Project

1. Go to the "Deployments" tab
2. Click on the "..." menu for your latest deployment
3. Select "Redeploy" to apply the new environment variables
4. Wait for the deployment to complete

## Step 6: Test the Integration

1. Visit your Vercel deployment URL
2. Navigate to the Supabase test page: `/supabase-test`
3. Verify that the connection tests pass

## Benefits of Using the Vercel Integration

1. **Automatic Environment Variable Sync**: Changes to your Supabase project are automatically reflected in your Vercel environment variables
2. **Simplified Management**: Manage your Supabase connection directly from the Vercel dashboard
3. **Preview Environments**: Automatically creates isolated Supabase environments for preview deployments (on paid plans)
4. **Deployment Protection**: Ensures your application always has the correct Supabase credentials

## Removing the Integration

If you need to remove the integration:

1. Go to your Vercel project
2. Click on "Integrations" tab
3. Find the Supabase integration
4. Click "Remove Integration"

## Troubleshooting

If you encounter issues with the integration:

1. **Check Permissions**: Ensure you have admin access to both Vercel and Supabase projects
2. **Verify Account Linking**: Make sure your Vercel and Supabase accounts are properly linked
3. **Check Environment Variables**: Confirm that the environment variables were properly added
4. **Manual Setup**: If the integration doesn't work, you can always set up the connection manually as described in the SUPABASE_VERCEL_INTEGRATION.md file

## Resources

- [Official Vercel-Supabase Integration Documentation](https://vercel.com/integrations/supabase)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
