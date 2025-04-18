# Wingman Global Database Schema

## Tables

### users
- `id` (uuid, primary key): User's unique identifier
- `email` (text, unique): User's email address
- `created_at` (timestamp with time zone): When the user was created
- `updated_at` (timestamp with time zone): When the user was last updated
- `full_name` (text): User's full name
- `avatar_url` (text): URL to user's avatar image
- `phone` (text): User's phone number
- `role` (text): User's role (user, admin, wingman)
- `status` (text): User's status (active, inactive, pending)
- `stripe_customer_id` (text): Stripe customer ID for payments

### profiles
- `id` (uuid, primary key, references users.id): User's ID
- `username` (text, unique): User's username
- `bio` (text): User's biography
- `location` (text): User's location
- `website` (text): User's website
- `birth_date` (date): User's birth date
- `gender` (text): User's gender
- `preferences` (jsonb): User's preferences
- `created_at` (timestamp with time zone): When the profile was created
- `updated_at` (timestamp with time zone): When the profile was last updated

### items
- `id` (uuid, primary key): Item's unique identifier
- `user_id` (uuid, references users.id): Owner of the item
- `title` (text): Item title
- `description` (text): Item description
- `weight` (numeric): Item weight in kg
- `dimensions` (jsonb): Item dimensions (length, width, height)
- `category` (text): Item category
- `value` (numeric): Item declared value
- `status` (text): Item status (registered, assigned, ordered, travelling, delivered, canceled, archived)
- `created_at` (timestamp with time zone): When the item was created
- `updated_at` (timestamp with time zone): When the item was last updated
- `pickup` (jsonb): Pickup details (address, date, time, instructions)
- `delivery` (jsonb): Delivery details (address, date, time, instructions)
- `tags` (text[]): Array of tags for the item
- `images` (text[]): Array of image URLs

### orders
- `id` (uuid, primary key): Order's unique identifier
- `item_id` (uuid, references items.id): Item being ordered
- `sender_id` (uuid, references users.id): Sender of the item
- `wingman_id` (uuid, references users.id): Wingman delivering the item
- `status` (text): Order status (pending, confirmed, in_transit, delivered, canceled)
- `created_at` (timestamp with time zone): When the order was created
- `updated_at` (timestamp with time zone): When the order was last updated
- `price` (numeric): Price of the order
- `payment_status` (text): Payment status (pending, paid, refunded)
- `payment_intent_id` (text): Stripe payment intent ID
- `tracking_number` (text): Tracking number for the order
- `notes` (text): Additional notes for the order
- `estimated_delivery` (date): Estimated delivery date

### flights
- `id` (uuid, primary key): Flight's unique identifier
- `wingman_id` (uuid, references users.id): Wingman offering the flight
- `departure_airport` (text): Departure airport code
- `arrival_airport` (text): Arrival airport code
- `departure_city` (text): Departure city
- `arrival_city` (text): Arrival city
- `departure_date` (date): Departure date
- `arrival_date` (date): Arrival date
- `departure_time` (time): Departure time
- `arrival_time` (time): Arrival time
- `airline` (text): Airline code
- `flight_number` (text): Flight number
- `capacity` (numeric): Available capacity in kg
- `price_per_kg` (numeric): Price per kg
- `status` (text): Flight status (scheduled, in_progress, completed, canceled)
- `created_at` (timestamp with time zone): When the flight was created
- `updated_at` (timestamp with time zone): When the flight was last updated

### reviews
- `id` (uuid, primary key): Review's unique identifier
- `order_id` (uuid, references orders.id): Order being reviewed
- `reviewer_id` (uuid, references users.id): User writing the review
- `reviewee_id` (uuid, references users.id): User being reviewed
- `rating` (integer): Rating from 1-5
- `comment` (text): Review comment
- `created_at` (timestamp with time zone): When the review was created
- `updated_at` (timestamp with time zone): When the review was last updated

### messages
- `id` (uuid, primary key): Message's unique identifier
- `conversation_id` (uuid, references conversations.id): Conversation the message belongs to
- `sender_id` (uuid, references users.id): User sending the message
- `content` (text): Message content
- `created_at` (timestamp with time zone): When the message was created
- `read` (boolean): Whether the message has been read

### conversations
- `id` (uuid, primary key): Conversation's unique identifier
- `order_id` (uuid, references orders.id): Related order (optional)
- `created_at` (timestamp with time zone): When the conversation was created
- `updated_at` (timestamp with time zone): When the conversation was last updated

### conversation_participants
- `conversation_id` (uuid, references conversations.id): Conversation ID
- `user_id` (uuid, references users.id): User ID
- `created_at` (timestamp with time zone): When the participant was added

### notifications
- `id` (uuid, primary key): Notification's unique identifier
- `user_id` (uuid, references users.id): User receiving the notification
- `type` (text): Notification type
- `content` (jsonb): Notification content
- `created_at` (timestamp with time zone): When the notification was created
- `read` (boolean): Whether the notification has been read

## Row Level Security (RLS) Policies

We'll implement the following RLS policies to secure our data:

1. Users can only read and update their own profiles
2. Users can only create, read, update, and delete their own items
3. Users can read orders where they are either the sender or wingman
4. Wingmen can create and update flights they own
5. Users can create reviews for orders they participated in
6. Users can read and write messages in conversations they are part of
7. Users can only read and update their own notifications

## Functions and Triggers

1. Create trigger to update `updated_at` columns automatically
2. Create function to handle user registration and profile creation
3. Create function to handle order creation and notification
4. Create function to handle review submission and rating calculation
