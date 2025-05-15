import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import 'react-day-picker/dist/style.css';
import './Main.css';

const MainPage = () => {
    const [selected, setSelected] = useState(new Date()); // 선택된 날짜
    const navigate = useNavigate();

    const categories = ['음식', '교통', '쇼핑', '문화', '기타'];

    const formattedDate = selected ? format(selected, 'yyyy-MM-dd') : ''; // 날짜 포맷

    // 상태 정의: goal과 dailyExpensesData 상태
    const [goal, setGoal] = useState(''); // 목표 금액 상태
    const [dailyExpensesData, setDailyExpensesData] = useState({}); // 지출 내역 상태

    // 더미 데이터 설정
    const dailyExpenses = [
        { id: 1, date: formattedDate, item: '쇼핑', amount: '4,500원' },
        { id: 2, date: formattedDate, item: '음식', amount: '9,000원' },
        { id: 3, date: formattedDate, item: '기타', amount: '1,250원' },
        { id: 4, date: formattedDate, item: '쇼핑', amount: '6,000원' }, // 쇼핑 항목 추가
    ];

    // 날짜에 맞춰 지출 항목 합산하기
    const expenseMap = dailyExpenses.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = {}; // 날짜별로 카테고리별 지출 금액을 저장할 객체 초기화
        }
        if (!acc[item.date][item.item]) {
            acc[item.date][item.item] = 0; // 카테고리별 지출 초기화
        }
        acc[item.date][item.item] += parseInt(item.amount.replace(/[^\d]/g, '')); // 금액을 합산
        return acc;
    }, {});

    // 총 합 계산 (모든 카테고리의 지출을 더함)
    const totalAmount = dailyExpenses.reduce((acc, item) => {
        const amountWithoutWon = parseInt(item.amount.replace(/[^\d]/g, '')); // '원' 기호를 제거하고 숫자로 변환
        return acc + amountWithoutWon;
    }, 0); // 초기값은 0

    // 금액 포맷팅 함수
    const formatCurrency = (value) => {
        if (!value) return '0원';
        return parseInt(value).toLocaleString() + '원';
    };

    // 날짜 변경 후 지출 내역 갱신
    useEffect(() => {
        if (!formattedDate) return;
        setDailyExpensesData(expenseMap[formattedDate] || {}); // 해당 날짜의 지출 내역 업데이트
    }, [formattedDate]);

    return (
        <div className="container">
            {/* 목표금액 안내 박스 */}
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

            {/* 메인 레이아웃 */}
            <main className="main-container">
                {/* 📅 달력 섹션 */}
                <div className="calendar-section" style={{ flex: 4, padding: '10px', alignItems: 'center' }}>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        className="responsive-calendar"
                        modifiersClassNames={{
                            selected: 'my-selected',
                            today: 'my-today',
                        }}
                        footer={
                            selected ? (
                                <div className="footer-total">🪙 오늘 쓴 금액: ₩{totalAmount.toLocaleString()}</div>
                            ) : (
                                'Pick a day.'
                            )
                        }
                    />
                    {/* 영수증 업로드 버튼 추가 */}
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <button className="upload-button" onClick={() => navigate('/upload')}>
                            영수증 업로드
                        </button>
                    </div>
                </div>

                {/* 💸 지출 내역 섹션 */}
                <div className="expense-section" style={{ flex: 5, padding: '10px' }}>
                    <h2 className="expense-title"> 🧾 {formattedDate} 지출 내역</h2>
                    <div className="expense-box">
                        {/* 카테고리별로 지출 내역 표시 */}
                        {categories.map((cat, index) => (
                            <div key={index} className="expense-item expense-filled expense-item-border">
                                <span className="expense-name">{cat}</span>
                                <span className="expense-amount">
                                    ₩{formatCurrency(dailyExpensesData[cat] || 0)} {/* 카테고리별 지출 금액 */}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* 자세히 보기 */}
                    <div className="detail-button-wrapper">
                        <button className="plus-button" onClick={() => navigate('/detail')}>
                            자세히 보기
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainPage;
