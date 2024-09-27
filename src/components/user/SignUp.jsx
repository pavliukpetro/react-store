import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp() {
        console.log('handleSignUp');

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
                console.log('user', user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box>
            <Heading>Sign Up</Heading>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button onClick={handleSignUp}>Sign Up</Button>
        </Box>
    );
}

export default SignUp;
