import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { GrCaretPrevious } from 'react-icons/gr';
import { GrCaretNext } from 'react-icons/gr';
import './calendarheader.css'; // CSS 파일 연결

export default function CalendarHeader({ selectedDate, onDateChange }) {
    const [showCalendar, setShowCalendar] = useState(false);

    const handlePrev = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        onDateChange(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        onDateChange(newDate);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrev} className="nav-button">
                    <GrCaretPrevious />
                </button>
                <span className="date-text">
                    {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
                </span>
                <button onClick={handleNext} className="nav-button">
                    <GrCaretNext />
                </button>
                <FaCalendarAlt onClick={() => setShowCalendar(!showCalendar)} className="calendar-icon" />
            </div>

            {showCalendar && (
                <div className="calendar-popup">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            if (date) onDateChange(date);
                            setShowCalendar(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
