import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { useContext, useState } from "react";
import { BookStoreThemeProvider } from "./context/themeContext";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout><Home /></Layout>,
    errorElement : <Error />
  },
  {
    path : "/books",
    element : <Layout><div>도서 목록</div></Layout>
  },
  {
    path : "/signup",
    element : (
      <Layout>
        <Signup />
      </Layout>
    )
  }
]);

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
