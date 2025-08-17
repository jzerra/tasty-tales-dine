import { supabase as baseSupabase } from '@/integrations/supabase/client'

// Use the configured client but relax types to avoid schema mismatches
export const supabase = baseSupabase as any

// Database types
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  popular: boolean
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
}

export interface Order {
  id: string
  customer_id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  delivery_address?: string
  order_type: 'delivery' | 'pickup'
  payment_method: 'card' | 'bank' | 'cash'
  payment_status: 'pending' | 'paid' | 'failed'
  order_status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  subtotal: number
  delivery_fee: number
  tax: number
  total: number
  delivery_instructions?: string
  paystack_reference?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: number
  product_name: string
  product_price: number
  product_image: string
  quantity: number
  subtotal: number
}

export interface Reservation {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  reservation_date: string
  reservation_time: string
  guests: number
  occasion: string
  special_requests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  updated_at: string
}