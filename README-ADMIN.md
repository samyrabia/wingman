# Admin Portal Documentation

This document provides information about the Admin Portal implementation in the WG application.

## Overview

The Admin Portal is a restricted area of the application that provides administrative functionality for managing users, orders, items, and system settings. It is only accessible to users with the admin role.

## Access Control

The Admin Portal is protected by both server-side and client-side authentication checks:

1. **Server-side Protection**:
   - Middleware checks if the user is authenticated and has the admin role
   - Redirects to login page if not authenticated
   - Redirects to home page if authenticated but not an admin

2. **Client-side Protection**:
   - React components check admin status on mount
   - Redirects non-admin users away from protected pages
   - Shows loading state during authentication checks

## Admin Routes

The following routes are protected and only accessible to admin users:

- `/admin/dashboard` - Analytics dashboard
- `/admin/users` - User management
- `/admin/orders` - Order management
- `/admin/items` - Item management
- `/admin/flights` - Flight management
- `/admin/tickets` - Support ticket management
- `/admin/billings` - Billing management
- `/admin/settings` - System settings
- `/admin/supabase-test` - Supabase integration test page

## Admin Login

A dedicated admin login page is available at `/admin/login`. This page:

1. Authenticates the user using Supabase Auth
2. Checks if the authenticated user has the admin role
3. Redirects to the requested admin page or the admin dashboard

## Admin Portal Features

The admin portal includes the following features:

1. **Dashboard**:
   - Overview of key metrics (users, orders, items)
   - Recent activity feed
   - Quick action buttons

2. **User Management**:
   - View and search users
   - Update user roles and status
   - Promote users to admin or revoke admin privileges

3. **Order Management**:
   - View and filter orders
   - Update order status
   - View order details and history

4. **Item Management**:
   - View and filter items
   - Update item status
   - View item details

5. **Flight Management**:
   - View and filter flights
   - Update flight status
   - View flight details

6. **Support Tickets**:
   - View and respond to support tickets
   - Update ticket status
   - Assign tickets to staff

7. **Billing Management**:
   - View payment history
   - Process refunds
   - Update payment settings

8. **System Settings**:
   - Configure application settings
   - Manage email templates
   - Set system-wide parameters

## Implementation Details

The Admin Portal is implemented using the following components:

1. **Middleware** (`middleware.ts`):
   - Protects admin routes
   - Checks authentication and admin role
   - Handles redirects for unauthorized access

2. **Admin Layout** (`admin/layout.tsx`):
   - Provides consistent layout for all admin pages
   - Includes navigation sidebar and user dropdown
   - Performs client-side authentication checks

3. **Admin Dashboard** (`admin/dashboard/page.tsx`):
   - Main landing page for admin users
   - Displays key metrics and module access cards
   - Provides quick access to common admin tasks

4. **Admin Utilities**:
   - `admin.ts` - Functions for admin-specific database operations
   - `admin-auth.ts` - Functions for admin authentication and permissions

5. **Database Schema**:
   - User table includes `role` field to identify admin users
   - Row Level Security (RLS) policies restrict access to admin functions

## Creating Admin Users

To create the first admin user:

1. Register a normal user through the application
2. Access the Supabase dashboard
3. Update the user's `role` field to `admin` in the `users` table
4. The user will now have access to the Admin Portal

Additional admin users can be created through the Admin Portal's user management interface.

## Security Considerations

1. **Multiple Layers of Protection**:
   - Server-side middleware checks
   - Client-side authentication checks
   - Database Row Level Security (RLS)

2. **Least Privilege Principle**:
   - Admin users should only be created when necessary
   - Regular maintenance should include reviewing admin user list

3. **Audit Trail**:
   - All admin actions are logged
   - Logs include user ID, action, and timestamp

## Troubleshooting

If you're having issues with the Admin Portal:

1. **Cannot access admin pages**:
   - Verify the user has the `admin` role in the database
   - Check if the user is properly authenticated
   - Clear browser cookies and try logging in again

2. **Admin functions not working**:
   - Check browser console for errors
   - Verify database connections and permissions
   - Ensure Supabase service is running correctly

3. **Performance issues**:
   - Admin queries use pagination to limit data transfer
   - Consider implementing caching for frequently accessed data
   - Monitor database performance and optimize queries as needed
