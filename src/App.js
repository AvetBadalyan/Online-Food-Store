import { useState } from "react";
import "./App.css";
import AuthForm from "./Components/Auth/AuthForm";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Context/CartProvider";

function App() {
  const [cartIsShown, SetCartIsShown] = useState(false);

  const showCartHandler = () => {
    SetCartIsShown(true);
  };

  const hideCartHandler = () => {
    SetCartIsShown(false);
  };

  return (
    <CartProvider>
      <div className="App">
        {cartIsShown && <Cart hideCartHandler={hideCartHandler} />}
        <Header showCartHandler={showCartHandler} />
        <main>
          <Meals />
        </main>
      </div>
      <AuthForm />
    </CartProvider>
  );
}

export default App;
