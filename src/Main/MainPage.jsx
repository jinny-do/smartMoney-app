import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        const alreadyShown = sessionStorage.getItem('goal-alert-shown');
        if (alreadyShown) return;

        async function fetchAndCompare() {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const yearMonth = `${year}-${month}`;

                const resGoal = await axios.get(`/api/goal?userId=3&yearMonth=${yearMonth}`);
                const goal = resGoal.data.amount;

                setGoal(goal);

                const resSpent = await axios.get(`/api/expenses/total?userId=3&yearMonth=${yearMonth}`);
                const total = resSpent.data.total;

                if (goal && total > goal) {
                    alert('❗목표 금액을 초과했습니다!');
                } else if (goal) {
                    alert(`💡 목표까지 ${Number(goal - total).toLocaleString()}원 남았어요!`);
                }

                sessionStorage.setItem('goal-alert-shown', 'true');
            } catch (err) {
                console.error('목표/지출 데이터 불러오기 실패:', err);
            }
        }

        fetchAndCompare();
    }, []);

    // 숫자를 "100,000원" 형식으로 포맷
    const formatCurrency = (value) => {
        if (!value) return '';
        return parseInt(value).toLocaleString() + '원';
    };

    return (
        <div>
            <div
                className="goal-display"
                style={{ backgroundColor: goal ? '#fcf6c9' : '#eee' }}
                onClick={() => navigate('/report')}
            >
                {goal ? (
                    <div className="goal-display">📌 이번 달 목표 금액 : {formatCurrency(goal)}</div>
                ) : (
                    <div className="goal-display">🎯 이번 달 목표가 설정되어 있지 않아요.</div>
                )}
            </div>

            <main className="main-container">
                <div className="calendar-section" style={{ flex: 6, padding: '10px', alignItems: 'center' }}>
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

                    {/* 버튼을 제대로 감싸는 래퍼 */}
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button className="upload-button" onClick={() => navigate('/upload')}>
                            영수증 업로드
                        </button>
                    </div>
                </div>

                <div className="expense-section" style={{ flex: 4, padding: '10px' }}>
                    <h2 className="expense-title"> 🧾 {formattedDate} 지출 내역</h2>
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
                                        자세히 보기
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
