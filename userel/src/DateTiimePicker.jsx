import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <label htmlFor="dateTime" className="text-label">Date & Time</label>
      <DatePicker
        id="dateTime"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Click to select date and time"
        className="text-box"
      />
    </div>
  );
};

export default DateTimePicker;
