import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';

const initialCart = {
    products: [],
    totalQty: 0,
    total: 0,
};
function useCart() {
    const [cart, setCart] = useState(initialCart);
    const cartRef = ref(database, 'cart');

    const { currentUser } = useAuth();

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

    return { cart, setCart, cartRef };
}

export default useCart;
