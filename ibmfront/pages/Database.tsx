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
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

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

export default function Database(props:any) {

  const inputRef = useRef(null);

  const [fileName, setFileName] = useState(null);
  const [allData, setData] = useState("");
  
  const handleFile = async (e:any) =>{

    const fileInput = inputRef.current;
    
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();

    //todo el archivo
    //const workbook = XLSX.read(data);

    //primeras 10 filas
    const workbook = XLSX.read(data, {sheetRows:10});

    //esto da la primera página del excel
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]

    //leer como json
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      //blankrows: "",
      header: 1});

    setData(jsonData);

    console.log("esto", jsonData[0]);

    e.target.value = null;
  }

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };


    return( 
        <>
                
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <br />
          <Typography fontSize={30} sx={{ mt: 2, }}>Employee's Database</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.2, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 0 }}></Box>
          <br></br>
        
          {/* <Input id="contained-button-file2" type="file" inputProps={{accept: '.xlsx,.xls'}} onChange={e => handleFile(e)} ref={inputRef} style={{display: 'none'}} ></Input> */}

            <br></br>
 
              <Grid
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                sx={{ width: '100%' }}
              >    
              <Stack direction="row" spacing={3} sx={{ width: "100%", boxSizing:'border-box'}}>        

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
                    <StyledTableCell> </StyledTableCell>
                
                  </TableRow>
                  
                </TableHead>

                <TableBody>
                    {allData.slice(1).map((row:any) => (
                      <StyledTableRow>
                        {row.map((c: any) => (
                          <StyledTableCell key={c}>
                            <Typography variant="subtitle1">{c}</Typography>
                          </StyledTableCell>
                        ))}
                        <StyledTableCell>
                        
                              <AddBoxRoundedIcon />
                        
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
        
        
        </>
    );
}