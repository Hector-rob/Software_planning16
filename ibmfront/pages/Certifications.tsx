import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { alignProperty } from '@mui/material/styles/cssUtils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0F62FE",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Certifications(props: any) {
  //luego tenemos que cambiar esto por info real
  const data = [["name", "department", "certification_name"],
  ["persona1", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"]]

  return (
    <>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <br />
        <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Pending Certifications</Typography>
        <Box display="flex-start" sx={{ height: 10, width: 0.3, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
        <br></br>
        <br></br>
        <br></br>

        <React.Fragment>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead></TableHead>
              <TableBody>
                {data.slice(1).map((row: any) => (
                  <StyledTableRow key={row[0]}>
                    <StyledTableCell width={"10%"} align="center">
                      <AccountCircleRoundedIcon sx={{ fontSize: 100 }}></AccountCircleRoundedIcon>
                    </StyledTableCell>
                    <StyledTableCell width={"15%"} align="center">
                      <Typography variant="subtitle1" fontWeight={'bold'}>{row[0]} </Typography>
                      <Typography variant="subtitle1" >{row[1]} </Typography>

                    </StyledTableCell>
                    <StyledTableCell width={"20%"} align="center">
                      <Typography variant="subtitle1" style={{ color: '#0F62FE' }}>
                        {row[2]}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell width={"15%"} align="center">
                      <img src="./Assets/images/IBMblue.png" alt="Logo" width={120}></img>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Grid
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Stack direction="row" spacing={4} sx={{ ml: 5, boxSizing: 'border-box' }}>
                          <Button variant="contained" component="span"
                            style={{
                              backgroundColor: "#198038",
                              padding: "9px 18px",
                            }}
                            endIcon={<CheckRoundedIcon />}>
                            Accept
                          </Button>

                          <Button variant="contained" component="span"
                            style={{
                              backgroundColor: "#DA1E28",
                              padding: "9px 18px"
                            }}

                            endIcon={<ClearRoundedIcon />}>
                            Decline
                          </Button>

                          <Button variant="contained"
                            style={{
                              backgroundColor: "#0F62FE",
                              padding: "9px 18px"
                            }}

                            endIcon={<SendRoundedIcon />}>
                            Send comment
                          </Button>

                        </Stack>
                      </Grid>

                    </StyledTableCell>
                  </StyledTableRow>
                )
                )}

              </TableBody>

            </Table>
          </TableContainer>
        </React.Fragment>
      </Container>
    </>
  );
}