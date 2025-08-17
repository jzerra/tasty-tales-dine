-- Create tables for the restaurant system
-- Run this SQL in your Supabase dashboard > SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(500),
  rating DECIMAL(2,1) DEFAULT 0,
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  delivery_address TEXT,
  order_type VARCHAR(20) NOT NULL CHECK (order_type IN ('delivery', 'pickup')),
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('card', 'bank', 'cash')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  order_status VARCHAR(20) DEFAULT 'pending' CHECK (order_status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  delivery_instructions TEXT,
  paystack_reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  product_image VARCHAR(500),
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INTEGER NOT NULL,
  occasion VARCHAR(255),
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(reservation_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- Insert sample products from your menu
INSERT INTO products (name, description, price, category, image, rating, popular) VALUES
-- Dishes
('Afang Soup', 'Traditional Nigerian soup with vegetables and assorted meat', 8500, 'Dishes', '/src/assets/afang-soup.jpg', 4.8, true),
('Egusi Soup', 'Rich melon seed soup with spinach and meat', 7500, 'Dishes', '/src/assets/egusi-soup.jpg', 4.6, true),
('Pepper Soup (Goat Meat)', 'Spicy goat meat soup with traditional spices', 9000, 'Dishes', '/lovable-uploads/21fcaa50-02ab-4f53-b217-ea65c4003480.png', 4.7, false),
('Pepper Soup (Catfish)', 'Fresh catfish in spicy pepper soup', 8000, 'Dishes', '/lovable-uploads/c5e8accb-8cb7-43d3-b277-c0a79df2e022.png', 4.5, false),
('Fried Rice', 'Nigerian-style fried rice with vegetables and protein', 6500, 'Dishes', '/lovable-uploads/221f8004-06fe-4670-b3a9-673828a58c32.png', 4.4, true),
('Jollof Rice', 'Classic Nigerian jollof rice with chicken', 7000, 'Dishes', '/lovable-uploads/24c6c594-9522-46e2-90a9-30c222daeee2.png', 4.9, true),

-- Chewables
('Peppered Kpomo', 'Spicy cow skin delicacy', 3500, 'Chewables', '/lovable-uploads/4719cca8-5c59-4905-bbe8-ba773a95f392.png', 4.3, false),
('Sauced Snail', 'Garden snails in rich pepper sauce', 4500, 'Chewables', '/lovable-uploads/b92e17e5-f7ad-4938-8d85-2c06796e8ba8.png', 4.2, false),
('Isie Ewu', 'Traditional goat head delicacy', 5500, 'Chewables', '/lovable-uploads/6828ad80-c96f-4aaa-bbbf-b1c0401c30f9.png', 4.4, false),
('Nkwobi', 'Spicy cow foot delicacy', 5000, 'Chewables', '/lovable-uploads/d4a3bef3-1c81-4758-887f-c7445fc38ead.png', 4.6, true),
('Grilled Chicken', 'Perfectly grilled chicken with spices', 6000, 'Chewables', '/lovable-uploads/f241924b-781c-4942-bdf5-9cbeaca2fc62.png', 4.5, true),
('Grilled Fish', 'Fresh fish grilled to perfection', 7500, 'Chewables', '/lovable-uploads/e044f780-835a-4f10-8fd3-a882395e3ffa.png', 4.7, true),
('Bole', 'Grilled plantain with fish sauce', 3000, 'Chewables', '/lovable-uploads/05d2f13b-3172-42c0-b663-72ed88e37292.png', 4.1, false),

-- Pastries
('Meat Pie', 'Flaky pastry filled with seasoned meat', 1500, 'Pastries', '/src/assets/meat-pie.jpg', 4.3, true),
('Chin Chin', 'Crunchy sweet pastry snack', 2000, 'Pastries', '/lovable-uploads/24c6c594-9522-46e2-90a9-30c222daeee2.png', 4.2, false),

-- Wines & Spirits
('Red Wine', 'Premium red wine selection', 15000, 'Wines & Spirits', '/src/assets/wine-placeholder.jpg', 4.5, false),
('White Wine', 'Crisp white wine selection', 14000, 'Wines & Spirits', '/src/assets/wine-placeholder.jpg', 4.4, false),
('Whiskey', 'Premium whiskey selection', 25000, 'Wines & Spirits', '/src/assets/whiskey-placeholder.jpg', 4.6, false),
('Cognac', 'Premium cognac selection', 35000, 'Wines & Spirits', '/src/assets/cognac-placeholder.jpg', 4.8, true);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to products
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Create policies for customers (they can only see their own data)
CREATE POLICY "Customers can view own data" ON customers FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Customers can insert own data" ON customers FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Create policies for orders
CREATE POLICY "Users can view all orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Users can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update orders" ON orders FOR UPDATE USING (true);

-- Create policies for order items
CREATE POLICY "Users can view order items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Users can insert order items" ON order_items FOR INSERT WITH CHECK (true);

-- Create policies for reservations
CREATE POLICY "Users can view reservations" ON reservations FOR SELECT USING (true);
CREATE POLICY "Users can insert reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update reservations" ON reservations FOR UPDATE USING (true);