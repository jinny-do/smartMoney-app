// Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reg.css'; // 스타일 분리한 파일 불러오기

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        alert('회원가입 완료!');
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2 className="register-title">회원가입</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    className="register-input"
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    placeholder="이메일"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register-input"
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="register-button">
                    가입하기
                </button>
            </form>
        </div>
    );
}

export default Register;
