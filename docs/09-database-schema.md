# 09 — Database Schema

## Table Specifications & Indexing Strategy

### `users` Table
- `id` (STRING/UUID, Primary Key)
- `email` (STRING, Unique, Indexed)
- `password_hash` (STRING)
- `name` (STRING)
- `role` (ENUM: `GUEST`, `CUSTOMER`, `SELLER`, `ADMIN`, `SUPER_ADMIN`, Indexed)
- `created_at` (TIMESTAMP)

### `products` Table
- `id` (STRING/UUID, Primary Key)
- `title` (STRING, Fulltext Search Indexed)
- `slug` (STRING, Unique, Indexed)
- `description` (TEXT)
- `price` (DECIMAL/FLOAT, Indexed)
- `stock` (INTEGER)
- `category` (STRING, Indexed)
- `brand` (STRING, Indexed)
- `image_url` (STRING)
- `rating` (FLOAT)
- `review_count` (INTEGER)
- `is_featured` (BOOLEAN, Default: false)

### `orders` Table
- `id` (STRING/UUID, Primary Key)
- `user_id` (STRING, Foreign Key -> users.id, Indexed)
- `total_amount` (DECIMAL/FLOAT)
- `discount_amount` (DECIMAL/FLOAT, Default: 0)
- `status` (ENUM: `PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`, Indexed)
- `shipping_address` (TEXT/JSON)
- `created_at` (TIMESTAMP, Indexed)

### `audit_logs` Table
- `id` (STRING/UUID, Primary Key)
- `user_id` (STRING, Nullable)
- `action` (STRING, Indexed)
- `details` (TEXT/JSON)
- `ip_address` (STRING)
- `timestamp` (TIMESTAMP, Default: NOW(), Indexed)
