import React, { useState } from 'react'
import Logo from "../assests/logo.svg"
import { auth } from "../firebase"
import { Typography, Grid, Button, Divider, Tabs, Tab, Box, } from '@mui/material'
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import {  useSelector } from 'react-redux';
import Profile from "../assests/profile.jpg";
import Tab1 from "../component/tab/Tab1"
import Tab2 from "../component/tab/Tab2"

const Person = () => {
    
const {user} = useSelector((state)=>state.profile)

    const handleSignout = () => {
        signOut(auth).then(() => {
            <Navigate to="/" />
            window.location.reload();
        }).catch((error) => {
            console.log("sign out ", error)
        });
    }

    const [activeTab, setActiveTab] = useState("eventType");

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
  return (
      <div >
          <Grid container alignItems={"center"} justifyContent={"center"} my={1}>
              <Grid item md={ 2 } display={"flex"} alignItems={"center"} >
                  <img src={Logo} alt="" width={"30px"} style={{ margin: "0 4px" }} />
                  <Divider orientation="vertical" flexItem />
                  <Typography mx={1} variant="h5" color={"secondary.main"}> CalenderApp</Typography>
              </Grid>

             <Grid item md={5} display={"flex"} justifyContent={"space-evenly"}>
                  <Typography variant='h6' color={"secondary.main"}>Home</Typography>

                  <Typography variant='h6' color={"secondary.main"}>Availability</Typography>

                  <Typography variant='h6' color={"secondary.main"}>Integration</Typography>
              </Grid>
              <Grid item md={ 2 } display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                  <div
                      style={{
                          display: "flex", justifyContent: "space-around", alignItems: "center"
                      }}
                      color={ "primary" }
                  >
                      <img width={"40px"} height={"40px"} style={{ borderRadius: "50%", marginRight: "4px" }} src={Profile} />
                      <Divider orientation="vertical" flexItem sx={{ marginRight: "4px" }} />
                      {user}
                  </div>
                      

               <Button
                      variant={ "contained"}
                      sx={{ padding: ".5em 1.5em", borderRadius: "20px" }}
                      onClick={() => handleSignout()}
                  >
                      Logout
                  </Button>
              </Grid>
          </Grid>

          <Box sx={{marginTop:"4em",width:"80%",marginLeft:"10em"}}>
              <Box  display={"flex"} flexDirection={"column"} >
              <Box>
                 <Typography variant='h4' fontWeight={400}>My Calender App</Typography>
              </Box>
              <Box item >    
                  <Tabs value={activeTab} onChange={handleChange} left >
                       <Tab value="eventType" color="grey.main" label="Meetings" />
                       <Tab value="schedule" color="grey.main" label="Scheduled Meeting" />
                       {/* <Tab value="workflows" color="grey.main" label="Workflows" /> */}
                  </Tabs>
                  {activeTab === "eventType" && <Tab1 />}
                  {activeTab === "schedule" && <Tab2 />}
              </Box>
              </Box>
          </Box>
    </div>
  )
}

export default Person