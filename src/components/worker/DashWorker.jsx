import React, { useState } from "react";
import dayjs from "dayjs";
import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "grey", // Grey background for leave days
    color: "white", // White text
  },
}));

// Custom component to highlight leave dates
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
  const [value, setValue] = useState(dayjs()); // Date selected
  const [leaveDates, setLeaveDates] = useState([]); // Leave dates array
  const [open, setOpen] = useState(false); // State to control dialog visibility

  // Example work assigned for today
  const tasks = [
    { id: 1, task: "Install inverter at Client XYZ", date: dayjs().format("YYYY-MM-DD") },
  ];

  // Handle marking the selected day as leave
  const handleMarkLeave = () => {
    setOpen(true); // Open confirmation dialog
  };

  // Handle confirmation to mark as leave
  const handleConfirmLeave = () => {
    const formattedDate = value.format("YYYY-MM-DD");
    if (!leaveDates.includes(formattedDate)) {
      setLeaveDates((prev) => [...prev, formattedDate]); // Add the leave date
    }
    setOpen(false); // Close the dialog after confirming
  };

  // Check if the selected day is a workday or leave
  const getDaySpecial = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    if (leaveDates.includes(formattedDate)) {
      return "Leave";
    }
    const taskForDay = tasks.find((task) => task.date === formattedDate);
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
            minDate={dayjs()} // Disable past dates
            maxDate={dayjs().add(1, "month")}
            slots={{ day: ServerDay }} // Use custom day rendering
            slotProps={{ day: { highlightedDays: leaveDates } }} // Pass leave dates to custom day component
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleMarkLeave}
          className="mt-4"
        >
          Mark as Leave
        </Button>
      </Box>

      {/* Display selected date and its special (work or leave) */}
      <div className="w-1/3 ml-10 bg-gray-100 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Selected Date: {value.format("YYYY-MM-DD")}</h2>
        <p className="text-lg">
          {getDaySpecial(value)}
        </p>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)} // Close dialog without marking leave
      >
        <DialogTitle>Mark as Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark {value.format("YYYY-MM-DD")} as a leave day?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLeave} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkerDashboard;
