# Supabase Integration for WG Project

This document provides an overview of the Supabase integration for the WG project.

## Overview

The WG project uses Supabase as its backend database and authentication provider. Supabase is an open-source Firebase alternative that provides a PostgreSQL database, authentication, storage, and more.

## Setup

1. **Environment Variables**

   The project uses the following environment variables for Supabase:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   These are stored in the `.env.local` file at the root of the project.

2. **Database Schema**

   The database schema is defined in `supabase/migrations/00000000000000_init.sql`. This file contains the SQL commands to create all the necessary tables, indexes, and functions for the application.

3. **TypeScript Types**

   TypeScript types for the database schema are defined in `src/types/supabase.ts`. These types are used to provide type safety when interacting with the database.

## Components

1. **Supabase Client**

   The Supabase client is initialized in `src/lib/supabase.ts`. This client is used throughout the application to interact with the Supabase API.

2. **Authentication Context**

   The authentication context is defined in `src/app/context/auth-context.tsx`. This context provides authentication-related functionality to the entire application.

3. **API Utilities**

   API utilities for interacting with the database are defined in `src/lib/api.ts`. These utilities provide a clean interface for performing common database operations.

## Testing the Integration

You can test the Supabase integration by visiting the `/admin/supabase-test` page. This page provides a simple interface for testing the connection to the Supabase database and authentication service.

## Database Tables

The application uses the following database tables:

- **users**: Stores user information
- **profiles**: Stores user profile information
- **items**: Stores item information
- **orders**: Stores order information
- **flights**: Stores flight information
- **reviews**: Stores review information
- **conversations**: Stores conversation information
- **conversation_participants**: Stores conversation participant information
- **messages**: Stores message information
- **notifications**: Stores notification information

## Row Level Security (RLS)

Supabase uses Row Level Security (RLS) to secure data at the database level. The RLS policies are defined in the migration file and ensure that users can only access data they are authorized to access.

## Next Steps

1. **Data Migration**

   If you have existing data, you'll need to migrate it to the Supabase database. You can use the Supabase CLI or the SQL Editor in the Supabase dashboard to import your data.

2. **Testing**

   Test all aspects of the integration, including authentication, database operations, and storage.

3. **Deployment**

   Ensure that your Supabase project is properly configured for production use. This includes setting up proper authentication settings, enabling RLS, and configuring storage buckets.

## Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Next.js with Supabase](https://supabase.io/docs/guides/with-nextjs)
- [TypeScript with Supabase](https://supabase.io/docs/guides/with-typescript)
