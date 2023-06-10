import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function ForgotPassword() {
    const [_email, setEmail] = useState("");
    const [_password, setPassword] = useState("");
  
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
    const [showErrorAlert, setShowErrorAlert] = useState(false); 
  
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    };
  
    const ForgotPassword = () => {
      window.location.href = "./ForgotPassword";
  
  
    }

    const [visiblePassword, toggleVisibility] = useState(false);
    const clickHandler = () => toggleVisibility(!visiblePassword);


return(
    <Container component="main" maxWidth="sm">
        {showSuccessAlert && (
        <Box position="absolute" top={20} right={20} sx={{width: 300}}>
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Login Successful
        </Alert>
        </Box>
        )} 
        {showErrorAlert && !showSuccessAlert && (
        <Box position="absolute" top={20} right={20} sx={{width: 300}}>
            <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Invalid Data
            </Alert>
            </Box>
        )} 
    <Box
        sx={{
        boxShadow: 7,
        borderRadius: 5,
        px: 4,
        py: 6,
        marginTop: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        }}>
    <Box display="flex" sx={{
      position: "relative",
      bottom: 65,
      borderRadius: 5,
      width: 525,
      height: 200,
      backgroundColor: "#0F62FE",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Grid container spacing={3} textAlign={"center"}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4" fontWeight={800} color="white">
            Forgot Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img src="./Assets/images/IBMWhite.png" alt="Logo" width={200}></img>
        </Grid>
      </Grid>
    </Box>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: -5 }}>
      <TextField
        margin="normal"
        variant="filled"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      
      {/* <Button href="/MainPage" */}
      <Button variant='contained' fullWidth sx={{ mt: 3, mb: 2, borderRadius: 0 }} >  Submit </Button>
      <Grid container>
        <Grid item xs>
          <Typography>
            {/*  {<Link href="/PageNotFound" underline="hover">
              "Forgot password?"
            </Link>} */}
            <br></br>
            <Link href="Login" underline="hover">Return to Login</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
</Container>




        
    )

}
