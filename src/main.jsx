import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartContextProvider } from './context/CartContext.jsx';
import CheckoutPage from './pages/checkout.jsx';
import LoginPage from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import ProductPage from './pages/product.jsx';
import RegistationPage from './pages/registation.jsx';
import Root from './pages/root.jsx';
import { customTheme } from './theme/theme.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/registration',
                element: <RegistationPage />,
            },
            {
                path: '/product/:productId',
                element: <ProductPage />,
            },
            {
                path: '/checkout',
                element: <CheckoutPage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ChakraProvider theme={customTheme}>
            <AuthProvider>
                <CartContextProvider>
                    <RouterProvider router={router} />
                </CartContextProvider>
            </AuthProvider>
        </ChakraProvider>
    </StrictMode>
);
