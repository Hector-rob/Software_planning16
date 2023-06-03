import { FormControl, Grid, InputLabel, Select, TextField, Typography, MenuItem, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeLastName, setEmployeeLastName] = useState("");
    const [employeePassword, setEmployeePassword] = useState("");
    const [employeeCountry, setEmployeeCountry] = useState("");
    const [employeeDepartment, setEmployeeDepartment] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [isValidPassword2, setIsValidPassword2] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const [isFormValid, setIsFormValid] = useState(false);

    const handlePasswordChange = (e) => {
        
        setEmployeePassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === employeePassword);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
        return passwordRegex.test(password);
    };

    const submitEmployee = () => {
        if (!isFormValid) {
            window.alert("Invalid input(s). Please check the form and try again.");
            return;
        }

        Axios.post("http://localhost:5000/user", {
            email: employeeEmail,
            name: employeeName,
            last_name: employeeLastName,
            password: employeePassword,
            country: employeeCountry,
            department: employeeDepartment
        }).then(() => {
            window.alert("Register was succesful");
            window.location.href = "./Login";

        })
    };

    // const submitEmployee = async() =>  {
    //     try{
    //       const response = await Axios.post("http://localhost:5000/user", {
    //         email: employeeEmail,
    //         name: employeeName,
    //         last_name: employeeLastName,
    //         password: employeePassword,
    //         country: employeeCountry,
    //         department: employeeDepartment
    //         });
    //       console.log(response.data, "User");
    //       if (response.data.status == "ok") {
    //         alert("login successful");
    //         window.localStorage.setItem("token", response.data.data);
    //         window.localStorage.setItem("loggedIn", true);

    //       }
    //     }
    //     catch(error){
    //       console.log(error);
    //       alert("User exists")
    //     }
    //   }

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
    const [visiblePasswordConfirm, toggleVisibilityConfirm] = useState(false);

    const clickHandler = () => toggleVisibility(!visiblePassword);
    const clickHandlerConfirm = () => toggleVisibilityConfirm(!visiblePasswordConfirm);

    const [country, selectCountry] = useState("");
    const selectCountryHandler = (val) => selectCountry(val.target.value);

    const validateForm = () => {
        const hasValidEmail = employeeEmail.trim().length > 0 && employeeEmail.includes("@") && employeeEmail.includes(".");
        const hasValidName = employeeName.trim().length > 0;
        const hasValidLastName = employeeLastName.trim().length > 0;
        const hasValidPassword = employeePassword.trim().length > 0;
        const hasValidConfirmPassword = confirmPassword.trim().length >= 8;
        const hasValidCountry = !isNaN(employeeCountry);
        const hasValidDepartment = employeeDepartment.trim().length > 0;
        const passwordsMatch = employeePassword === confirmPassword 
        const isValidPassword = validatePassword(employeePassword);
        setIsValidPassword2(isValidPassword);
        setIsValidEmail(hasValidEmail);

        setIsFormValid(hasValidEmail &&
            hasValidName &&
            hasValidLastName &&
            hasValidPassword &&
            hasValidConfirmPassword &&
            hasValidCountry &&
            hasValidDepartment &&
            passwordsMatch &&
            isValidPassword)

        return (
        hasValidEmail &&
        hasValidName &&
        hasValidLastName &&
        hasValidPassword &&
        hasValidConfirmPassword &&
        hasValidCountry &&
        hasValidDepartment &&
        passwordsMatch &&
        isValidPassword
        );
    };
    
    useEffect(() => {
        validateForm(); 
      }, [employeeEmail, employeeName, employeeLastName, employeePassword, confirmPassword, employeeCountry, employeeDepartment]);


    return (
        <Container maxWidth="false" disableGutters="false">
            <Grid container sx={{ minHeight: "100%", position: "absolute" }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ bgcolor: "#F2F2F2" }}>
                    <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} sx={{ mt: 3, ml: 2 }} href="/Login">
                        Back
                    </Button>
                    <Typography component='div' fontSize={50} sx={{ mt: 3, ml: 2 }}>Create a new <Box fontWeight={800} display='inline'>account</Box></Typography>
                    <Typography component='div' fontSize={30} sx={{ mt: 3, ml: 3, mb: 6 }}>Exclusive to <Box fontWeight={800} display='inline'>IBM managers</Box></Typography>
                    <img style={{ height: "50%", width: "50%", position: "absolute", bottom: 0 }} src="./Assets/images/pixelBG.webp" alt="Art"></img>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ bgcolor: "white", mt: 5 }} textAlign={"center"}>
                    <Typography component='div' fontSize={30} sx={{ mt: 2, }}>Create a new <Box fontWeight={800} display='inline'>IBM Dashboard Manager</Box> account</Typography>
                    <Box margin="auto" display="flex" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3 }}></Box>
                    <Typography fontSize={25} sx={{ mt: 5 }} textAlign={"center"}>1. General Information</Typography>
                    <Box component="RegisterForm" noValidate>
                        <Grid container sx={{ mt: 4 }} rowSpacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                                <TextField
                                    sx={{ width: 0.95 }}
                                    variant="filled"
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => {
                                        setEmployeeEmail(e.target.value)
                                    }} />
                                {!isValidEmail && employeeEmail.trim().length > 4 && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    Invalid Email.
                                </Typography>
                                )}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                                <TextField
                                    sx={{ width: 0.9 }}
                                    variant="filled"
                                    required
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => {
                                        setEmployeeName(e.target.value)
                                    }} />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                                <TextField
                                    sx={{ width: 0.9 }}
                                    variant="filled"
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    autoFocus
                                    onChange={(e) => {
                                        setEmployeeLastName(e.target.value)
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
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
                                    }}
                                    onChange={(e) => {
                                        //setEmployeePassword(e.target.value)
                                        handlePasswordChange(e);
                                    }} />
                            </Grid>
                            {!isValidPassword2 && employeePassword.trim().length > 0 && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
                                </Typography>
                            )}
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
                                <TextField
                                    sx={{ width: 0.95 }}
                                    variant="filled"
                                    required
                                    name="password-rewrite"
                                    label="Rewrite Password"
                                    type={visiblePasswordConfirm ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    error={!passwordsMatch}
                                    helperText={!passwordsMatch && confirmPassword.trim().length >=8 && "Passwords do not match"}
                                    /* InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle visibility"
                                                    onClick={clickHandlerConfirm}
                                                >
                                                    {visiblePasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }} */
                                    onChange={(e) => {
                                        //setEmployeePassword(e.target.value)
                                        handleConfirmPasswordChange(e)
                                    }} />
                            {/* {!passwordsMatch && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    Passwords do not match.
                                </Typography>
                            )} */}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                                <FormControl required sx={{ width: 0.9 }}>
                                    <InputLabel id="countryLabel" onChange={(e) => {
                                        setEmployeeCountry(e.target.value)
                                    }}
                                    >Country </InputLabel>
                                    <Select
                                        variant="filled"
                                        labelId="countryLabel"
                                        id="selectCountry"
                                        value={country}
                                        label="Country"
                                        onChange={selectCountryHandler}
                                        onClose={(e) => {
                                            setEmployeeCountry(e.target.value)
                                        }}
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
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ mt: 3 }}>
                                <TextField
                                    sx={{ width: 0.9 }}
                                    variant="filled"
                                    required
                                    id="department"
                                    label="Department"
                                    name="department"
                                    autoComplete="department"
                                    autoFocus
                                    onChange={(e) => {
                                        setEmployeeDepartment(e.target.value)
                                    }} />
                            </Grid>
                        </Grid>
                        
                        <Tooltip title={!isFormValid ? "Invalid Input(s)" : ""} arrow>
                            <span>
                                <Button
                                component="a"
                                to="/MainPage"
                                type="submit"
                                variant="contained"
                                onClick={submitEmployee}
                                disabled={!isFormValid}
                                sx={{ mt: 5, mb: 2, borderRadius: 0, width: 350 }}
                                >
                                Create Account
                                </Button>
                            </span>
                        
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}