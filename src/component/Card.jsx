import React,{useState,useEffect} from 'react'
import { Typography, Grid, Button, Divider, Tabs, Tab, Box,Card } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modalSlice';
import { profileActions } from '../store/profileSlice'
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateModal from './UpdateModal';
const Card1 = ({ data }) => {

    const dispatch = useDispatch();
    const [raise, setRaise] = useState(false);

    let trimmedString = data.description?.substr(0, 118);
    const [length,setLength] = useState(false)
    useEffect(() => {
        if (data?.description?.length > 126) {
            setLength(true)
        }
    }, [data])
    
    const handleDelete = () => {
        dispatch(profileActions.delete(data.id))
    }

    const handleUpdate = () => {
        dispatch(modalActions.modalOpen(true));
        dispatch(profileActions.findSingle(data.id))
    }
    // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

    return (
        <Box>
            <UpdateModal  />
            <Card
                onMouseOver={() => setRaise(true)}
                onMouseLeave={()=>setRaise(false)}
                raised={raise}
                key={data.id} sx={{ position: "relative", border: "1px solid lightgrey", display: "flex", flexDirection: "column", borderTop: "3px solid #0367FC", padding: "1em", maxHeight: "220px", maxWidth: "300px", height: "220px", width: "300px" }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant='h6' >{data?.title}</Typography>
                <SettingsIcon onClick={() => handleUpdate()} sx={{ cursor: "pointer" }} />
                <DeleteIcon color='error' onClick={() => handleDelete()} sx={{ cursor: "pointer" }} />
                </Box>
                <Box sx={{marginTop:"10px",display:"flex",flexDirection:"column",alignContent:"space-between",overflow:"hidden"}}>
                    <Typography variant='subtitle2' color={"grey"}>{trimmedString} {length && "..."}</Typography>
                    
                </Box>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} sx={{ position:"absolute",top:"150px",width:"100%",paddingRight:"24px" }}>
                <Stack direction={"row"} mb={1} justifyContent={"space-between"}>
                    <Typography display={"flex"} fontSize={"14px"} alignItems={"center"} color={"#0367FC"}><ContentCopyIcon /> send the link</Typography>
                        <Typography variant='subtitle2' fontSize={"14px"} color={"grey"}>{new Date(data?.date).toLocaleDateString([], { day: "2-digit", month: "short", year: "2-digit" })}</Typography>
                </Stack>
                <Divider />
                <Stack direction={"row"} mt={1} justifyContent={"space-between"}>
                        <Typography fontSize={"14px"} color={"#0367FC"} display={"flex"} sx={{ cursor: "pointer" }} alignItems={"center"}> {new Date(data?.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} </Typography>
                        <Typography fontSize={"14px"} color={"#0367FC"} display={"flex"} sx={{ cursor: "pointer" }} alignItems={"center"}> {new Date(data?.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} </Typography>
                </Stack>
                </Box>
            </Card>
        </Box>
  )
}

export default Card1



    // < Box display = { "flex"} alignContent = { "space-between"} flexDirection = { "column"} >
    //   <Box px={2} mt={2} display={"flex"} flexDirection={"column"} gap={1}>
    //       <Typography variant='h6' mt={2}>{ data?.title}</Typography>
    //             <Typography variant='subtitle2' color={"grey"}>{data?.description}</Typography>

    //             <Box display={"flex"} alignContent={"center"} justifyContent={"space-between"} mb={1}>
    //       <Typography display={"flex"} fontSize={"14px"} alignItems={"center"}  color={"#0367FC"}><ContentCopyIcon/> send the link</Typography>
    //                 <Typography variant='subtitle2' fontSize={"14px"} color={"grey"}>{data?.date}</Typography>
    //             </Box>
    //         </Box>
    //         <Box px={2}>
    //       <Divider  />
    //       <Box display={"flex"}  justifyContent={"space-between"}>
    //           <Typography fontSize={"14px"} color={"#0367FC"} display={"flex"} sx={{ cursor: "pointer" }} alignItems={"center"}> {data?.start} </Typography>
    //           <Typography fontSize={"14px"} color={"#0367FC"} display={"flex"} sx={{ cursor: "pointer" }} alignItems={"center"}> {data?.end} </Typography>
    //           {/* <button style={{ border: "1px solid #0367FC", cursor: "pointer", backgroundColor: "transparent", padding: ".5em 1em", color: "#3366CC", borderRadius: "12px" }}>Share</button> */}
    //       </Box>
    //             </Box>
    //         </Box >