import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import BusinessIcon from '@mui/icons-material/Business';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import VerifiedIcon from '@mui/icons-material/Verified';
import CircularProgress from "@mui/material/CircularProgress";
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import Tooltip from '@mui/material/Tooltip';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useState, useEffect } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";
import Axios from "axios";
import recommendationsData from '../public/Assets/recommendations.json';
import { Card, CardContent, Link, Grid, IconButton} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function EmployeeView() {

  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userEmail, setEmail] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [certifications, setEmployeeCertifications] = useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [file2, setFile2] = useState();
  const [fileName2, setFileName2] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [message, setMessage] = useState("");


  const [similarDocumentsAll, setSimilarDocumentsAll] = useState([]);
  const [value, setValue] = React.useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 3;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setStartIndex(newValue * cardsPerPage);
  };
  
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

  const logOut = () => {
    window.localStorage.clear();
    Cookies.remove("loggedin");
    window.location.href = "./Login";
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

  const getMessage = async (uid) => {
    try {
      const response = await Axios.get(`http://localhost:5000/get-message/${uid}`);
      setMessage(response.data.message);
      setUserUid(response.data.uid);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  useEffect(() => {
    Axios.get("http://localhost:5000/employeeInfo").then((response) => {
      //console.log(response.data);
      setEmployeeData(response.data);
    });
    Axios.get("http://localhost:5000/certification").then((response) => {
      //console.log(response.data);
      setEmployeeCertifications(response.data);
      setLoading(false);
    });
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
        //console.log(data, "userData");
        setUserName(data.data.name);
        setEmail(data.data.email);
        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./Login";
        }
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

  const employeeID = employeeData.find(x => x.email === userEmail).uid;
  const employeeCertifications = certifications.filter(x => x.uid === employeeID);

   //recommendations
   const natural = require('natural');

  const prepareDocumentsData = (jsonData) => {
      return jsonData.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          content: `${item.name} ${item.description}`,
          global_activity_url: item.global_activity_url,
          image_url: item.image_url
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
  tfidf.tfidfs('');

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
        similarity,
      };
    });

    // Sort the similarities by similarity score in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    return { certificationId: certification.id, recommendations: similarities };
  });

  //setSimilarDocumentsAll(similarDocuments[0]);

  //get first 12 recommendations 
  const recommendations = similarDocuments.length > 0 ? similarDocuments[0].recommendations.slice(0, 13) : [];

  return (

    <Container maxWidth={false} sx={{ width: "100%" }}>
      <br />
      <Stack direction="row">
        <Box sx={{ width: "90%" }}>
          <Typography fontSize={30} fontWeight={600} sx={{ mt: 2, }}>Welcome back, <Typography component="span" fontSize={30} fontWeight={300}> {userName}</Typography></Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 3, marginLeft: 0, marginTop: 2 }}></Box>
        </Box>
        <Button endIcon={<NotificationsIcon />} size="large" onClick={() => {getMessage(employeeID)}}> </Button>
        <Typography> {message} </Typography>
        <Button variant="contained" endIcon={<LogoutIcon />} onClick={() => logOut()} sx={{ height: 50, mt: 3, ml: 3, backgroundColor: "black" }}>LogOut</Button>
      </Stack>
      <br />

      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Paper elevation={12} sx={{ width: "100%", backgroundColor: "grey.300", minHeight: 300, mt: 1 }}>
          <Typography sx={{ mt: 2, ml: 2 }} fontSize={25} fontWeight={600}>Recommended Certifications</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                sx={{
                  alignSelf: 'center',
                  position: 'absolute',
                  left: 40,
                  top: '50%',
                  transform: 'translateY(150%)',
                }}
              >
                <IconButton
                  disabled={value === 0}
                  onClick={() => handleChange(null, value - 1)}
                >
                  <ArrowBackIosIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 40,
                  top: '50%',
                  transform: 'translateY(150%)',
                }}
              >
                <IconButton
                  disabled={startIndex + cardsPerPage >= recommendations.length}
                  onClick={() => handleChange(null, value + 1)}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
            </Box>
          </Box>
          <br />

          <Grid sx={{ ml: 1 }} container spacing={1}>
            {recommendations.slice(startIndex, startIndex + cardsPerPage).map((recommendation) => (
              <Grid item key={recommendation.id} xs={12} sm={6} md={4} lg={3} mr={5} ml={5}>
                <Card sx={{ width: '100%', maxWidth: 500, minHeight: 450, marginBottom: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia component="img" height="140" image={recommendation.image_url}  />
                  <CardContent sx={{ flex: '1 0 0', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, textAlign: 'left' }}>{recommendation.name}</Typography>
                    <Box display="flex-start" sx={{ height: 10, width: 0.9, backgroundColor: '#0F62FE', mt: 1, marginLeft: 1, mb: 1 }}></Box>
                    <Box sx={{ flex: '1 0 auto', maxHeight: 200, overflowY: 'auto', mb: 3 }}>
                      <Typography fontSize={14} sx={{ textAlign: 'justify' }}>{recommendation.description}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ position: "absolute", bottom: 2, width: "100%", justifyContent: "left" }}>
                    <Button onClick={() => window.open(recommendation.global_activity_url)}>Learn More</Button>
                  </CardActions>
                  <br />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>


      <Box sx={{ display: "flex", width: "100%" }}>
        <Paper elevation={12} sx={{ width: "50%", backgroundColor: "grey.300", maxHeight: "40%", mt: 3, mr: 2 }}>
          <Typography sx={{ mt: 2, ml: 2 }} fontSize={25} fontWeight={600}>Your Certifications</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 1, marginLeft: 2, mb: 1 }}></Box>
          <List sx={{ overflow: 'auto', maxHeight: 250 }}>
            {employeeCertifications.map((val, index) => {
              if (index % 2 == 0) {
                return <ListItem sx={{ mb: 1 }}>
                  <Paper elevation={6}>
                    <Typography fontSize={16} sx={{ ml: 1, mr: 1 }}>{"●\t" + val.certification_name}</Typography>
                  </Paper>
                  {getCertificationType(val.type)}
                  <VerifiedIcon sx={{ ml: 1, color: "#198038" }} />
                </ListItem>
              }
              else {
                return <ListItem sx={{ mb: 1 }}>
                  <Paper elevation={6} sx={{ backgroundColor: "#0F62FE" }}>
                    <Typography fontSize={16} color={"white"} sx={{ ml: 1, mr: 1 }}>{"●\t" + val.certification_name}</Typography>
                  </Paper>
                  {getCertificationType(val.type)}
                  <VerifiedIcon sx={{ ml: 1, color: "#198038" }} />
                </ListItem>
              }
            })}
          </List>
        </Paper>
        <Paper elevation={12} sx={{ width: "50%", backgroundColor: "grey.300", maxHeight: "40%", mt: 3, ml: 2 }}>
          <Typography sx={{ mt: 2, ml: 2 }} fontSize={25} fontWeight={600}>Upload Certifications</Typography>
          <Box display="flex-start" sx={{ height: 10, width: 0.4, backgroundColor: "#0F62FE", mt: 1, marginLeft: 2, mb: 1 }}></Box>
          <Container sx={{ marginLeft: 0, width: "100%", backgroundColor: "grey.300" }}>
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
                  style={{ marginLeft: 'auto', }}
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
                  sx={{ mr: 3, mb: 1, mt: 2 }}
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
                sx={{ mb: 1, mt: 2 }}
              >
                Upload
              </Button>

            </Tooltip>

            <br />
            

          </Container>
        </Paper>
      </Box>
    </Container >
  )
}