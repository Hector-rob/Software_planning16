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

export default function Employee() {
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
        <Box sx={{ display: 'flex', width:"100%", height:"100%", position:"absolute"}}>
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
            <Box component="main" sx={{ width: "100%"}} bgcolor={"#F2F2F2"} >
            <Container maxWidth={false} sx={{ mt: -5 }}>
                    <DrawerHeader />
                    <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon />} href="/Database">
                        Back
                    </Button>
                    <Stack justifyContent="center" alignItems="center">
                        <AccountCircleRoundedIcon sx={{ fontSize: 150 }} />
                        <Typography fontSize={35} fontWeight={700}>Employee Name</Typography>
                        <Box display="flex-start" sx={{ height: 10, width: 0.25, backgroundColor: "#0F62FE", mt: 1 }}></Box>
                    </Stack>
                    <Grid container columnSpacing={3} sx={{ mb: 2, mt: 5, height: "100%" }} >
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Grid container spacing={2} sx={{ height: "100%" }}>
                                <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 3, mb:3}} spacing={2}>
                                                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem color="#0F62FE" sx={{ width: 7, height: 30 }} />}>
                                                    <Typography fontSize={25} fontWeight={700}>Position</Typography>
                                                    <Typography fontSize={25}>Department</Typography>
                                                </Stack>
                                                <Typography component='div' fontSize={24}>Joined: MM/DD/YYYY</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                <Typography component='div' fontSize={50} fontWeight={800} color={"#0F62FE"}>XX</Typography>
                                                <Typography component='div' fontSize={20}>Certifications</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <Box display="flex" sx={{ width: "100%" }}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                <Typography component='div' fontSize={50} fontWeight={800} color={"#198038"}>XX</Typography>
                                                <Typography component='div' fontSize={20}>Projects</Typography>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <Box display="flex" sx={{ width: "100%", height:"400%"}}>
                                        <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                            <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                                <Typography component='div' fontSize={24}><Box fontWeight={700} display='inline'>Skills</Box> & Areas of Opportunity</Typography>
                                                <Box display="flex-start" sx={{ height: 7, width: 0.5, backgroundColor: "#0F62FE", mt: 1 }}></Box>
                                            </Stack>
                                        </Container>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Box display="flex" sx={{ width: "100%", height:"190%"}}>
                                <Container sx={{ borderRadius: 2, backgroundColor: "white" }}>
                                    <Stack justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                        <Typography component='div' fontSize={30}>Certification <Box fontWeight={700} display='inline'>History</Box></Typography>
                                        <Box display="flex-start" sx={{ height: 7, width: 0.45, backgroundColor: "#0F62FE", mt: 1 }}></Box>
                                    </Stack>
                                </Container>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box >
    );
}
