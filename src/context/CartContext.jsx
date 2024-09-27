import { onValue, ref } from 'firebase/database';
import { createContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { useAuth } from './AuthContext';

// 1. Create global context
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const { currentUser } = useAuth();
    // 2. Create Data
    const [cart, setCart] = useState({
        products: [],
        totalQty: 0,
        total: 0,
    });

    useEffect(() => {
        const cartRef = ref(database, `users/${currentUser?.uid}/cart`);

        if (currentUser?.uid) {
            onValue(cartRef, (snapshot) => {
                const cartDB = snapshot.val();

                console.log('cartDB', cartDB);

                setCart(cartDB);
            });
        }
    }, [currentUser?.uid]);

    // console.log('cart context', cart);

    // 3. Create Provider with Data
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
