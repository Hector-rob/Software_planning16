import { Box, Button, Container, Link, TextField, Typography } from '@mui/material'
import React from 'react'


export default function ForgotPassword() {



    return(
        <Box>
        
        <Container maxWidth={false} sx={{ width: "100%" }}>
            <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}> Forgot Password </Typography>
            <Typography fontSize={25} paddingBottom={2} fontWeight={500} sx={{ mt: 2, }}> Email Address </Typography>
            <TextField id="outlined-basic" label="Enter email address" variant="outlined" />
            <Button variant='contained'  >  Submit </Button>
            <Link href='Login'> Return to Login </Link>


            
            


        </Container>
        </Box>




        
    )

}
