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
import { Box, Grid } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';

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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  background: "black",
  borderRadius: '0 30px 30px 0',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "black",
  borderRadius: '0 30px 30px 0',
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Certifications(props: any) {
  //luego tenemos que cambiar esto por info real
  const data = [["name", "department", "certification_name"],
  ["persona1", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"],
  ["persona2", "Department", "Certification Name"]]

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuIcons = [<HomeIcon />, <PeopleIcon />, <WorkspacePremiumIcon />];
  const menuRefs = ["/MainPage", "/Database", "/Certifications"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{
            marginRight: 0,
            ...(!open && { display: 'none' }),
            color: "white",
          }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 0,
              ...(open && { display: 'none' }),
              color: "white",
            }}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider color="white" variant="middle" />
        <List>
          {['Home', 'Employees', 'Certifications'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                href={menuRefs[index]}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mt: 2,
                  mb: 2,
                  color: "white",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                  }}
                >
                  {menuIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider color="white" variant="middle" />
        <ListItem key={"Sign Out"} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              color: "white",
              mt: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: "white",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                      <StyledTableCell width={"12%"} align="center">
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
      </Box>
    </Box>
  );
}