import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                navigate('/');
                console.log('user', user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSignIn}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            Already a user?{' '}
                            <Link
                                as={RouterLink}
                                color={'blue.400'}
                                to={'/registration'}
                            >
                                Registration
                            </Link>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
