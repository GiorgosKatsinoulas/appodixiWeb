import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import ReportPage from './components/Report';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'results',
    element: <Results />,
  },
  {
    path: 'report',
    element: <ReportPage />,
  },
]);

export const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
