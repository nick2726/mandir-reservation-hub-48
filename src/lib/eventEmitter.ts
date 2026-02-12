import { supabase } from '@/integrations/supabase/client';

interface EmitEventOptions {
  event_type: string;
  payload: Record<string, any>;
  source?: string;
}

/**
 * Emits an event to the webhook-processor edge function for async processing.
 * Events are stored in the events table and processed by registered handlers.
 */
export const emitEvent = async ({ event_type, payload, source = 'app' }: EmitEventOptions) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await supabase.functions.invoke('webhook-processor', {
      body: { event_type, payload, source },
      headers: session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : undefined,
    });

    if (response.error) {
      console.error(`Event emission failed [${event_type}]:`, response.error);
      return { success: false, error: response.error };
    }

    console.log(`Event emitted [${event_type}]:`, response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Event emission error [${event_type}]:`, error);
    return { success: false, error };
  }
};
