import React,{useState} from 'react'
import { Typography, Grid, Button, Divider, Box } from '@mui/material'
import Banner from "../assests/banner1.png"
import Header from '../component/Header'
import { Link } from "react-router-dom"
const Home = ({ name }) => {
    const [firstEmail,setFirstEmail] = useState(null)
    return (
        <div>
            <Header name={name} />
            <Grid container mt={15} justifyContent={"center"} >
                <Grid item xs={11}  sm={11} md={5} sx={{ margin: "auto" }} display={"flex"} flexDirection={"column"} gap={10}>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                        <Typography variant='h3' fontWeight={600}>Schedule Your Meeting</Typography>
                        <Typography variant='h3' color={"primary"} fontWeight={600}>CalenderApp</Typography>
                        <Typography variant='h6'> Scheduling mettings professionally and efficiently, eliminating the hassle of
                            back-and-forth emails so you can get back to work.
                        </Typography>
                    </Box>
                    <Box display={"flex"} sx={{ position: "relative", width: "400px", height: "60px", borderRadius: "40px", border: "1px solid lightgrey" }}>
                        <input type="email"
                            style={{
                                width: "100%",
                                paddingLeft: "20px",
                                backgroundColor: "transparent",
                                height: "inherit",
                                color: "rgb(90, 90, 90)",
                                border: "none",
                                outline: "none",
                                cursor: "text"
                            }}
                            value={firstEmail}
                            placeholder="Enter your email"
                        onChange={(e)=>setFirstEmail(e.target.value)}
                        />
                        <Link to="/signup">
                        <Button variant='contained' sx={{
                            backgroundColor: "black",
                            position: "absolute",
                            color: "white",
                            top: "0",
                            right: "0",
                            zIndex: "2",
                            borderRadius: "30px",
                            height: "inherit",
                            width: "120px",
                            border: "none",
                            outline: "none",
                            cursor: "pointer"
                        }}>
                            Get Started
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={11} sm={11} md={6} textAlign={"center"}>
                    <img src={Banner} style={{ width: "70%" }} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home