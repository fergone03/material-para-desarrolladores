
import { createClient } from '@supabase/supabase-js';

// Cliente de la API propia: GoTrue (auth) y PostgREST (datos) sobre Postgres en el VPS.
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const api = createClient(apiUrl, apiKey, { auth: { storageKey: 'mpd-auth' } });

export default api
