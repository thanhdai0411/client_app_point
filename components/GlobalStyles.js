import { extendTheme } from 'native-base';
export const theme = extendTheme({
    fontConfig: {
        Poppins: {
            300: {
                normal: 'Poppins_300Light',
            },
        },
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins',
        mono: 'Poppins',
    },
});
