import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "IBM Plex Sans",
    },
    palette: {
        primary: { main: "#0F62FE" },
        secondary: { main: "#393939" },
        error: { main: "#DA1E28" },
        warning: { main: "#F1C21B" },
        success: { main: "#198038" },
    },
})

export default theme;