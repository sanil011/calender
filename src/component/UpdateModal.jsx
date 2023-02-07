import Modal from '@mui/material/Modal';
import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Button, Stack,  TextField, Card, TextareaAutosize } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { modalActions } from '../store/modalSlice';
import { profileActions } from '../store/profileSlice'
const UpdateModal = () => {
  const dispatch = useDispatch();
  const { popove } = useSelector((state) => state.popover)
  const { meet } = useSelector((state) => state.profile)
 
  const [id,setid] = useState(meet[0]?.id)
  const [date, setDate] = useState(meet[0]?.date);
  const [time, setTime] = useState(meet[0]?.start);
  const [endTime, setEndTime] = useState(meet[0]?.end);
  const [title, setTitle] = useState(meet[0]?.title);
  const [description, setDescription] = useState(meet[0]?.description);

  const meeting = {
    id,
    title,
    description,
    date: new Date(date).toLocaleDateString([], { day: "2-digit", month: "short", year: "2-digit" }),
    end: endTime,
    start: time
  }

  const handleClick = () => {
    dispatch(profileActions.update({data:meeting,id}))
    console.log(meeting);
    dispatch(modalActions.modalClose(false))
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    maxWidth: "600px",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={popove}
        onClose={() => dispatch(modalActions.modalClose(false))}
      >
        <Card variant="outlined" sx={style}>
          <Typography variant='h5' mb={5} textAlign={"center"}>Update a Meeting</Typography>
          <Stack direction={"row"} justifyContent={"space-between"} my={1}>
            <TextField label="Title" value={title} onChange={(e) => {
              setTitle(e.target.value);
            }} />

            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

          </Stack>

          <Stack my={1}>
            <label>Description</label>
            <TextareaAutosize minRows={3} value={description} sx={{ width: "50%" }} onChange={(e) => {
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
              onClick={() => dispatch(modalActions.modalClose(false))}
            >
              Cancel
            </Button>
            <Button
              variant={"contained"}
              sx={{ padding: ".5em 1.5em", borderRadius: "20px" }}
              onClick={() => handleClick()}
            >
              Update
            </Button>
          </Stack>
        </Card>
      </Modal>
    </div>
  )
}

export default UpdateModal