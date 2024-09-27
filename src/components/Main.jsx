import { Box, Heading, Text } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsList from './ProductsList';

function Main() {
    return (
        <Box as="main" sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Text
                as={'h1'}
                fontSize="4xl"
                p={4}
                fontWeight="bold"
                color="brand.500"
            >
                React Store
            </Text>
            <Heading>Chakra</Heading>

            <ProductsList />
        </Box>
    );
}

export default Main;
