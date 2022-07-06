import './App.css';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';

function App() {
  return (
    <div className="App">
      <Cart/>
      <Header />
      <main>
        <Meals/>
      </main>
    </div>
  );
}

export default App;
