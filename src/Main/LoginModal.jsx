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
            <img src="./images/logo.png" alt="로고" className="logo" />
            <h2 className="title">똑똑한 가계부에 오신 것을 환영합니다</h2>
            <h2 className="explain">사진 한 장으로 자동 가계부 작성, 지금 바로 시작해보세요!</h2>

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
                className="login-button"
                style={{
                    backgroundColor: nowAllow ? '#007bff' : '#999',
                    cursor: nowAllow ? 'pointer' : 'not-allowed',
                }}
                disabled={!nowAllow}
            >
                로그인
            </button>

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
