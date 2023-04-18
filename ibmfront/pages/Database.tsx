import * as React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import * as XLSX from "xlsx";
import { useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

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

export default function Database(props) {
  const [fileName, setFileName] = useState(null);
  const [allData, setData] = useState("");
  
  const handleFile = async (e:any) =>{
    
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    //esto da la primera página del excel
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    //convierte a array de arrays
    /* const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval:"",
    }); */

    //leer como json
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      //blankrows: "",
      header: 1});

    setData(jsonData);

    console.log("esto", jsonData[0]);
  }

    return( 
        <>
                
        <Container>
        <br />

        <Typography variant="h3" align="center">Employee's Database</Typography>
        <br></br>

        <div className='center'>
        <Input type="file"  inputProps={{accept: '.xlsx,.xls'}} onChange={e => handleFile(e)}></Input>
        </div>


        <Grid
          item
          sx={{
            height: 100,
            width: '1000%',
            maxWidth: 'md'
            }}
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <br></br>

            <Stack direction="row" spacing={2}>

            <Grid
          item
          
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <TextField id="standard-basic" label="Search" variant="standard" fullWidth />

        </Grid>
            
              <Button variant="contained" size="large" 
                style={{
                  backgroundColor: "#000000",
                  padding: "18px 36px"
                }}
                
                endIcon={<CloudUploadRoundedIcon />}>
                Import      
              </Button>

              <Button variant="contained" size="large" 
                style={{
                  backgroundColor: "#000000",
                  padding: "18px 36px"
                }}
                
                endIcon={<CloudDownloadRoundedIcon />}>
                Export      
              </Button>

              <Button variant="contained" size="large" 
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
        <Typography variant="h4" align="center">File Name: <span>{fileName}</span></Typography>
        <div>espera un poquis a que cargue</div>
          </React.Fragment>
        ) }


      {allData && 

      <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
              {allData[0].map(
                  (h:any) => <StyledTableCell key={h}> <Typography variant="h6"><strong>{h}</strong></Typography>  </StyledTableCell>
              )}
          
            </TableRow>
          </TableHead>

          <TableBody>
              {allData.slice(1).map((row:any) => (
                <StyledTableRow>
                    {row.map((c: any) => <StyledTableCell key={c}> <Typography variant="subtitle1">{c}</Typography>  </StyledTableCell>)}
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
        
        
        </>
    );
}