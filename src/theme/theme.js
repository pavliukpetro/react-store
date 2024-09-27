import { extendBaseTheme, theme } from '@chakra-ui/react';
import { ButtonStyle } from './components/Button';
import { IconButtonStyle } from './components/IconButton';
import { colors } from './foundation/colors';
import { fontSizes } from './foundation/fontSizes';

console.log(theme.components);

export const customTheme = extendBaseTheme({
    ...theme,
    fontSizes,
    colors,
    components: {
        ...theme.components,
        Button: ButtonStyle,
        IconButton: IconButtonStyle,
    },
});
