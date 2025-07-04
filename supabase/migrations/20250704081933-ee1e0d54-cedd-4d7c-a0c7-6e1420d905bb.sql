-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('homeowner', 'service_provider', 'admin');

-- Create enum for service request status
CREATE TYPE public.request_status AS ENUM ('pending', 'quoted', 'accepted', 'completed', 'cancelled');

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'homeowner',
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service categories table
CREATE TABLE public.service_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert profiles table
CREATE TABLE public.expert_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT,
  bio TEXT,
  experience_years INTEGER,
  hourly_rate DECIMAL(10,2),
  service_areas TEXT[],
  certifications TEXT[],
  portfolio_images TEXT[],
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert services junction table
CREATE TABLE public.expert_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  expert_id UUID NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(expert_id, category_id)
);

-- Create service requests table
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  homeowner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES service_categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  preferred_date DATE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  status request_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quotes table
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES service_requests(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  estimated_duration TEXT,
  description TEXT,
  materials_included BOOLEAN DEFAULT false,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(request_id, expert_id)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID NOT NULL REFERENCES service_requests(id),
  quote_id UUID NOT NULL REFERENCES quotes(id),
  homeowner_id UUID NOT NULL REFERENCES auth.users(id),
  expert_id UUID NOT NULL REFERENCES expert_profiles(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status booking_status DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  homeowner_id UUID NOT NULL REFERENCES auth.users(id),
  expert_id UUID NOT NULL REFERENCES expert_profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(booking_id)
);

-- Insert default service categories
INSERT INTO public.service_categories (name, description, icon_name) VALUES
('Plumbing', 'Installation, repair, and maintenance of water systems', 'wrench'),
('Electrical', 'Electrical installations, repairs, and safety inspections', 'zap'),
('Carpentry', 'Custom woodwork, furniture, and structural repairs', 'hammer'),
('Painting', 'Interior and exterior painting services', 'brush'),
('HVAC', 'Heating, ventilation, and air conditioning services', 'wind'),
('Landscaping', 'Garden design, lawn care, and outdoor maintenance', 'trees'),
('Cleaning', 'Professional cleaning services for homes and offices', 'spray-can'),
('Roofing', 'Roof installation, repair, and maintenance', 'home');

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Expert profiles policies
CREATE POLICY "Anyone can view expert profiles" ON public.expert_profiles
  FOR SELECT USING (true);

CREATE POLICY "Experts can update their own profile" ON public.expert_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service providers can create expert profile" ON public.expert_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'service_provider')
  );

-- Expert services policies
CREATE POLICY "Anyone can view expert services" ON public.expert_services
  FOR SELECT USING (true);

CREATE POLICY "Experts can manage their services" ON public.expert_services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

-- Service requests policies
CREATE POLICY "Users can view their own requests" ON public.service_requests
  FOR SELECT USING (auth.uid() = homeowner_id);

CREATE POLICY "Experts can view all requests" ON public.service_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'service_provider')
  );

CREATE POLICY "Homeowners can create requests" ON public.service_requests
  FOR INSERT WITH CHECK (
    auth.uid() = homeowner_id AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'homeowner')
  );

CREATE POLICY "Homeowners can update their requests" ON public.service_requests
  FOR UPDATE USING (auth.uid() = homeowner_id);

-- Quotes policies
CREATE POLICY "Homeowners can view quotes for their requests" ON public.quotes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.service_requests WHERE id = request_id AND homeowner_id = auth.uid())
  );

CREATE POLICY "Experts can view their own quotes" ON public.quotes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

CREATE POLICY "Experts can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

CREATE POLICY "Experts can update their quotes" ON public.quotes
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

-- Bookings policies
CREATE POLICY "Users can view their bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = homeowner_id OR 
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

CREATE POLICY "Homeowners can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = homeowner_id);

CREATE POLICY "Participants can update bookings" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = homeowner_id OR 
    EXISTS (SELECT 1 FROM public.expert_profiles WHERE id = expert_id AND user_id = auth.uid())
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Homeowners can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = homeowner_id);

CREATE POLICY "Homeowners can update their reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = homeowner_id);

-- Service categories are public
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view service categories" ON public.service_categories
  FOR SELECT USING (true);

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_profiles_updated_at
  BEFORE UPDATE ON public.expert_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'homeowner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();