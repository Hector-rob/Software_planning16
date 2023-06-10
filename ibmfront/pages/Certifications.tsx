import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useRef, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TextField, Box, Grid, Modal } from '@mui/material';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import Axios from "axios";
import TablePagination from '@mui/material/TablePagination';
import Cookies from "js-cookie";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


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

  const [pendingCertificationsList, setPendingCertificationsList] = useState([]);

  const [certificationUid, setCertificationUid] = useState("");
  const [certificationuid, setCertificationuid] = useState("");
  const [certificationDepartment, setCertificationDepartment] = useState("");
  const [certificationLocation, setCertificationLocation] = useState("");
  const [certificationName, setCertificationName] = useState("");
  const [certificationDate, setCertificationDate] = useState("");
  const [certificationType, setCertificationType] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
  const [showDeclineAlert, setShowDeclinesAlert] = useState(false); 
  const [message_, setMessage] = useState("");
  const [messageUid, setMessageUid] = useState("");





  //   const submitPendingCertification = () => {
  //     Axios.post("http://localhost:5000/certification", {
  //         uid: certificationUid,
  //         department: certificationDepartment,
  //         work_location: certificationLocation,
  //         certification_name: certificationName,
  //         issue_date: certificationDate,
  //         type: certificationType
  //     }).then(() => {
  //         window.alert("Register was succesful");

  //     })
  // };

  const submitPendingCertification = (row) => {
    Axios.post("http://localhost:5000/certification", {
      uid: row[0],
      department: row[1],
      work_location: row[2],
      certification_name: row[3],
      issue_date: row[4],
      type: row[5]
    }).then(() => {
      //window.alert("The certification was accepted");
      setShowSuccessAlert(true);
      deletePendingCertification(row[0]);
    })
  };

  // const deletePendingCertification = async (_uid) => {
  //   const params = {
  //     uid: _uid
  //   };
  //   Axios.delete("http://localhost:5000/pendingCertification/:uid", { params }
  //     // params: {
  //     //   uid: certificationUid
  //     // }
  //   ).then(() => {
  //      console.log(params);
  //       window.alert("Deletion was succesful");

  //   })
  // };

  const deletePendingCertification = async (uid) => {
    try {
      const response = await Axios.delete(`http://localhost:5000/pendingCertification/${uid}`);
      if (response.data.acknowledged && response.data.deletedCount === 0) {
        console.log('No record found with the specified uid.');
      } else {
        console.log('Record deleted successfully.');
        setShowDeclinesAlert(true);

        refreshPage()
      }
    } catch (error) {
      console.error(error);
    }
  };

    const sendMessage = () => {
      console.log(messageUid);
      console.log(message_);
      Axios.post("http://localhost:5000/send-message", {
          uid: messageUid,
          message: message_,
          
      }).then(() => {
          window.alert("Message Created");

      })
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/exportPendingCertifications").then((response) => {
      console.log(response.data);
      setPendingCertificationsList(response.data);
    });

  }, []);

  console.log(pendingCertificationsList);
  //luego tenemos que cambiar esto por info real
  /*   const data = [["name", "department", "certification_name", "type"],
    ["persona1", "Department", "Certification Name", "badge"],
    ["persona2", "Department", "Certification Name", "badge"],
    ["persona2", "Department", "Certification Name", "badge"],
    ["persona2", "Department", "Certification Name", "external certification"]] */

  const data = pendingCertificationsList.map((val) => [
    val.uid,
    val.department,
    val.work_location,
    val.certification_name,
    val.issue_date,
    val.type,
  ]);

  console.log("data", data);


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [acceptOpen, setAcceptOpen] = React.useState(false);

  const menuIcons = [<HomeIcon />, <PeopleIcon />, <WorkspacePremiumIcon />];
  const menuRefs = ["/MainPage", "/Database", "/Certifications"];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); //number of rows per page

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleModalOpen = (uid) => {
    setModalOpen(true);
    const certificationu = uid;
    setCertificationuid(uid);
    // deletePendingCertification(certificationuid);

  }

  const handleModalOpen2 = (uid) => {
    setAcceptOpen(true);
    const certificationu = uid;
    setCertificationuid(uid);
    // deletePendingCertification(certificationuid);

  }

  const logOut = () => {
    window.localStorage.clear();
    Cookies.remove("loggedin");

    window.location.href = "./Login";
  };

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const handleMessageOpen = (uid) => {
    setMessageUid(uid);

    setCommentOpen(true);
  }

  const handleMessageClose = () => {
    setCommentOpen(false);
  }

  const handleAcceptOpen = () => {
    setAcceptOpen(false);
  }

  const handleAcceptClose = () => {
    setAcceptOpen(false);
  }

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    const certificationData = {
      uid: certificationUid,
      department: certificationDepartment,
      work_location: certificationLocation,
      certification_name: certificationName,
      issue_date: certificationDate,
      type: certificationType
    };

    console.log(certificationData); // Log the certificationData object to the console
  }, [certificationUid, certificationDepartment, certificationLocation, certificationName, certificationDate, certificationType]);

  const handleClick = (row) => {
    setCertificationUid(row[0]);
    setCertificationDepartment(row[1]);
    setCertificationLocation(row[2]);
    setCertificationName(row[3]);
    setCertificationDate(row[4]);
    setCertificationType(row[5]);


    // console.log(certificationData); // Log the certificationData object to the console

    submitPendingCertification(row);
    deletePendingCertification(row[0]);

    //submitPendingCertification();
  }

  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = data.slice(indexOfFirstRow, indexOfLastRow);

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

      {showSuccessAlert && !showDeclineAlert && (
        <Box position="absolute" top={60} right={20} sx={{width: 300}}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
             Certification Accepted
          </Alert>
        </Box>
      )}

      {showDeclineAlert && !showSuccessAlert && (
        <Box position="absolute" top={60} right={20} sx={{width: 300}}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Certification Declined
          </Alert>
        </Box>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <br />
          <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Pending Certifications</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.3, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>

          <br></br>
          <br></br>
          {/*        {pendingCertificationsList.map((val)=> {
         return <div> <h3> UID: {val.uid} | Department: {val.department} | Work Location : {val.work_location} | Certification Name : {val.certification_name} | Issue Date: {val.issue_date} | Type: {val.type} </h3>
         </div>
       })} */}

          <React.Fragment>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead></TableHead>
                <TableBody>
                  {paginatedData.map((row: any) => (
                    <StyledTableRow key={row[0]}>
                      <StyledTableCell width={"10%"} align="center">
                        <AccountCircleRoundedIcon sx={{ fontSize: 100 }}></AccountCircleRoundedIcon>
                      </StyledTableCell>
                      <StyledTableCell width={"12%"} align="center">
                        <Typography variant="subtitle1" fontWeight={'bold'}> {row[0]} </Typography>
                        <Typography variant="subtitle1" >{row[1]}  </Typography>

                      </StyledTableCell>
                      <StyledTableCell width={"20%"} align="center">
                        <Typography variant="subtitle1" style={{ color: '#0F62FE' }}>
                          {row[3]}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"15%"} align="center">
                        <img src={row[5] == "badge" ? "./Assets/images/IBMblue.png" : "./Assets/images/ExternalCert.png"} alt="Logo" width={120} ></img>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Grid
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Stack direction="row" spacing={4} sx={{ ml: 10, boxSizing: 'border-box' }}>
                            {/* <Button variant="contained" component="span"
                              style={{
                                backgroundColor: "#198038",
                                padding: "9px 18px",
                              }}
                              onClick={() => {
                                handleClick(row);
                                // setCertificationUid(row[0]);
                                // setCertificationDepartment(row[1]);
                                // setCertificationLocation(row[2]);
                                // setCertificationName(row[3]);
                                // setCertificationDate(row[4]);
                                // setCertificationType(row[5]);
                                // console.log(certificationUid);
                                // console.log(certificationDepartment);
                                // console.log(certificationLocation);
                                // console.log(certificationName);
                                // console.log(certificationDate);
                                // console.log(certificationType);

                                //submitPendingCertification();
                                //deletePendingCertification(row[0]);

                              }}
                              // onClick={submitPendingCertification()}

                              endIcon={<CheckRoundedIcon />}>
                              Accept
                            </Button> */}

                            <Button variant="contained" component="span"
                              style={{
                                backgroundColor: "#198038",
                                padding: "9px 18px"
                              }}
                              endIcon={<CheckRoundedIcon />}
                              onClick={() => {
                                handleModalOpen2(row[0]);
                              }}>
                              Accept
                            </Button>
                            <Modal open={acceptOpen} onClose={handleAcceptClose} sx={{ backgroundColor: "none", opacity: 0.6, backdropFilter: "blur(1px)" }}>
                              <Box sx={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white', border: '2px solid #000',
                                boxShadow: 24, p: 2, borderRadius: 2
                              }}>
                                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ mb: 1 }}>
                                  <IconButton color={"error"} onClick={handleAcceptClose} children={<CloseIcon />} />
                                </Box>
                                <Typography variant="h6" fontWeight={700} align={"center"}>
                                  Are you sure you want to accept the certification?
                                </Typography>
                                <Typography align={"center"} sx={{ mt: 2 }} color={"error"} fontWeight={700}>
                                  This cannot be undone.
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                  <Button variant="contained" sx={{ width: "50%" }} color={"primary"} onClick={handleAcceptClose} startIcon={<ArrowBackIcon />}><Typography>Cancel</Typography></Button>
                                  <Button variant="contained" style={{ backgroundColor: "#198038"}} sx={{ width: "50%" }} 
                                    onClick={() => {
                                      handleClick(row);
                                    }} endIcon={<CheckRoundedIcon />}><Typography fontWeight={700}>Accept</Typography></Button>
                                </Stack>
                              </Box>
                            </Modal>



                               

                            <Button variant="contained" component="span"
                              style={{
                                backgroundColor: "#DA1E28",
                                padding: "9px 18px"
                              }}
                              endIcon={<ClearRoundedIcon />}
                              onClick={() => {
                                handleModalOpen(row[0]);

                              }}>
                              Decline
                            </Button>
                            <Modal open={modalOpen} onClose={handleModalClose} sx={{ backgroundColor: "none", opacity: 0.6, backdropFilter: "blur(1px)" }}>
                              <Box sx={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white', border: '2px solid #000',
                                boxShadow: 24, p: 2, borderRadius: 2
                              }}>
                                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ mb: 1 }}>
                                  <IconButton color={"error"} onClick={handleModalClose} children={<CloseIcon />} />
                                </Box>
                                <Typography variant="h6" fontWeight={700} align={"center"}>
                                  Are you sure you want to decline the certification?
                                </Typography>
                                <Typography align={"center"} sx={{ mt: 2 }} color={"error"} fontWeight={700}>
                                  This cannot be undone.
                                </Typography>
                                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                  <Button variant="contained" sx={{ width: "50%" }} color={"primary"} onClick={handleModalClose} startIcon={<ArrowBackIcon />}><Typography>Cancel</Typography></Button>
                                  <Button variant="contained" sx={{ width: "50%" }} color={"error"}
                                    onClick={() => {
                                      //setCertificationUid(row[0]);
                                      console.log(certificationuid);
                                      deletePendingCertification(certificationuid);
                                    }} endIcon={<ClearRoundedIcon />}><Typography fontWeight={700}>Decline</Typography></Button>
                                </Stack>
                              </Box>
                            </Modal>

                            <Button variant="contained"
                              style={{
                                backgroundColor: "#0F62FE",
                                padding: "9px 18px"
                              }}
                              onClick={() => {
                                handleMessageOpen(row[0])}}
                              endIcon={<SendRoundedIcon />}>
                              Send comment
                            </Button>
                            <Modal open={commentOpen} onClose={handleMessageClose} sx={{ backgroundColor: "none", opacity: 1, backdropFilter: "blur(1px)" }}>
                              <Box sx={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', border: '2px solid #000',
                                boxShadow: 24, p: 2, borderRadius: 2
                              }}>
                                <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                  <IconButton color={"error"} onClick={handleMessageClose} children={<CloseIcon />} />
                                </Box>
                                <Stack direction="column" spacing={2}>
                                  <Typography fontSize={14}>Send Message</Typography>
                                  <Typography fontSize={24} fontWeight={600}> Custom Message</Typography>
                                  <Typography fontSize={14} >Message will be sent to: {message</Typography>
                                </Stack>
                                <TextField minRows={3} label="Message" defaultValue={""} variant="filled" onChange={(e) => { setMessage(e.target.value)}}multiline sx={{ mt: 3, mb: 3, width: "100%" }} />
                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                  <Button variant="contained" sx={{ width: "50%" }} color={"error"} onClick={handleMessageClose} startIcon={<ArrowBackIcon />}><Typography>Cancel</Typography></Button>
                                  <Button variant="contained" sx={{ width: "50%" }} color={"primary"} onClick={() => {sendMessage()}} endIcon={<SendRoundedIcon />}><Typography fontWeight={700}>Send</Typography></Button>

                                </Stack>
                              </Box>
                            </Modal>

                          </Stack>
                        </Grid>

                      </StyledTableCell>
                    </StyledTableRow>
                  )
                  )}

                </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.length}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </React.Fragment>
        </Container>
      </Box>
    </Box>
  );
}