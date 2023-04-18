import * as React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import * as XLSX from "xlsx";
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

        <br></br>
       
        <div className='center'>
        {fileName && (
          <React.Fragment> 
        <Typography variant="h4" align="center">File Name: <span>{fileName}</span></Typography>
          </React.Fragment>
        ) }


      {allData && 

      <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
        <TableHead>
            <TableRow>
              {allData[0].map(
                  (h:any) => <TableCell key={h}> <Typography variant="h6">{h}</Typography>  </TableCell>
              )}
          
            </TableRow>
          </TableHead>

          <TableBody>
              {allData.slice(1).map((row:any) => (
                <TableRow>
                    {row.map((c: any) => <TableCell key={c}> <Typography variant="subtitle1">{c}</Typography>  </TableCell>)}
                  </TableRow>
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