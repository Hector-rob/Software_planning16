import * as React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import * as XLSX from "xlsx";
import { useState, useRef } from 'react';
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

  const inputRef = useRef(null);

  const [fileName, setFileName] = useState(null);
  const [allData, setData] = useState("");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const menuIcons = [<HomeIcon />, <PeopleIcon />, <WorkspacePremiumIcon />];
  const menuRefs = ["/MainPage", "/Database", "/Certifications"];
  const rowHeaders = ["ID", "Department", "Location", "Certification Name", "Date", "Type"];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

    setData(jsonData);

    console.log("esto", jsonData[0]);

    e.target.value = null;

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
      <Box component="main" sx={{ flexGrow: 1, }}>
        <DrawerHeader />
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <Typography fontSize={30} fontWeight={600} >Employees Database</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.3, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
          <br></br>
          <br></br>

          <Grid
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: '100%' }}
          >
            <Stack direction="row" spacing={3} sx={{ width: "100%", boxSizing: 'border-box' }}>

              <TextField id="standard-basic" label="Search" variant="standard" sx={{ width: "100%" }} />

              <input
                type="file"
                accept=".xlsx, .xls"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={e => handleFile(e)}
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


              <Button variant="contained" component="span"
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
                {/* <div>espera un poquis a que cargue</div> */}
              </React.Fragment>
            )}


            {allData &&

              <React.Fragment>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        {allData[0].map(
                          (h: any, index) => <StyledTableCell key={h}> <Typography variant="h6"><strong>{rowHeaders[index]}</strong></Typography>  </StyledTableCell>
                        )}
                        <StyledTableCell> </StyledTableCell>

                      </TableRow>

                    </TableHead>

                    <TableBody>
                      {allData.slice(1).map((row: any, rowIndex: any) => (
                        <StyledTableRow>
                          {row.map((c: any) => (
                            <StyledTableCell key={c}>
                              <Typography variant="subtitle1">{c}</Typography>
                            </StyledTableCell>
                          ))}
                          <StyledTableCell>
                            <Button href="/Employee" onClick={() => { console.log(allData.slice(1)[rowIndex][0]) }}>
                              <NavigateNextIcon />
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                      )}

                    </TableBody>

                  </Table>
                </TableContainer>
              </React.Fragment>

            }


          </div>

          <br></br>

        </Container>
      </Box>
    </Box>
  );
}