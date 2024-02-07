import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import ReportPage from './components/Report';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlowChooser from './components/FlowChooser';
import HomeZustand from './components/HomeZustand';
import ResultsZustand from './components/ResultZustand';
import ReportPageZustand from './components/ReportZustand';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FlowChooser />,
  },
  {
    path: 'home',
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
  {
    path: 'homeZustand',
    element: <HomeZustand />,
  },
  {
    path: 'resultsZustand',
    element: <ResultsZustand />,
  },
  {
    path: 'reportZustand',
    element: <ReportPageZustand />,
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
