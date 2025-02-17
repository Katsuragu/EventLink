import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../css/Calendar.css';

function Calendar({ events }) {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                events={events.map(event => ({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                }))}
                className="custom-calendar"
            />
        </div>
    );
}

export default Calendar;