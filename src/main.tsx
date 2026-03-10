import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/App/App.tsx';

import 'modern-normalize';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
