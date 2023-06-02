import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";


export default function EmployeeView() {

  const [userName, setUserName] = useState("");

  const logOut = () => {
    window.localStorage.clear();
    Cookies.remove("loggedin");
    window.location.href = "./Login";
  };

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data, "userData");
        setUserName(data.data.email);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./Login";
        }
      });
  }, []);

  return (

    <Container maxWidth={false} sx={{ width: "100%" }}>
      <br />
      <Stack direction="row">
        <Box sx={{ width: "90%" }}>
          <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Welcome back, <Typography component="span" fontSize={30} fontWeight={300}> {userName}</Typography></Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
        </Box>
        <Button variant="contained" endIcon={<LogoutIcon />} onClick={() => logOut()} sx={{ height: 50, mt: 3, ml: 3, backgroundColor: "black" }}>LogOut</Button>
      </Stack>
      <br />

      <Box sx={{ display: "flex", width: "100%" }}>
        <Paper elevation={12} sx={{ width: "50%", backgroundColor: "grey.300", minHeight: "100%", mt: 1 }}>
          <Typography sx={{ mt: 2, ml: 2 }} fontSize={25} fontWeight={600}>Your Certifications</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.55, backgroundColor: "#0F62FE", mt: 1, marginLeft: 2, mb: 1 }}></Box>
        </Paper>
      </Box>


    </Container >


  )








}