import React, { useState } from 'react'
import Logo from "../assests/logo.svg"
import { Typography, Grid, Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const Header = ({name}) => {
    const [buttonHover, setButtonHover] = useState(false);
    const [buttonHoverLogin, setButtonHoverLogin] = useState(false);

    return (
        <div>
            <Grid container alignItems={{ md: "center", sm: "" }} my={2} justifyContent={{sm:"center",xs:"space-evenly"}}>
                <Grid item sm={3} md={3} lg={3} display={"flex"} alignItems={"center"}  >
                    <img src={Logo} alt="" width={"30px"} style={{ margin: "0 4px" }} />
                    <Divider orientation="vertical" flexItem />
                    <Typography mx={1} variant="h5" color={"secondary.main"}> CalenderApp</Typography>
                </Grid>

              <Grid item sm={5} md={5} lg={5} display={{md:"flex",xs:"none"}} justifyContent={"space-evenly"}>
                    <Typography variant='h6' color={"secondary.main"}>Individual</Typography>

                    <Typography variant='h6' color={"secondary.main"}>Pricing</Typography>

                    <Typography variant='h6' color={"secondary.main"}>Product</Typography>
                </Grid>
                <Grid item sm={4} md={3} lg={3} display={"flex"} justifyContent={"space-around"}  alignItems={"center"}>
                    
                     <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button
                        onMouseOver={() => setButtonHoverLogin(!buttonHoverLogin)}
                        onMouseLeave={() => setButtonHoverLogin(!buttonHoverLogin)}
                        variant={"text"}
                        sx={{ padding: ".8em 1.5em", borderRadius: "20px", fontSize: "17px" }}
                        color={`${buttonHoverLogin ? "primary" : "secondary"}`}
                    >
                      Login
                    </Button>
                    </Link>

                   <Link to="signup" style={{ textDecoration: "none" }}>
                    <Button
                        onMouseOver={() => setButtonHover(!buttonHover)}
                        onMouseLeave={() => setButtonHover(!buttonHover)}
                        variant={`${buttonHover ? 'outline' : "contained"}`}
                            sx={{ padding: ".8em 1.5em", borderRadius: "20px" }}
                    >
                       Get Started
                    </Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header