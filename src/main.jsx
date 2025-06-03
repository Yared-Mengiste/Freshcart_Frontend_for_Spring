// src/main.jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./context/CartProvider";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import App from "./App";
import { ProductsProvider } from "./context/ProductsProvider";
import { MessageProvider } from "./context/MessageContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsProvider>
      <MessageProvider>
      <CartProvider>
        <UserProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </UserProvider>
      </CartProvider>
      </MessageProvider>
    </ProductsProvider>
  </BrowserRouter>
);
