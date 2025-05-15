import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Main.css';

const MainPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const formattedDate = startDate.toISOString().split('T')[0];

    // 🧾 가짜 지출 내역 데이터 유지
    const dailyExpenses = [
        { id: 1, date: formattedDate, item: '쇼핑', amount: '4,500원' },
        { id: 2, date: formattedDate, item: '음식', amount: '9,000원' },
        { id: 3, date: formattedDate, item: '기타', amount: '1,250원' },
    ];
    const fixedExpenses = [...dailyExpenses];
    while (fixedExpenses.length < 6) fixedExpenses.push(null);

    const [goal, setGoal] = useState('');

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const key = `goal-${year}-${month}`;
        const savedGoal = localStorage.getItem(key);
        if (savedGoal) {
            setGoal(savedGoal);
        }
    }, []);

    return (
        <div>
            {/* ✅ 목표를 main 위로 옮김 */}
            <div>
                {goal ? (
                    <div className="goal-display">📌 이번 달 목표: {goal}</div>
                ) : (
                    <div className="goal-display">🎯 이번 달 목표를 설정해주세요!</div>
                )}
            </div>

            <main className="main-container">
                <div className="calendar-section">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        inline
                    />
                    <button className="upload-button" onClick={() => navigate('/upload')}>
                        영수증 등록
                    </button>
                </div>

                <div className="expense-section">
                    <h2 className="expense-title">{formattedDate} 지출 내역</h2>
                    <div className="expense-box">
                        {fixedExpenses.map((expense, index) => (
                            <div
                                key={index}
                                className={`expense-item ${expense ? 'expense-filled' : 'expense-empty'} ${
                                    index !== 5 ? 'expense-item-border' : ''
                                }`}
                            >
                                {expense ? (
                                    <>
                                        <span className="expense-name">{expense.item}</span>
                                        <span className="expense-amount">{expense.amount}</span>
                                    </>
                                ) : index === 5 ? (
                                    <button className="plus-button" onClick={() => navigate('/detail')}>
                                        🔍 자세히 보기
                                    </button>
                                ) : (
                                    <span>지출 없음</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
