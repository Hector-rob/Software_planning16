import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from 'react-router-dom'
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Axios from "axios";


export default function Login() {
    const [_email, setEmail] = useState("");
    const [_password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

//   const Log = () => {
//     console.log("WTf");
//     const response = Axios.post("http://localhost:5000/login-user", {
//         email: _email,
//         password: _password
//     })
//     .then((res) => response.json(),console.log(response))
//     // .then((data) => {
//     //   if(data.status == "ok"){
//     //    alert("Login was succesful");
//     //    window.localStorage("token", data.data);


//     //   }
       
//     //     console.log(response);

//     // })
// };

const Log = async(e) =>  {
  e.preventDefault();

  console.log(_email, _password);

  try{
    const response = await Axios.post("http://localhost:5000/login-user", {
      email: _email,
      password: _password
      });
    console.log(response.data, "User");
    if (response.data.status == "ok") {
      alert("login successful");
      window.localStorage.setItem("token", response.data.data);
      window.localStorage.setItem("loggedIn", true);
      window.location.href = "./MainPage";
  
    }
    else{
       window.alert("Invalid data");

    }
  }
  catch(error){
    console.log(error);
    // window.alert("Invalid data");

  }
}

  // fetch("http://localhost:5000/login-user", {
  //   method: "POST",
  //   crossDomain: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: JSON.stringify({
  //     _email,
  //     _password,
  //   }),
  // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data, "User");
    //   if (data.status == "ok") {
    //     alert("login successful");
    //     window.localStorage.setItem("token", data.data);
    //     window.localStorage.setItem("loggedIn", true);

    //    // window.location.href = "./userDetails";
    //   }
    // });
// }

  const [visiblePassword, toggleVisibility] = useState(false);
  const clickHandler = () => toggleVisibility(!visiblePassword);

  return (
    <Container component="main" maxWidth="sm">
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
                Sign In
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
          <TextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            name="password"
            label="Password"
            type={visiblePassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value)
              // console.log(email);
              // console.log(password);

          }}
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <Button href="/MainPage" */}
          <Button onClick={(e) => {Log(e)}}
            type="register"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, borderRadius: 0 }}
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography>
               {/*  {<Link href="/PageNotFound" underline="hover">
                  "Forgot password?"
                </Link>} */} 
                <br></br>
                <Button href="/PageNotFound" variant="text" underline="hover">Forgot password?</Button>
              </Typography>
               
              
            </Grid>
            <Grid item>
              <Typography>
                {/* <Link href="/Register" underline="hover" to={"Register"}>
                  {"Don't have an account? Sign Up"}
                </Link> */}
                <br></br>
                <Button href="/Register" variant="text" underline="hover">Don't have an account? Sign Up</Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}