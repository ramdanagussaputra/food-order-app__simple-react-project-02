import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { CartProvider } from './Context/cart-context';
import { CheckoutProvider } from './Context/checkout-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
        <CheckoutProvider>
            <App />
        </CheckoutProvider>
    </CartProvider>
);
