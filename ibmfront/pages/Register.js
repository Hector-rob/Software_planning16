import { FormControl, Grid, InputLabel, Select, TextField, Typography, MenuItem, } from "@mui/material";
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
    const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
        'Azerbaijan', 'The Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
        'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
        'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Côte d Ivoire', 'Croatia', 'Cuba',
        'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador',
        'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia', 'Georgia', 'Germany', 'Ghana',
        'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
        'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos',
        'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
        'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia, Federated States of', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
        'Myanmar (Burma)', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
        'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
        'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
        'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
        'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe']
    const [visiblePassword, toggleVisibility] = useState(false);
    const clickHandler = () => toggleVisibility(!visiblePassword);
    const [country, selectCountry] = useState("");
    const selectCountryHandler = (val) => selectCountry(val.target.value);

    return (
    <Container maxWidth="false" disableGutters="false">
        <Grid container sx={{ minHeight: "100%", position: "absolute" }}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ bgcolor: "#F2F2F2" }}>
                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} sx={{ mt: 3, ml: 2 }} href="/Login">
                    Back
                </Button> 
                <Typography fontSize={50} sx={{ mt: 3, ml: 2 }}>Create a new <Box fontWeight={800} display='inline'>account</Box></Typography>
                <Typography fontSize={30} sx={{ mt: 3, ml: 3, mb: 6 }}>Exclusive to <Box fontWeight={800} display='inline'>IBM Managers</Box></Typography>
                <img style={{ height: "50%", width: "50%", position: "absolute", bottom: 0 }} src="./Assets/images/pixelBG.webp" alt="Art"></img>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ bgcolor: "white", mt: 5 }} textAlign={"center"}>
                <Typography fontSize={30} sx={{ mt: 2, }}>Create a new <Box fontWeight={800} display='inline'>IBM Dashboard Manager</Box> account</Typography>
                <Box margin="auto" display="flex" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3 }}></Box>
                <Typography fontSize={25} sx={{ mt: 5 }} textAlign={"center"}>1. General Information</Typography>
                <Box component="registerForm" noValidate>
                    <Grid container sx={{ mt: 4 }} rowSpacing={2}>
                        <Grid item xs={12} md={12} lg={12} xl={12} >
                            <TextField
                                sx={{ width: 0.95 }}
                                variant="filled"
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 0.9 }}
                                variant="filled"
                                required
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus />
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 0.9 }}
                                variant="filled"
                                required
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 0.95 }}
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
                        <Grid item xs={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                            <FormControl required sx={{ width: 0.9 }}>
                                <InputLabel id="countryLabel">Country</InputLabel>
                                <Select
                                    variant="filled"
                                    labelId="countryLabel"
                                    id="selectCountry"
                                    value={country}
                                    label="Country"
                                    onChange={selectCountryHandler}

                                >
                                    {countries.map((countryName) => (
                                        <MenuItem
                                            key={countryName}
                                            value={countryName}
                                        >{countryName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                            <TextField
                                sx={{ width: 0.9 }}
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
    );
}