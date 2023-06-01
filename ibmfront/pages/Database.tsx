import * as React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import * as XLSX from "xlsx";
import { useState, useRef, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
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
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Axios from "axios";
import exportFromJSON from "export-from-json";
import Papa from 'papaparse';
import TablePagination from '@mui/material/TablePagination';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import Tooltip from '@mui/material/Tooltip';
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";

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


export default function Database(props: any) {
  const [certificationsList, setCertificationsList] = useState([]);
  const [certificationsDoc, setCertificationsDoc] = useState([]);
  var [csvData, setCsvData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); //number of rows per page

  const [file2, setFile2] = useState();
  const [fileName2, setFileName2] = useState("");

  const [fileSelected, setFileSelected] = useState(false);

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
        "http://localhost:5000/importCertifications",
        formData
      );
      console.log(res);
      console.log("gg");
      refreshPage();

    } catch (ex) {
      console.log(ex);
      console.log("error");
    }
  };



  useEffect(() => {
    Axios.get("http://localhost:5000/certification").then((response) => {
      console.log(response.data);
      setCertificationsList(response.data);
      setFilteredData(response.data);
      setLoading(false);
    });

  }, []);

  //console.log(certificationsList);

  const inputRef = useRef(null);

  const [fileName, setFileName] = useState(null);
  const [allData, setData] = useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuIcons = [<HomeIcon />, <PeopleIcon />, <WorkspacePremiumIcon />];
  const menuRefs = ["/MainPage", "/Database", "/Certifications"];
  const rowHeaders = ["ID", "Department", "Location", "Certification Name", "Date", "Type"];
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = React.useState(true);



  // const exportCertifications = async () => {
  //     const response = await fetch('http://localhost:5000/exportCertifications');
  //     const body = await response.json();

  //     if (response.status !== 200) {
  //       console.error("a");
  //       throw Error(body.message) 
  //     }
  //     console.log(response);
  //     // fetch('http://localhost:5000/exportCertifications')
  //     // .then((res) => res.json())
  //     // .then((response) => {
  //     //   const filename = "certifications";
  //     //   const exportType = exportFromJSON.types.csv;
  //     //   exportFromJSON({data: response.todos, fileName, exportType});
  //     // });



  //     return body;

  //   };

  const exportCertifications = async () => {
    // const response = await fetch('http://localhost:5000/exportCertifications')
    Axios.get("http://localhost:5000/exportCertifications")
      .then(response => {
        // Convert data to CSV format
        const csvData = Papa.unparse(response.data);
        setCsvData(csvData)
        exportData(csvData, 'certifications.csv', 'text/csv;charset=utf-8;');

         
      })
      .catch(error => {

        // Handle errors
        console.error(error);
      });
  }

  const exportData = (data, fileName, type) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  }


  const handleFile = async (e: any) => {

    const fileInput = inputRef.current;

    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();

    //todo el archivo
    //const workbook = XLSX.read(data);

    //primeras 10 filas
    const workbook = XLSX.read(data, { sheetRows: 50 });

    //esto da la primera página del excel
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    //leer como json
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      defval: "-",
      header: 1
    });

    setData(certificationsList);

    console.log("esto", jsonData[0]);

    e.target.value = null;

  }

  const logOut = () => {
    window.localStorage.clear();
    Cookies.remove("loggedin");
    window.location.href = "./Login";
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const filtered = certificationsList.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  //const filteredAndPaginatedData = filteredData.slice(0, 20); // Get the first 20 rows

  const indexOfLastRow = (page + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

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
      <Box component="main" sx={{ flexGrow: 1, }}>
        <DrawerHeader />
        <Container maxWidth={false} sx={{ width: "100%" }}>

          <Typography fontSize={30} fontWeight={600} >Employees Database</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.3, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
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
          <br></br>

          <Grid
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" spacing={3} sx={{ width: "100%", boxSizing: 'border-box' }}>

              <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: "100%" }}
                value={searchValue}
                onChange={handleSearchChange} />

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

                    //  onClick={uploadFile}
                    endIcon={<FileOpenRoundedIcon />}>
                    Select
                  </Button>
                </label>
              </Tooltip>
              {/* <button onClick={uploadFile}>Upload</button> */}


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
                >
                  Upload
                </Button>

              </Tooltip>



              <Button variant="contained" component="span"
                onClick={exportCertifications}
                style={{
                  backgroundColor: "#000000",
                  padding: "18px 36px"
                }}

                endIcon={<CloudDownloadRoundedIcon />}>
                Export
              </Button>


              <Button variant="contained" component="span"
                style={{
                  backgroundColor: "#000000",
                  padding: "18px 36px"
                }}

                endIcon={<EditRoundedIcon />}>
                Edit
              </Button>

            </Stack>
          </Grid>

          <br></br>

          <div className='center'>
            {fileName && (
              <React.Fragment>
                <Typography component='div' variant="h5" align="center" sx={{ mb: 3, mt: 2 }}><Box fontWeight={600} display='inline'>File Name:</Box> <span>{fileName}</span></Typography>
              </React.Fragment>
            )}

            {/* {certificationsList.map((val)=> {
            return <div> 
              <h3> UID: {val.uid} | Department: {val.department} | Work Location : {val.work_location} | Certification Name : {val.certification_name} | Issue Date: {val.issue_date} | Type: {val.type} </h3>
          </div>
          })} */}

            <React.Fragment>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      {rowHeaders.map(
                        (h: any, index) => <StyledTableCell key={h}> <Typography variant="h6"><strong>{rowHeaders[index]}</strong></Typography>  </StyledTableCell>
                      )}
                      <StyledTableCell> </StyledTableCell>

                    </TableRow>

                  </TableHead>

                  <TableBody>
                    {paginatedData.map((row: any, rowIndex: any) => (
                      <StyledTableRow key={rowIndex}>
                        {Object.values(row).slice(1, -1).map((cell: any, cellIndex: any) => (
                          <StyledTableCell key={cellIndex}>
                            <Typography variant="subtitle1">{cell}</Typography>
                          </StyledTableCell>
                        ))}
                        <StyledTableCell>
                          {
                            <Link href={{
                              pathname: "/Employee",
                              query: { id: Object.values(row).slice(1, -1)[0] as String }
                            }} passHref>
                              <Button>
                                <NavigateNextIcon />
                              </Button>
                            </Link>}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>

                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />

            </React.Fragment>

          </div>
          <br></br>
        </Container>
      </Box>
    </Box>
  );
}