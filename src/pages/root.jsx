import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Root() {
    return (
        <Box>
            <Header />
            <Container maxW={'container.lg'}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default Root;
