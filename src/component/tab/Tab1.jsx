import React from 'react'
import { useSelector } from 'react-redux';
import { Typography, Grid, Button, Divider, Tabs, Tab, Box, } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Card from "../Card"
import Profile from "../../assests/profile.jpg";
import { Stack } from '@mui/system';
const Tab1 = () => {
  const { user,email,meeting } = useSelector((state) => state.profile)
    return (
      <div
        style={{
          display: "flex",marginTop:"1em",flexDirection:"column"
        }}
        color={"primary"}
      >
        <Stack direction={"row"} mb={6}>
        <img width={"40px"} height={"40px"} style={{ borderRadius: "50%", marginRight: "4px" }} src={Profile} />
        <Divider orientation="vertical" flexItem sx={{ marginRight: "4px" }} />
        <Stack >
        {user}
          <Typography color={"#0367FC"}>calenderapp.com/{email}</Typography>
        </Stack>
        </Stack>
        <Divider orientation='horizontal' flexItem width={"100%"} mb={3} />

        <Box display={"flex"} sx={{flexWrap:"wrap"}} gap={2} m={2} mt={4} mb={4}>
        {meeting?.map((db) => (
          <Card data={db} key={ db.id} />
        ))}
        </Box>
      </div>
  )
}

export default Tab1