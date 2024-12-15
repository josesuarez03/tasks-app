import React, { useEffect } from 'react';
import { testConnection } from '@/core/supabase/client';

export default function App() {
  useEffect(() => {
    testConnection(); // Llama a la prueba de conexión al cargar la app
  }, []);

  /* opcional, solo necesitamos la llamada a `testConnection`: */
  return (
    <div style={{ display: "none" }}> 
      <h6>Supabase Connection Test</h6> 
    </div>
  );
}