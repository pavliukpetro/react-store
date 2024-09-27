import {
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function HeaderUser({ currentUser }) {
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                console.log('signed out');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
            >
                <Avatar
                    bg="teal.500"
                    size={'sm'}
                    src={currentUser.photoURL ?? 'https://bit.ly/broken-link'}
                />
            </MenuButton>
            <MenuList>
                <MenuGroup
                    title={`Hello, ${currentUser.name || currentUser.email}`}
                >
                    <MenuItem>My Account</MenuItem>
                    <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default HeaderUser;
