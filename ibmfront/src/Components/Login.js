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

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          <Button component={Link} to="/mainPage"
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, borderRadius: 0 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography>
                <Link href="#" underline="hover">
                  {"Forgot password?"}
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link href="#" underline="hover">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}