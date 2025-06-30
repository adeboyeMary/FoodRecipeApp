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
import { fetchAllFavorites } from "./store/recipesThunk";
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
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');
console.log(user, '........'); // Should show { username: "mary@gmail.com" }

  console.log(token,  '....App.js token check......');
  console.log(refreshToken,  '....App.js refreshToken check......');
  console.log(user,  '....App.js user check......');


  useEffect(() => {
    console.log(user, '....1....'); 
    if(token && refreshToken && user) {
      dispatch(startTokenRefresh());
      dispatch(fetchAllFavorites());
      console.log(user, '....2....'); 
    }
  }, [dispatch, token, refreshToken, user]);



  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
