
-- Fix: Replace overly permissive INSERT policy on events
DROP POLICY "Service can insert events" ON public.events;

-- Only allow inserts from authenticated users or via service role (edge functions)
CREATE POLICY "Authenticated can insert events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (true);
