import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Link,
    Stack,
    useDisclosure,
} from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import HeaderCart from './HeaderCart.jsx';
import HeaderUser from './HeaderUser.jsx';
import { NavLink } from './NavLink.jsx';

// interface Props {
//     children: React.ReactNode;
// }

const Links = ['Projects', 'Team'];

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { currentUser } = useAuth();

    const navigate = useNavigate();

    console.log('currentUser', currentUser);

    // const [cartQty, setCartQty] = useState(0);

    // useEffect(() => {
    //     setCartQty(cart.products.reduce((a, b) => a + b.qty, 0));
    // }, [cart]);

    return (
        <>
            <Box as="header" bg={'gray.100'} px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <Link as={RouterLink} to={'/'}>
                            Home
                        </Link>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}
                        >
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <HeaderCart />
                        {currentUser ? (
                            <HeaderUser currentUser={currentUser} />
                        ) : (
                            <Flex gap="2">
                                <Button
                                    fontSize="sm"
                                    variant="link"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    fontSize="sm"
                                    onClick={() => navigate('/registration')}
                                >
                                    Registration
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
