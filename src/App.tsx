import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import './main.css';
import RootLayout from './pages/RootLayout';
import RecipePage from './pages/RecipePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import FavoritePage from './pages/FavoritePage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import { useDispatch, useSelector } from "react-redux";
import { startTokenRefresh } from "./store/authThunk";
import { AppDispatch, RootState } from "./store";

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
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/Fav',
        element: <FavoritePage />
      },
      {
        path: ':recipeId',
        element: <RecipeDetailsPage />,
      }
    ]
  }
]);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // const {isLoggedIn, token, refreshToken, user} = useSelector((state: RootState) => state.auth);
  const error = useSelector((state: RootState) => state.auth.error);
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');


  console.log(token,  '....App.js token check......');
  console.log(refreshToken,  '....App.js refreshToken check......');
  console.log(user,  '....App.js user check......');


  useEffect(() => {
    if(token && refreshToken && user) {
      dispatch(startTokenRefresh());
    }
  }, [dispatch, token, refreshToken, user]);



  return (
    <>
    {error && <p className="font-bold text-red-500 text-center">{error}</p>}
    <RouterProvider router={router} />
    </>
  );
}

export default App;
