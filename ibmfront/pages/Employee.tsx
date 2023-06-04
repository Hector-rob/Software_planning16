import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button'
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
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import recommendationsData from '../public/Assets/recommendations.json';


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

export default function Employee(props: any) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [employeeInfo, setEmployeeData] = useState([]);
    const [employeeCertifications, setEmployeeCertifications] = useState([]);
    const [isLoading, setLoading] = React.useState(true);

    //const Skills = ["Design Thinking", "Supply Chain Management", "Blockchain", "Agile", "Public Speaking", "Cloud", "DevOps", "Scrum", "Project Management", "Automation", "AI & Data Science", "Cybersecurity"];

    const router = useRouter();

    const menuIcons = [<HomeIcon />, <PeopleIcon />, <WorkspacePremiumIcon />];
    const menuRefs = ["/MainPage", "/Database", "/Certifications"];

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function getCertificationType(val: any) {
        if (val == "badge") {
            return <React.Fragment>
                <BusinessIcon sx={{ ml: 1 }} />
            </React.Fragment>
        }
        if (val == "external certification") {
            return <React.Fragment>
                <MilitaryTechIcon sx={{ ml: 1 }} />
            </React.Fragment>
        }

    }

    const logOut = () => {
        window.localStorage.clear();
        Cookies.remove("loggedin");
        window.location.href = "./Login";
    };

    const employeeId = router.query.id; //Get respective EmployeeID retreived from the Database
    //console.log(employeeId)

    useEffect(() => {
        Axios.get("http://localhost:5000/employeeInfo").then((response) => {
            //console.log(response.data);
            setEmployeeData(response.data.find(x => x.uid === employeeId));
        });
        Axios.get("http://localhost:5000/certification").then((response) => {
            //console.log(response.data.filter(x => x.uid === employeeId));
            setEmployeeCertifications(response.data.filter(x => x.uid === employeeId));
            setLoading(false);
        });

    }, []);

    if (isLoading) {
        return <React.Fragment>
            <Container maxWidth="true">
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 20,
                }}>
                    <Typography fontSize={35} fontWeight={700}>Loading</Typography>
                    <CircularProgress size={50} sx={{ mt: 3 }} />
                </Box>
            </Container>
        </React.Fragment>
    }

    const employeeDpt = employeeCertifications[0].department;
    const employeeCerts = employeeCertifications.length;
    const employeeLocation = employeeCertifications[0].work_location;

    //const employeeID = employeeInfo.find(x => x.email === userEmail).uid;
    console.log("empleado info", employeeInfo);
    //const employeeCertifications = certifications.filter(x => x.uid === employeeID);

    console.log("certificaciones empleado", employeeCertifications);

    //Skills
    const natural = require('natural');

    const prepareDocumentsData = (jsonData) => {
        return jsonData.data.map((item) => {
          const skills = item.skills.map((skill) => skill.name);
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            skills: skills,
            content: `${item.name} ${item.description} ${skills.join(" ")}`,
            
          };
        });
    };

    const prepareEmployeeCertificationsData = (certifications) => {
        return certifications.map((certification) => {
          return {
            id: certification.id,
            content: certification.certification_name,
          };
        });
    };

    const documentsPrepared = prepareDocumentsData(recommendationsData);

  const employeeCertificationsPrepared = prepareEmployeeCertificationsData(employeeCertifications);

  // Create a TF-IDF vectorizer
  const tfidf = new natural.TfIdf();

  // Add documents to the TF-IDF vectorizer
  documentsPrepared.forEach((document) => {
    tfidf.addDocument(document.content);
  });

  // Train the TF-IDF vectorizer
  tfidf.tfidfs(documentsPrepared.map((doc) => doc.content));

  // Calculate similarities
  const similarDocuments = employeeCertificationsPrepared.map((certification) => {
    const similarities = documentsPrepared.map((document, index) => {
      const certificationContent = certification.content ? certification.content.toString() : '';
      const similarity = tfidf.tfidf(certificationContent, index) || 0;
      return {
        id: document.id,
        name: document.name,
        description: document.description,
        global_activity_url: document.global_activity_url,
        image_url: document.image_url,
        skills: document.skills,
        similarity,
      };
    });

    // Sort the similarities by similarity score in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    const Skills = [];
    for (const recommendation of similarities) {
        if (recommendation.similarity > 0) {
        Skills.push(...recommendation.skills);
        }
    }

    return { certificationId: certification.id, recommendations: similarities, Skills };
  });

  console.log("similares", similarDocuments[0]);


    return (
        <Box sx={{ display: 'flex', width: "100%", position: "absolute" }}>
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
            <Box component="main" sx={{ width: "100%" }} bgcolor={"#F2F2F2"} >
                <Container maxWidth={false} sx={{ mt: -5 }}>
                    <DrawerHeader />
                    <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} href="/Database">
                        Back
                    </Button>
                    <Stack justifyContent="center" alignItems="center">
                        <AccountCircleRoundedIcon sx={{ fontSize: 150 }} />
                        <Typography fontSize={35} fontWeight={700}>{employeeInfo.name + " " + employeeInfo.last_name}</Typography>
                        <Stack direction={"row"} sx={{ mt: 0.5 }}>
                            <EmailIcon sx={{ mr: 1 }} /><Typography fontSize={16}>{employeeInfo.email}</Typography>
                            <LocationOnIcon sx={{ ml: 1, mr: 0.5 }} /><Typography fontSize={16}>{employeeLocation}</Typography>
                        </Stack>
                        <Box display="flex-start" sx={{ height: 10, width: 0.325, backgroundColor: "#0F62FE", mt: 1 }}></Box>
                    </Stack>
                    <Grid container columnSpacing={3} sx={{ mb: 2, mt: 4, height: "100%" }} >
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Grid container spacing={2} sx={{ height: "50%" }}>
                                <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 3, mb: 3 }} spacing={1}>
                                                <Typography align="center" component='div' fontSize={20}><Box fontWeight={700} display='inline'>{employeeInfo.uid}</Box> | {employeeDpt}</Typography>
                                                <Typography component='div' fontSize={20}><Box fontWeight={700} display='inline'>Joined on</Box> {employeeInfo.join_date}</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                <Typography component='div' fontSize={50} fontWeight={800} color={"#0F62FE"}>{employeeCerts}</Typography>
                                                <Typography component='div' fontSize={20}>Certifications</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                <Typography component='div' fontSize={50} fontWeight={800} color={"#198038"}>{employeeInfo.projects}</Typography>
                                                <Typography component='div' fontSize={20}>Projects</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Box display="flex" sx={{ width: "300%", minHeight: 240 }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2 }}>
                                                <Typography component='div' fontSize={24}><Box fontWeight={700} display='inline'>Skills</Box> & Areas of Opportunity</Typography>
                                                <Box display="flex-start" sx={{ height: 7, width: 0.5, backgroundColor: "#0F62FE", mt: 1 }}></Box>
                                            </Stack>
                                            {similarDocuments[0].Skills.slice(0,13).map((element, index) => {
                                                if (index % 2 == 0) {
                                                    return <React.Fragment>
                                                        <Chip icon={<StarIcon sx={{fill:"#FFD400"}}/>} label={element} sx={{ backgroundColor: "#34B53A", mr: 2, mb: 2 }}>
                                                        </Chip>
                                                    </React.Fragment>
                                                }
                                                else {
                                                    return <React.Fragment>
                                                        <Chip label={element} sx={{ backgroundColor: "#FFB200", mr: 2, mb: 2 }}>
                                                        </Chip>
                                                    </React.Fragment>
                                                }

                                            })}
                                        </Container>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Box display="flex" sx={{ width: "100%", minHeight: 280, maxHeight: 450 }}>
                                <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                    <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                        <Typography component='div' fontSize={30}>Certification <Box fontWeight={700} display='inline'>History</Box></Typography>
                                        <Box display="flex-start" sx={{ height: 7, width: 0.45, backgroundColor: "#0F62FE", mt: 1, mb: 3 }}></Box>
                                    </Stack>
                                    <List sx={{ overflow: 'auto', maxHeight: '70%' }}>
                                        {employeeCertifications.map((val, index) => {
                                            if (index % 2 == 0) {
                                                return <ListItem sx={{ mb: 0.5 }}>
                                                    <Paper elevation={6}>
                                                        <Typography fontSize={16} sx={{ ml: 1, mr: 1 }}>{"●\t" + val.certification_name}</Typography>
                                                    </Paper>
                                                    {getCertificationType(val.type)}
                                                    <VerifiedIcon sx={{ ml: 1, color: "#198038" }} />
                                                </ListItem>
                                            }
                                            else {
                                                return <ListItem sx={{ mb: 0.5 }}>
                                                    <Paper elevation={6} sx={{ backgroundColor: "#0F62FE" }}>
                                                        <Typography fontSize={16} color={"white"} sx={{ ml: 1, mr: 1 }}>{"●\t" + val.certification_name}</Typography>
                                                    </Paper>
                                                    {getCertificationType(val.type)}
                                                    <VerifiedIcon sx={{ ml: 1, color: "#198038" }} />
                                                </ListItem>
                                            }
                                        })}
                                    </List>
                                </Container>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
