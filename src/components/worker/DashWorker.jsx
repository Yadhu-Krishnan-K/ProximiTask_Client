import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import instance from "../../helper/axiosInstance";
import { useSelector } from "react-redux";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "grey",
    color: "white",
  },
}));

const ServerDay = (props) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <HighlightedDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      selected={isSelected}
    />
  );
};

const WorkerDashboard = () => {
  const [value, setValue] = useState(dayjs());
  const [leaveDates, setLeaveDates] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch existing leave dates on component mount
  const worker = useSelector((state) => state.workerReducer.workerData)
  useEffect(() => {
    fetchLeaveDates();
    fetchTasks();
  }, []);

  const fetchLeaveDates = async () => {
    try {
      const response = await instance.get(`/workers/leave-dates/${worker._id}`);
      if (!response.data.success) throw new Error('Failed to fetch leave dates');
      const list = response.data.list
      setLeaveDates(list.map(date => dayjs(date).format("YYYY-MM-DD")));
    } catch (err) {
      setError('Failed to load leave dates');
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await instance.get('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    }
  };

  const handleMarkLeave = () => {
    setOpen(true);
  };

  const handleConfirmLeave = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formattedDate = value.format("YYYY-MM-DD");
      const response = await instance.patch(`/workers/leave-dates/${worker._id}`, {  
          date: formattedDate,
        })
      

      if (!response.data.success) throw new Error('Failed to mark leave');

      // Update local state only after successful backend update
      if (!leaveDates.includes(formattedDate)) {
        setLeaveDates(prev => [...prev, formattedDate]);
      }
      setOpen(false);
    } catch (err) {
      setError('Failed to mark leave. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaySpecial = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    if (leaveDates.includes(formattedDate)) {
      return "Leave";
    }
    const taskForDay = tasks.find(task => task.date === formattedDate);
    return taskForDay ? taskForDay.task : "No tasks assigned";
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            defaultValue={dayjs()}
            value={value}
            onChange={(newValue) => setValue(newValue)}
            minDate={dayjs()}
            maxDate={dayjs().add(1, "month")}
            slots={{ day: ServerDay }}
            slotProps={{ day: { highlightedDays: leaveDates } }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMarkLeave}
          disabled={isLoading}
          className="mt-4 w-full"
        >
          {isLoading ? "Marking Leave..." : "Mark as Leave"}
        </Button>
      </Box>

      <div className="w-1/3 ml-10 bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Selected Date: {value.format("YYYY-MM-DD")}
        </h2>
        <p className="text-lg">{getDaySpecial(value)}</p>
        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Mark as Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark {value.format("YYYY-MM-DD")} as a leave day?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)} 
            color="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmLeave} 
            color="primary" 
            disabled={isLoading}
            autoFocus
          >
            {isLoading ? "Confirming..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkerDashboard;