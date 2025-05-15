import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FaCalendarAlt } from 'react-icons/fa';
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
                    ◀
                </button>
                <span className="date-text">
                    {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일
                </span>
                <button onClick={handleNext} className="nav-button">
                    ▶
                </button>
                <FaCalendarAlt
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="calendar-icon"
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                />
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
