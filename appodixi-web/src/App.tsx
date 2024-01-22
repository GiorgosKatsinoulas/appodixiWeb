import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Results from './components/Results';
import ReportPage from './components/Report';

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
