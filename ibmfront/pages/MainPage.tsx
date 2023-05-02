import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
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
import Container from '@mui/material/Container';
import DonutChart from '../components/graficaDonut';
import PieChart from '../components/graficaPie';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import Button from '@mui/material/Button';


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

export default function MainPage() {
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
            color="white"
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
      
        <DrawerHeader />

        <Box component="main" sx={{ width: "90%" }}>
          <Container maxWidth={false} sx={{ width: "100%" }}>
            <br />
            <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Welcome back, <Typography component="span" fontSize={30} fontWeight={300}> UserName</Typography></Typography>
            <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
            <br></br>
        
          </Container>
          
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          
            <Container sx={{ marginLeft:3, width: "60%", maxHeight:"25%", backgroundColor:"grey.300"}}>
              <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>All Certifications</Typography>
              <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
              <br />
              
              <Box sx={{display: "inline-flex", flexDirection: 'row', width: "32%"}}>
              
                <DonutChart data={{ 
                                labels: ['Low', 'Medium', 'High', 'Critical'], 
                                values: [10, 20, 30, 40], 
                                colors: ['#FFEE99', '#FF9F00', '#FF4500', '#E12901'] }} />
                
                <DonutChart data={{ 
                                labels: ['Low', 'Medium', 'High', 'Critical'], 
                                values: [10, 20, 30, 40], 
                                colors: ['#FFEE99', '#FF9F00', '#FF4500', '#E12901'] }} />

                <DonutChart data={{ 
                                labels: ['Low', 'Medium', 'High', 'Critical'], 
                                values: [10, 20, 30, 40], 
                                colors: ['#FFEE99', '#FF9F00', '#FF4500', '#E12901'] }} />

              </Box>

              



            </Container>

            <Container sx={{ marginLeft:3, width: "40%",  maxHeight:"25%", backgroundColor:"grey.300"}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography fontSize={30} fontWeight={600} sx={{ mt: 2 }}> Certifications  
                <Typography component="span" fontSize={20} fontWeight={300} sx={{ verticalAlign: 'center' }}> by Department</Typography>
                </Typography>
              </Box>

              <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
              <br />

              <Box sx={{width:"100%", height: "60%", display: 'flex', justifyContent: 'center', }}>
                <PieChart data={{ 
                                labels: ['Low', 'Medium', 'High', 'Critical'], 
                                values: [10, 20, 30, 40], 
                                colors: ['#FFEE99', '#FF9F00', '#FF4500', '#E12901'] }} />
              </Box>

             
        

            </Container>
          </Box>

          <br />

          <Box sx={{ display: "flex", flexDirection: "row", width: "60%" }}>
            <Container sx={{ marginLeft:3, width: "100%", backgroundColor:"grey.300"}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography fontSize={30} fontWeight={600} sx={{ mt: 2 }}> Upload  
                  <Typography component="span" fontSize={20} fontWeight={300} sx={{ verticalAlign: 'center' }}> Certifications</Typography>
                  </Typography>
                </Box>

              <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
              <br />
            
              <Box sx={{  width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography fontWeight={600}> Upload files </Typography>
                  <Typography>Max file size is 500kb. Supported file types are .xlsx and .csv.</Typography>
                </Box>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                 /*  onChange={e => handleFile(e)} */
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span"
                    style={{
                      backgroundColor: "#000000",
                      padding: "18px 36px"
                    }}
                    endIcon={<CloudUploadRoundedIcon />}>
                    Upload
                  </Button>
                </label>

              </Box>
              <br />

            </Container>
          
          </Box>

        </Box>
        <br />
    </Box>
  );
}
