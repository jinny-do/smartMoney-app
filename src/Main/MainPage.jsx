import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Main.css';

const MainPage = () => {
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const formattedDate = startDate.toISOString().split('T')[0];

    // 지출 내역을 비워두고, 향후 서버 연동 시 사용 예정
    const dailyExpenses = []; // ← 향후 DB에서 불러올 자리

    // 6칸 고정 처리
    const fixedExpenses = [...dailyExpenses];
    while (fixedExpenses.length < 6) fixedExpenses.push(null);

    return (
        <div>
            <Header />
            <main className="main-container">
                {/* 캘린더 영역 */}
                <div className="calendar-section">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        inline
                    />
                    <button className="upload-button" onClick={() => navigate('/upload')}>
                        영수증 업로드
                    </button>
                </div>

                {/* 지출 내역 영역 */}
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
