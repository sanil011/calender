import React,{useState} from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Button, Stack, Box,TextField ,Card, TextareaAutosize} from '@mui/material'
import { useDispatch } from 'react-redux';
import { profileActions } from '../../store/profileSlice'
import { useId } from "react-id-generator";

const Tab2 = () => {
    const dispatch = useDispatch();
    const [id] = useId();
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const meeting = {
        id,
        title,
        description,
        date: date,
        end: endTime ,
        start: time 
    }

    const handleClick = () => {
        dispatch(profileActions.setMeeting(meeting))
        console.log(meeting)
    }
  return (
      <Box>
          <Box variant="outlined" width={{md:620,sm:"90vw",xs:"98vw"}} padding={{md:"2em",sm:"1em",xs:".5em"}}  >
              <Typography variant='h5' mb={5} textAlign={"center"}>Create a Meeting</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} my={1}>    
              <TextField label="Title" value={title} onChange={(e) => {
                  setTitle(e.target.value);
              }} />
                 
          <DatePicker
              label="Date"
                      value={date}
                      disablePast={true}
              onChange={(newValue) => {
                  setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              />      

                    </Stack>

              <Stack my={1}>
                  <label>
                      <Typography>Description</Typography></label>
              <TextareaAutosize minRows={3} value={description} sx={{width:"50%"}} onChange={(e) => {
                  setDescription(e.target.value);
              }} />
              </Stack>

              <Stack direction={"row"} justifyContent={"space-between"} my={2}>  
              <TimePicker
                  label="Start Time"
                  value={time}
                  onChange={(newValue) => {
                      setTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => {
                      setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
              </Stack> 
              <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                      variant={"contained"}
                      color={"secondary"}
                  sx={{ padding: ".5em 1.5em", borderRadius: "20px" }}
              >
                  Cancel
              </Button>
              <Button
                  variant={"contained"}
                      sx={{ padding: ".5em 1.5em", borderRadius: "20px" }}
                      onClick={()=>handleClick()}
              >
                  Create 
              </Button>
              </Stack>
          </Box>
    </Box>
  )
}

export default Tab2
