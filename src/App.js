import { useContext } from 'react';

import Header from './Component/Layout/Header/Header';
import Meals from './Component/Meal/Meals/Meals';
import Cart from './Component/Cart/Cart';
import CartContext from './Context/cart-context';

function App() {
    const cartCtx = useContext(CartContext);

    return (
        <div>
            <Header />
            <Meals />
            {cartCtx.isClick && <Cart />}
        </div>
    );
}

export default App;
