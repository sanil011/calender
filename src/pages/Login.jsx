import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { Typography, Grid,  Divider, Box, Stack } from '@mui/material'
import Banner from "../assests/banner1.png";
import Google from "../assests/google.svg"
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assests/logo.svg"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../store/profileSlice'
import { useGlobalContext } from '../context/globalContext';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unsub = auth.onAuthStateChanged((usr) => {
        dispatch(profileActions.setProfile(usr?.displayName))
        dispatch(profileActions.setEmail(usr?.email))
    })

    const { setLoading } = useGlobalContext();

    const handleLogin = async (data) => {
        setLoading(true);
        const {  email, password } = data;

        signInWithEmailAndPassword(auth, email, password).then((res) => {
            unsub();
            console.log("login user", res);
            setLoading(false);
            navigate('/user')
        })
            .catch
            ((err)=> {
            console.log(err);
            })
    }

    return (
        <div>
                    <Link to="/" style={{textDecoration:"none"}}>
                    <Box display={"flex"} gap={2} m={2} justifyContent={{sm:"flex-start",md:'flex-start'}}>
                        <img src={Logo} width={"20px"} />
                        <Divider orientation="vertical" flexItem />
                        <Typography variant='h6' color={"secondary"} fontWeight={600}>CalenderApp</Typography>
                    </Box>
                    </Link>
            <Grid container>
                <Grid item md={6} sm={6}>
                    <Stack display={{ sm: "flex", xs: "none", md: "flex" }} justifyContent={"center"} mt={15}>
                        <img src={Banner} width={ "90%"} />
                    </Stack>
                </Grid>

                <Grid item md={3} sm={6} sx={{margin:"auto "}} mt={{sm:"4em",xs:"3em"}} >
                    <Box display={"flex"} width={"100%"} flexDirection={"column"} alignContent={"center"} gap={{md:4,lg:10,sm:2}}>
                        <Typography variant='h5'  fontWeight={600}>hey, Hello 👋</Typography>
                        <Typography color={"secondary"} >Enter the information you entered while registering</Typography>
                    </Box>
                    <Box  width={{md:"100%",sm:"80%"}} mt={4}>
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

                           <button type="submit" style={{ height: "40px", backgroundColor: "#0367FC", border: "none", color: "white", borderRadius: "10px", cursor: "pointer" }}
                            >Login
                            </button>
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
