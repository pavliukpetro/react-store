import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'jest';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import ProductTile from './ProductTile';

describe('ProductTile component', () => {
    const productMock = {
        id: 1,
        title: 'Test Product',
        description: 'This is a test product',
        price: 100,
        images: ['https://via.placeholder.com/150'],
    };

    const cartMock = {
        products: [],
        totalQty: 0,
        total: 0,
    };

    const setCartMock = jest.fn();

    const renderComponent = () => {
        return render(
            <Router>
                <CartContext.Provider
                    value={{ cart: cartMock, setCart: setCartMock }}
                >
                    <ProductTile product={productMock} />
                </CartContext.Provider>
            </Router>
        );
    };

    it('renders product details correctly', () => {
        renderComponent();

        // Check if product image is rendered
        const productImage = screen.getByAltText(productMock.title);
        expect(productImage).toBeInTheDocument();

        // Check if product title is rendered
        const productTitle = screen.getByText(productMock.title);
        expect(productTitle).toBeInTheDocument();

        // Check if product description is rendered
        const productDescription = screen.getByText(productMock.description);
        expect(productDescription).toBeInTheDocument();

        // Check if product price is rendered
        const productPrice = screen.getByText(`$${productMock.price}`);
        expect(productPrice).toBeInTheDocument();
    });

    it('adds product to cart when Buy Now button is clicked', () => {
        renderComponent();

        // Find the "Buy now" button
        const buyButton = screen.getAllByText('Buy now')[0];

        // Simulate a click on the Buy Now button
        fireEvent.click(buyButton);

        // Check if setCart function is called
        expect(setCartMock).toHaveBeenCalledTimes(1);

        // Verify that the product is added to the cart correctly
        expect(setCartMock).toHaveBeenCalledWith({
            ...cartMock,
            products: [
                {
                    id: productMock.id,
                    title: productMock.title,
                    price: productMock.price,
                    qty: 1,
                },
            ],
            total: cartMock.total + productMock.price,
        });
    });

    it('renders the IconButton for favoriting the product', () => {
        renderComponent();

        // Check if the icon button is rendered
        const iconButton = screen.getByLabelText('Call Sage');
        expect(iconButton).toBeInTheDocument();
    });
});
