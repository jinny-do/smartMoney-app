import React, { useState, useEffect } from 'react';
import './Login.css';

const User = {
    email: 'abc@naver.com',
    pw: 'abc12345!',
};

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [nowAllow, setNotAllow] = useState(true);

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setEmailValid(regex.test(value));
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
        setPwValid(regex.test(value));
    };

    const handleLogin = () => {
        if (email === User.email && password === User.pw) {
            alert('로그인에 성공했습니다.');
            onLoginSuccess(); // navigate 절대 NO
        } else {
            alert('아이디 또는 비밀번호를 다시 입력해주세요.');
        }
    };

    useEffect(() => {
        setNotAllow(!(emailValid && pwValid));
    }, [emailValid, pwValid]);

    return (
        <div className="login-container">
            <div className="intro">
                <img src="./images/logo3.png" alt="로고" className="logo" />
                <br />
                <p className="intro-title mt-1"> 🤖 AI가 분석해주는 가계부, 목표 소비까지 한눈에! </p>
                <div className="intros">
                    {' '}
                    <p className="intro1"> 🧾 영수증을 찍으면 자동으로 등록돼요! </p>
                    <p className="intro2"> 🧠 AI 한줄 요약 : " 이번 달 외식이 너무 많아요! "</p>
                </div>

                <h2 className="explain">📸 사진 한 장으로 자동 가계부 작성, 지금 바로 시작해보세요!</h2>
            </div>

            <div className="login">
                <input type="email" placeholder="이메일" value={email} onChange={handleEmail} className="input-field" />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePassword}
                    className="input-field"
                />

                <button
                    onClick={handleLogin}
                    className={`my-btn ${nowAllow ? 'active' : 'disabled'}`}
                    disabled={!nowAllow}
                >
                    로그인
                </button>
            </div>
            <div className="signup">
                아직 회원이 아니신가요?{' '}
                <span className="link" onClick={() => (window.location.href = '/register')}>
                    회원가입
                </span>
            </div>
        </div>
    );
}

export default Login;
