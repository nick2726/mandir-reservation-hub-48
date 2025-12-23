-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  state TEXT,
  city TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create pass_types table
CREATE TABLE public.pass_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  max_visitors INTEGER NOT NULL DEFAULT 5,
  darshan_time TEXT,
  special_access TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on pass_types (public read)
ALTER TABLE public.pass_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pass types" 
ON public.pass_types FOR SELECT 
USING (is_active = true);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pass_type_id UUID REFERENCES public.pass_types(id),
  booking_number TEXT NOT NULL UNIQUE,
  pass_type_name TEXT NOT NULL,
  visit_date DATE NOT NULL,
  num_visitors INTEGER NOT NULL,
  price_per_person INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  visitor_name TEXT NOT NULL,
  visitor_email TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  visitor_state TEXT,
  visitor_city TEXT,
  id_proof_type TEXT,
  id_proof_number TEXT,
  priest_name TEXT,
  token_number TEXT,
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  booking_status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings" 
ON public.bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
ON public.bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings FOR UPDATE 
USING (auth.uid() = user_id);

-- Create additional_visitors table
CREATE TABLE public.additional_visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  sex TEXT,
  id_proof_type TEXT,
  id_proof_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on additional_visitors
ALTER TABLE public.additional_visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their booking visitors" 
ON public.additional_visitors FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = additional_visitors.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

CREATE POLICY "Users can add visitors to their bookings" 
ON public.additional_visitors FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.bookings 
    WHERE bookings.id = additional_visitors.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pass types
INSERT INTO public.pass_types (name, description, price, max_visitors, darshan_time, special_access) VALUES
('General Pass', 'Standard darshan entry with regular queue access', 100, 5, '6:00 AM - 8:00 PM', ARRAY['Regular Queue', 'Main Temple Access']),
('VIP Pass', 'Priority entry with shorter waiting time', 500, 4, '5:00 AM - 9:00 PM', ARRAY['Priority Queue', 'Main Temple Access', 'Prasad Distribution']),
('Premium Pass', 'Express darshan with special priest assistance', 1000, 3, '4:00 AM - 10:00 PM', ARRAY['Express Entry', 'Dedicated Priest', 'Special Prasad', 'Photography Allowed']),
('Family Pass', 'Special package for families with children', 750, 6, '6:00 AM - 8:00 PM', ARRAY['Family Queue', 'Kids Area Access', 'Prasad Distribution', 'Rest Area']);