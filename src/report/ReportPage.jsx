import React, { useState } from 'react';

import PieChart from './PieChart';
import LineChart from './LineChart';
import './Report.css';

const dummyExpenses = [
    { date: '2025-05-01', category: '음식', amount: 4500 },
    { date: '2025-05-15', category: '쇼핑', amount: 10000 },
    { date: '2025-06-03', category: '교통', amount: 3000 },
    { date: '2025-06-10', category: '음식', amount: 8000 },
    { date: '2025-06-20', category: '문화생활', amount: 5000 },
    { date: '2025-07-01', category: '음식', amount: 6000 },
];

function ReportPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const currentMonthString = `${year}-${String(month).padStart(2, '0')}`;

    const filteredExpenses = dummyExpenses.filter((e) => e.date.startsWith(currentMonthString));

    const [goal, setGoal] = useState('');
    const [input, setInput] = useState('');

    const getCurrentMonthKey = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    const handleConfirm = () => {
        const key = getCurrentMonthKey();
        localStorage.setItem(`goal-${key}`, input);
        setGoal(input);
        setInput('');
    };

    return (
        <div>
            <div className="report-header">
                <button onClick={handlePrevMonth}>◀</button>
                <span>
                    {year}년 {month}월
                </span>
                <button onClick={handleNextMonth}>▶</button>
            </div>

            <div className="report-container">
                <div className="chart-wrapper">
                    <div className="chart-box">
                        <PieChart expenses={filteredExpenses} />
                    </div>
                    <div className="chart-box">
                        <LineChart expenses={filteredExpenses} />
                    </div>
                </div>
            </div>

            <div className="goal">
                <label>이번 달 목표 설정 :</label>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleConfirm}>확인</button>

                {/* {goal && <p>📌 이번 달 목표: {goal}</p>} */}
            </div>
        </div>
    );
}

export default ReportPage;
