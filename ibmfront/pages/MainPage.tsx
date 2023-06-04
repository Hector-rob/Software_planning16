import * as React from 'react';
import { useState, useEffect } from 'react';
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
import DonutChartSide from '../components/graficaDonutSide';
import PieChart from '../components/graficaPie';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import Button from '@mui/material/Button';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import Tooltip from '@mui/material/Tooltip';
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { Paper, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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

  const [file2, setFile2] = useState();
  const [fileName2, setFileName2] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const [badges, setBadges] = useState("");
  const [externalCerts, setExternalCerts] = useState("");
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pendingCerts, setPendingCerts] = useState("");

  

  useEffect(() => {
    Axios.get("http://localhost:5000/exportPendingCertifications").then((response) => {
      setPendingCerts(response.data.length);

    });
    Axios.get("http://localhost:5000/certification").then((response) => {
      setBadges(response.data.filter(x => x.type === "badge").length); //Get number of badges
      setExternalCerts(response.data.filter(x => x.type === "external certification").length); //Get number of external certifications
      setDepartments(response.data.map(x => x.department));
      setLocations(response.data.map(x => x.work_location));
      setLoading(false);
    });
  }, []);

  const [userName, setUserName] = useState("");
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
        console.log(data, "userData");
        setUserName(data.data.email);
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./Login";
        }
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    Cookies.remove("loggedin");
    window.location.href = "./Login";
  };

  const dptNames = ["Programming", "Finance and Operations", "Consulting", "Systems, Technology Lifecycle Services"]; //Get names of departments
  const dptNamesFreq = [];
  dptNames.forEach(element => {
    dptNamesFreq.push(departments.filter(x => x === element).length);
  }); //Get amount of certifications per department
  const workLocationNames = ["Guadalajara, Mexico", "Mexico City, Mexico", "Wroclaw, DS, Poland", "Vilnius, VL , Lithuania"];
  const workLocationFreq = [];
  workLocationFreq.push(locations.filter(x => x === "Guadalajara, Jalisco").length + locations.filter(x => x === "Guadalajara, JAL, Mexico").length);
  workLocationFreq.push(locations.filter(x => x === "Mexico City, Mexico").length + locations.filter(x => x === "Mexico City, DIF, Mexico").length);
  workLocationFreq.push(locations.filter(x => x === "Wroclaw, DS , Poland").length);
  workLocationFreq.push(locations.filter(x => x === "Vilnius, VL , Lithuania").length);

  function getGraphs() {
    return <React.Fragment>

      <DonutChart data={{
        labels: ['Badges', 'External Certifications'],
        values: [badges, externalCerts],
        colors: ['#31135e', '#8a3ffc'],
      }} />

    <Box sx={{ maxHeight: '315px',  mt:-10, ml:5 }}>
      <DonutChartSide
        data={{
          labels: workLocationNames,
          values: workLocationFreq,
          colors: ['#00539a', '#78a9ff', '#42be65', '#a2a9b0']
        }}
      />
    </Box>

      {/* <DonutChart data={{
        labels: ['Low', 'Medium', 'High', 'Critical'],
        values: [10, 20, 30, 40],
        colors: ['#FFEE99', '#FF9F00', '#FF4500', '#E12901']
      }} /> */}
    </React.Fragment>
  }

  function getCertsbyDpt() {
    return <React.Fragment>
      
      <PieChart data={{
        labels: dptNames,
        values: dptNamesFreq,
        colors: ['#510224', '#012749', '#3ddbd9', '#198038']
      }} />
    </React.Fragment>
  }

  const saveFile = (e) => {
    setFile2(e.target.files[0]);
    setFileName2(e.target.files[0].name);
    console.log(e);
    console.log(fileName2);

    if (e.target.files.length > 0) {
      setFileSelected(true);
    }
    else {
      setFileSelected(false);
    }

  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file2);
    formData.append("fileName", fileName2);
    try {
      const res = await Axios.post(
        "http://localhost:5000/importPendingCertifications",
        formData
      );
      console.log(res);
      console.log("gg");
      window.alert("The certification was uploaded");
      refreshPage();

    } catch (ex) {
      console.log(ex);
      console.log("error");
    }
  };

  const refreshPage = () => {
    window.location.reload();
  }

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
          <ListItemButton onClick={() => logOut()}
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
          <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Welcome back, <Typography component="span" fontSize={30} fontWeight={300}> {userName}</Typography></Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
          <br></br>

        </Container>

        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>

          <Container sx={{ marginLeft: 3, width: "60%", maxHeight: "25%", backgroundColor: "grey.300" }}>
            <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>All Certifications</Typography>
            <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
            <br />

            <Box sx={{ display: "inline-flex", flexDirection: 'row', width: "32%" }}>
              {isLoading ? <CircularProgress size={40} sx={{ margin: "auto" }} /> : getGraphs()}
            </Box>

          </Container>

          <Container sx={{ marginLeft: 3, width: "40%", maxHeight: "25%", backgroundColor: "grey.300" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontSize={30} fontWeight={600} sx={{ mt: 2 }}> Certifications
                <Typography component="span" fontSize={20} fontWeight={300} sx={{ verticalAlign: 'center' }}> by Department</Typography>
              </Typography>
            </Box>

            <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
            <br />

            <Box sx={{ width: "100%", height: "65%", display: 'flex', justifyContent: 'center', }}>
              {isLoading ? <CircularProgress size={40} sx={{ mt: 0 }} /> : getCertsbyDpt()}
            </Box>

          </Container>
        </Box>

        <br />

        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Container sx={{ marginLeft: 3, width: "60%", backgroundColor: "grey.300" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontSize={30} fontWeight={600} sx={{ mt: 1 }}> Upload
                <Typography component="span" fontSize={20} fontWeight={300} sx={{ verticalAlign: 'center' }}> Certifications</Typography>
              </Typography>
            </Box>

            <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: "#0F62FE", mt: 1, marginLeft: 0 }}></Box>
            <br />

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography fontWeight={600} > Upload files </Typography>
                <Typography sx={{ mb: 1 }}>Max file size is 500kb. Supported file types are .xlsx and .csv.</Typography>
              </Box>
              <input
                type="file"
                accept=".xlsx, .xls"
                style={{ display: 'none' }}
                id="contained-button-file"
              /*  onChange={e => handleFile(e)} */
              />
              <label htmlFor="contained-button-file">
                {/* <Button variant="contained" component="span"
                    style={{
                      backgroundColor: "#000000",
                      padding: "18px 36px"
                    }}
                    endIcon={<CloudUploadRoundedIcon />}>
                    Upload
                  </Button> */}
              </label>

            </Box>
            {/* <input
                type="file"
                accept=".xlsx, .xls, .csv"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={e => saveFile(e)}
                // onChange={e => handleFile(e)}
               
              /> */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              {fileSelected && (
                <Typography
                  variant="body2"
                  fontSize={14}
                  fontWeight={400}
                  style={{ marginLeft: 'auto' }}
                >
                  Selected file: {fileName2}
                </Typography>
              )}

            </Box>

            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              style={{ display: 'none' }}
              id="contained-button-file"
              onChange={e => saveFile(e)}
            // onChange={e => handleFile(e)}

            />
            <input id="select-button" type="file" onChange={saveFile} accept=".csv, .xlsx" style={{ display: 'none' }} />
            <Tooltip title="Select a file to be uploaded">
              <label htmlFor="select-button">
                <Button variant="contained" component="span"
                  style={{
                    backgroundColor: "#000000",
                    padding: "18px 36px"
                  }}
                  sx={{ mr: 1, mb: 1 }}
                  //  onClick={uploadFile}
                  endIcon={<FileOpenRoundedIcon />}>
                  Select
                </Button>
              </label>
            </Tooltip>
            <Tooltip title={fileSelected ? `Click to upload file: ${fileName2}` : "Select a file"}>
              <Button
                variant="contained"
                component="span"
                style={{
                  backgroundColor: fileSelected ? "#000000" : "#888888",
                  padding: "18px 36px",
                }}
                onClick={uploadFile}
                endIcon={<CloudUploadRoundedIcon />}
                disabled={!fileSelected}
                sx={{ mb: 1 }}
              >
                Upload
              </Button>

            </Tooltip>

            <br />

          </Container>

          <Paper elevation={12} sx={{ marginLeft: 3, width: "40%", backgroundColor: "grey.300" }}>
            <Typography sx={{ mt: 2, ml: 2 }} fontSize={25} fontWeight={600}>Pending Certifications</Typography>
            <Box display="flex-start" sx={{ height: 10, width: 0.55, backgroundColor: "#0F62FE", mt: 1, marginLeft: 2, mb: 1 }}></Box>
            <Stack direction="column" spacing={0.5} alignItems={"center"}>
              <Stack direction="row" alignSelf={"center"} spacing={1.5}>
                <Typography fontSize={60} fontWeight={600} color="#34B53A" sx={{ml: 1, mr: 1, mt: 0}}>{pendingCerts}</Typography>
                <Stack direction="column" sx={{ mt: 2 }}>
                  <Typography fontSize={26}>Pending</Typography>
                  <Typography fontSize={26}>Certifications</Typography>
                </Stack>
              </Stack>
              <Button href="/Certifications" variant="contained" sx={{ bgcolor: "black" }} endIcon={<NavigateNextIcon />}>Review</Button>
            </Stack>
          </Paper>
        </Box>

      </Box>
      <br /> <br /> <br />
    </Box>

  );
}
