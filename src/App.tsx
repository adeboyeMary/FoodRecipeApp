import './main.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from './pages/RootLayout';
import RecipePage from './pages/RecipePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <RecipePage />
      },
      {
        path: '/SignIn',
        element: <SignIn />
      },
      {
        path: '/SignUp',
        element: <SignUp />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
