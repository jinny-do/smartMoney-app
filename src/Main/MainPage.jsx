import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { CiCirclePlus } from 'react-icons/ci';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './Main.css';

const MainPage = () => {
    const [selected, setSelected] = useState(new Date()); // 기본값 추가
    const navigate = useNavigate();

    // 선택된 날짜가 있는 경우에만 포맷팅
    const formattedDate = selected ? selected.toISOString().split('T')[0] : '';

    const dailyExpenses = []; // 실제 지출 데이터는 나중에 API 연결 예정?
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
            <div>
                {goal ? (
                    <div className="goal-display">📌 이번 달 목표: {goal}</div>
                ) : (
                    <div className="goal-display">🎯 이번 달 목표가 설정되어 있지 않아요.</div>
                )}
            </div>

            <main className="main-container">
                <div className="calendar-section" style={{ flex: 7, padding: '10px' }}>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        className="responsive-calendar"
                        modifiersClassNames={{
                            selected: 'my-selected',
                            today: 'my-today',
                        }}
                    />

                    <button className="upload-button" onClick={() => navigate('/upload')}>
                        영수증 업로드
                    </button>
                </div>

                <div className="expense-section" style={{ flex: 4, padding: '10px' }}>
                    <p className="expense-title">
                        {' '}
                        {''}🧾{formattedDate} 지출 내역
                    </p>
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
                                    <button className="plus-button " onClick={() => navigate('/detail')}>
                                        +
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
