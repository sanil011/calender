import React from 'react'
import { useForm } from 'react-hook-form';
import { Typography, Grid, Button, Divider, Box, Stack } from '@mui/material'
import Banner from "../assests/banner1.png";
import Google from "../assests/google.svg"
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assests/logo.svg"
import { auth } from "../firebase"
import {  signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const handleLogin = async (data) => {
        const {  email, password } = data;

            signInWithEmailAndPassword(auth, email, password).then(async (res) => {
                navigate("/user");
            }).catch
            ((err)=> {
            console.log(err);
        })
    }

    return (
        <div>
            <Grid container>
                <Grid item md={6} display={"flex"} flexDirection={{md:"column"}}>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <Box display={"flex"} gap={2} m={2}>
                        <img src={Logo} width={"20px"} />
                        <Divider orientation="vertical" flexItem />
                        <Typography variant='h6' color={"secondary"} fontWeight={600}>CalenderApp</Typography>
                    </Box>
                    </Link>
                    <Stack display={{ sm: "none", xs: "none", md: "flex" }} justifyContent={"center"} mt={15}>
                        <img src={Banner} />
                    </Stack>
                </Grid>
                <Grid item md={{md:6,sm:0}} display={"flex"} flexDirection={"column"} justifyContent={"center"} pl={{md:15,lg:15}} gap={6}>
                    <Box display={"flex"} flexDirection={"column"} alignContent={"center"} gap={1}>
                        <Typography variant='h5'  fontWeight={600}>hey, Hello 👋</Typography>
                        <Typography color={"secondary"}>Enter the information you entered while registering</Typography>
                    </Box>
                    <Box  width={"100%"}>
                        <form onSubmit={handleSubmit(handleLogin)} style={{ display: "flex", flexDirection: "column",  }}>
                       
                            <label><Typography variant='subtitle2'>Email</Typography> </label>
                            <input type="text" style={{ height: "40px", marginBottom: "1em" }}

                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                            {errors.Email && <p role="alert">Email is required</p>}

                            <label><Typography variant='subtitle2'>Password</Typography></label>
                            <input type="text" style={{ height: "40px", marginBottom: "1em" }}

                                {...register("password", { required: true })} />
                            {errors.Password?.type === 'required' && <p role="alert">Password is required</p>}
                            <div style={{ display: "flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1em" }}>
                                <Box display={"flex"}>
                                <input type="checkbox" />
                                <Typography mx={1} variant='subtitle2'>Remember me</Typography>
                                </Box>
                                <Typography variant='subtitle2'>Forgot Password?</Typography>
                            </div>
                            <button type="submit" style={{ height: "40px", backgroundColor: "#0367FC", border: "none", color: "white", borderRadius: "10px", cursor: "pointer" }} >Login</button>
                        </form>
                        <Divider sx={{ margin: "1em 0" }}>or</Divider>
                        <button
                            style={{ height: "40px", width: "100%", backgroundColor: "white", border: "1px solid lightgrey", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}
                        ><img src={Google} width={"20px"} /> Login with Google</button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login