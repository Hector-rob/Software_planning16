import { Grid, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Register() {

    const [visiblePassword, toggleVisibility] = useState(false);
    const clickHandler = () => toggleVisibility(!visiblePassword);

    return <Container maxWidth disableGutters="true">
        <Grid container>
            <Grid item xs={6} sx={{ bgcolor: "#F2F2F2" }}>
                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} sx={{ mt: 3, ml: 2 }} component={Link} to={"/"}>
                    Back
                </Button>
                <Typography fontSize={50} sx={{ mt: 3, ml: 2 }}>Create a new <Box fontWeight={800} display='inline'>account</Box></Typography>
                <Typography fontSize={30} sx={{ mt: 3, ml: 3, mb: 16}}>Exclusive to <Box fontWeight={800} display='inline'>IBM Managers</Box></Typography>
                <img style={{ width: 620, height: 340}} src="./Assets/images/pixelBG.webp" alt="Art"></img>
            </Grid>
            <Grid item xs={6} sx={{ bgcolor: "white", mt: 5 }} textAlign={"center"}>
                <Typography fontSize={30} sx={{ mt: 0 }}>Create a new <Box fontWeight={800} display='inline'>IBM Dashboard Manager</Box> account</Typography>
                <Box margin="auto" display="flex" sx={{ height: 10, width: 631, backgroundColor: "#0F62FE", mt: 3 }}></Box>
                <Typography fontSize={25} sx={{ mt: 3, ml: 10 }} textAlign={"left"}>1. General Information</Typography>
                <Box component="registerForm" noValidate>
                    <Grid container sx={{ mt: 3 }} rowSpacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: 586 }}
                                variant="filled"
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 275 }}
                                variant="filled"
                                required
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus />
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 275 }}
                                variant="filled"
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 586 }}
                                variant="filled"
                                required
                                name="password"
                                label="Password"
                                type={visiblePassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle visibility"
                                                onClick={clickHandler}
                                            >
                                                {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField sx={{ width: 275 }}
                                variant="filled"
                                required
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                autoFocus />
                        </Grid>
                        <Grid item xs={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 275 }}
                                variant="filled"
                                required
                                id="department"
                                label="Department"
                                name="department"
                                autoComplete="department"
                                autoFocus />
                        </Grid>
                    </Grid>
                    <Button component="a" to="/mainPage"
                        type="submit"
                        variant="contained"
                        sx={{ mt: 5, mb: 2, borderRadius: 0, width: 350 }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Container >
}