import React, { useState, useEffect } from 'react';
import './goal.css';
import axios from 'axios';

export default function GoalSettingPage() {
    const [input, setInput] = useState('');
    const [goal, setGoal] = useState('');

    useEffect(() => {
        // const now = new Date();
        // const year = now.getFullYear();
        // const month = String(now.getMonth() + 1).padStart(2, '0');
        // const key = `goal-${year}-${month}`;
        // const savedGoal = localStorage.getItem(key);
        // if (savedGoal) setGoal(savedGoal);
        // MainPage.jsx useEffect 안에 추가해도 됨 (임시용)
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const key = `goal-${year}-${month}`;
        const tempGoal = localStorage.getItem(key);
        if (tempGoal) setGoal(tempGoal);
    }, []);

    const handleConfirm = async () => {
        if (!input.trim()) {
            alert('⚠️ 목표 금액을 입력해 주세요!');
            return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const yearMonth = `${year}-${month}`;

        setGoal(input);

        try {
            await axios.post('/api/goal', {
                userId: 3,
                yearMonth,
                amount: parseInt(input),
            });

            alert('✅ 이번 달 목표가 저장되었습니다!');
        } catch (err) {
            console.error('저장 실패:', err);
            alert('❌ 저장 실패! 다시 시도해주세요.');
        }
    };

    // 숫자만 입력 가능하게
    const handleInputChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setInput(onlyNums);
    };

    return (
        <div className="goal-setting-wrapper">
            <div className="goal">
                <label>📌 목표 금액 입력 :</label>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="  이번 달 목표 금액을 입력해 주세요! (숫자만 입력해 주세요) "
                />
                <button className="goal-button" onClick={handleConfirm}>
                    확인
                </button>
            </div>
        </div>
    );
}
