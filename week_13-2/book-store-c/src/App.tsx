import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { useContext, useState } from "react";
import { BookStoreThemeProvider } from "./context/themeContext";
import ThemeSwitcher from "./components/header/ThemeSwitcher";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
