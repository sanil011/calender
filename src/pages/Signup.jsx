import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { Typography, Grid, Divider, Box, Stack } from '@mui/material'
import Banner from "../assests/banner1.png";
import Google from "../assests/google.svg"
import Logo from "../assests/logo.svg"
import { db,auth } from "../firebase"
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { profileActions } from '../store/profileSlice'
import { useGlobalContext } from '../context/globalContext';


const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unsub = auth.onAuthStateChanged((usr) => {
        dispatch(profileActions.setProfile(usr?.displayName))
        dispatch(profileActions.setEmail(usr?.email))
    })
    const { setLoading } = useGlobalContext();

    const handleSignUp = async (data) => {
        setLoading(true);
        const { name, email, password } = data;
        try {
            const d = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(d);
            if (!querySnapshot.empty) {
                console.log("Email Id Already Registered!!!!");
                return;
            }
            await addDoc(collection(db, "users"), {
                name,
                email,
                password,
            })
            createUserWithEmailAndPassword(auth, email, password).then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: name,
                });
                
            }).then(
                () => {
                    unsub();
                    console.log("navigate signup");
                    setLoading(false)
                    navigate('/user')
                }
            )
        }
        catch (err) {
            console.log(err);
        }
        finally {
            console.log("done1")
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item md={5}>
                        <Link to="/" style={{textDecoration:"none"}}>
                    <Box display={"flex"} gap={2} m={2}>
                            <img src={Logo} width={"20px"} />
                            <Divider orientation="vertical" flexItem />
                            <Typography variant='h6' color={"secondary"} fontWeight={600}>CalenderApp</Typography>
                        </Box>
                        </Link>
                    <Stack display={{ sm:"none",xs:"none",md:"flex"}} justifyContent={"center"} mt={15}>
                        <img src={Banner} />
                    </Stack>
                </Grid>
                <Grid item md={7} sm={11} xs={12} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                    
                    <Box sx={{ margin: " auto " }} mt={{ md: 15, sm: 10, xs: 10 }} width={{md:"40%",sm:"60%",xs:"90%"}}>
                        <Typography variant='h5' marginBottom={"1.5em"} fontWeight={600}>Sign up</Typography>
                        <form onSubmit={handleSubmit(handleSignUp)} style={{ display: "flex", flexDirection: "column",  margin: " auto " }}>
                            <label><Typography variant='subtitle2'> Full Name</Typography> </label>
                            <input type="text" style={{ height: "40px",marginBottom:"1em" }}

                                {...register("name", { required: true })} />
                            {errors.fullName?.type === 'required' && <p role="alert">First name is required</p>}
                            <label><Typography variant='subtitle2'>Email</Typography> </label>
                            <input type="text" style={{ height: "40px", marginBottom:"1em" }}

                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                            {errors.Email && <p role="alert">Email is required</p>}

                            <label><Typography variant='subtitle2'>Password</Typography></label>
                            <input type="text" style={{ height: "40px", marginBottom:"1em" }}

                                {...register("password", { required: true })} />
                            {errors.Password?.type === 'required' && <p role="alert">Password is required</p>}
                            
                            <button type="submit"  style={{ height: "40px", backgroundColor: "#0367FC", border: "none", color: "white", borderRadius: "10px", cursor: "pointer" }} >Create account</button>
                        </form>
                        <Divider sx={{ margin: "1em 0" }}>or</Divider>
                        <button
                            style={{ height: "40px",width:"100%", backgroundColor: "white", border: "1px solid lightgrey", borderRadius: "10px", cursor: "pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"20px" }}
                        ><img src={Google} width={"20px"} /> Sign with Google</button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup
