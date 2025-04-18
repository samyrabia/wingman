# Supabase Setup Instructions

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can get these values from your Supabase project dashboard.

## Authentication Setup

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Settings
3. Configure your site URL and redirect URLs:
   - Site URL: `http://localhost:3000` (for development)
   - Redirect URLs: 
     - `http://localhost:3000/auth/callback`
     - Your production URL (when deployed)

## Database Setup

1. Create the necessary tables in your Supabase database
2. Set up Row Level Security (RLS) policies to secure your data
3. Configure storage buckets if needed for file uploads

## Usage

The Supabase client is available in:
- `src/lib/supabase.ts` - Client-side usage
- `src/lib/supabase-server.ts` - Server-side usage

Example usage in a component:

```tsx
import { supabase } from '@/lib/supabase'

// Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*')
```

For server components, use:

```tsx
import { createClient } from '@/lib/supabase-server'

export default async function ServerComponent() {
  const supabase = createClient()
  const { data } = await supabase.from('your_table').select()
  
  return <div>{/* Your component */}</div>
}
```
