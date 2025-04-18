# Supabase Integration Guide

This guide provides step-by-step instructions for integrating Supabase with your Next.js project.

## Prerequisites

1. A Supabase account (create one at [supabase.com](https://supabase.com))
2. A Next.js project (this guide assumes you're using Next.js 13+ with App Router)

## Step 1: Create a Supabase Project

1. Log in to the [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Enter your project details:
   - Name: "WG" (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose the region closest to your users
4. Click "Create new project"

## Step 2: Set Up Environment Variables

1. In your Supabase project dashboard, go to "Settings" > "API"
2. Copy the "Project URL" and "anon/public" key
3. Update your `.env.local` file with these values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 3: Initialize Your Database

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase CLI:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your_project_ref
   ```
   (Find your project ref in the Supabase dashboard URL)

4. Push the migration:
   ```bash
   supabase db push
   ```

Alternatively, you can run the SQL script manually:
1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/migrations/00000000000000_init.sql`
3. Paste into the SQL Editor and run

## Step 4: Set Up Authentication

1. In your Supabase dashboard, go to "Authentication" > "Settings"
2. Configure your authentication providers:
   - Email: Enable/disable email confirmations as needed
   - Add additional providers if needed (Google, GitHub, etc.)

3. Set up redirect URLs:
   - Add your site URLs to the "Redirect URLs" section:
     - `http://localhost:3000/auth/callback`
     - `https://yourdomain.com/auth/callback` (for production)

## Step 5: Implement Authentication in Your App

1. Wrap your application with the `AuthProvider` in your layout:

```tsx
// app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

2. Create authentication pages:
   - Sign Up: `/app/auth/signup/page.tsx`
   - Sign In: `/app/auth/login/page.tsx`
   - Reset Password: `/app/auth/reset-password/page.tsx`

3. Use the `useAuth` hook in your components:

```tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  
  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  )
}
```

## Step 6: Implement Database Operations

Use the API utilities in `src/lib/api.ts` to interact with your database:

```tsx
'use client'

import { getUserItems } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function MyItemsPage() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadItems() {
      if (user) {
        const userItems = await getUserItems(user.id)
        setItems(userItems)
      }
      setLoading(false)
    }
    
    loadItems()
  }, [user])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>My Items</h1>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

## Step 7: Set Up Storage

1. In your Supabase dashboard, go to "Storage"
2. Create buckets for your application:
   - `avatars`: For user profile pictures
   - `items`: For item images
   - `documents`: For any document uploads

3. Set up storage permissions:
   - Go to "Storage" > "Policies"
   - Create appropriate policies for each bucket

## Step 8: Implement File Uploads

Create utility functions for file uploads:

```tsx
// src/lib/storage.ts
import { supabase } from './supabase'

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) {
    console.error('Error uploading file:', error)
    return { error }
  }
  
  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return { data: publicUrl.publicUrl }
}

export async function deleteFile(
  bucket: string,
  path: string
) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  if (error) {
    console.error('Error deleting file:', error)
    return { error }
  }
  
  return { success: true }
}
```

## Step 9: Set Up Realtime

Enable realtime for specific tables:

1. In your Supabase dashboard, go to "Database" > "Replication"
2. Enable realtime for tables that need it (e.g., messages, notifications)

Implement realtime subscriptions in your components:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
    if (!user) return
    
    // Fetch initial notifications
    async function fetchNotifications() {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      setNotifications(data || [])
    }
    
    fetchNotifications()
    
    // Subscribe to new notifications
    const subscription = supabase
      .channel('public:notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        setNotifications(prev => [payload.new, ...prev])
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [user])
  
  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id}>
          <p>{notification.content.message}</p>
        </div>
      ))}
    </div>
  )
}
```

## Step 10: Testing Your Integration

1. Create test users:
   - Sign up through your application
   - Or create users through the Supabase dashboard

2. Insert test data:
   - Use the SQL Editor in Supabase to insert test data
   - Or create data through your application

3. Test all CRUD operations:
   - Create, read, update, and delete operations for each entity
   - Test authentication flows
   - Test file uploads and downloads

## Troubleshooting

### Common Issues

1. **Authentication Issues**:
   - Check that your redirect URLs are correctly configured
   - Ensure you're using the correct Supabase URL and anon key

2. **Database Permissions**:
   - Review your RLS policies
   - Check that users have the appropriate permissions

3. **API Errors**:
   - Check the browser console for error messages
   - Verify that your API calls include the necessary parameters

### Debugging Tools

1. **Supabase Dashboard**:
   - SQL Editor: Run queries directly against your database
   - Auth: View and manage users
   - Logs: Check for API and database errors

2. **Browser DevTools**:
   - Network tab: Monitor API requests and responses
   - Console: Check for JavaScript errors

## Next Steps

1. **Implement Edge Functions**:
   - For server-side operations that need to be secure
   - For integrating with third-party services

2. **Set Up Webhooks**:
   - For reacting to database changes
   - For integrating with external systems

3. **Implement Caching**:
   - Use SWR or React Query for client-side caching
   - Implement server-side caching for frequently accessed data
