import React, { useState } from 'react'
import styles from'./CustomCalendar.module.css';
import { CalendarCustom as Calendar } from '../CalendarCustom';

export const CalendarCustom = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const toggleCalendar = () => {
      setShowCalendar(!showCalendar);
    }

    return (
        <div></div>
    );
}