import { useContext } from 'react';

import Header from './Component/Layout/Header/Header';
import Meals from './Component/Meal/Meals/Meals';
import Cart from './Component/Cart/Cart';
import CartContext from './Context/cart-context';
import Checkout from './Component/Checkout/Checkout';
import CheckoutContext from './Context/checkout-context';

function App() {
    // CONTEXT
    const cartCtx = useContext(CartContext);
    const checkCtx = useContext(CheckoutContext);

    return (
        <div>
            <Header />
            <Meals />
            {!checkCtx.isShow && cartCtx.isClick && <Cart />}
            {checkCtx.isShow && <Checkout />}
        </div>
    );
}

export default App;
