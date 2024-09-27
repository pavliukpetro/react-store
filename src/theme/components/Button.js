export const ButtonStyle = {
    // style object for base or default style
    baseStyle: {
        fontWeight: 'regular',
        textTransform: 'uppercase',
        borderRadius: 'md',
        px: 4,
        py: 2,
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 2,
            py: 1,
            h: '30px',
        },
        md: {
            fontSize: 'md',
        },
    },
    // styles for different visual variants ("outline", "solid")
    variants: {
        outline: {
            borderWidth: '2px',
            borderColor: 'brand.500',
        },
        solid: {
            borderWidth: '2px',
            borderColor: 'brand.500',
            bg: 'brand.500',
            color: 'white',
        },
        mySuperVariant: {
            bg: 'brand.600',
            color: 'white',
        },
    },
    // default values for 'size', 'variant' and 'colorScheme'
    defaultProps: {
        size: 'md',
        variant: 'solid',
        colorScheme: 'brand',
    },
};
