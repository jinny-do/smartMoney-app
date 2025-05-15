import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // useNavigate 추가
import axios from 'axios'; // axios 추가
import './Header.css';

export default function Header() {
    const navigate = useNavigate(); // useNavigate 훅을 사용해 페이지 이동 처리

    // 로그아웃 처리 (서버와 연결)
    const handleLogout = async () => {
        try {
            // 서버로 로그아웃 요청
            const response = await axios.post(
                '/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // 헤더에 토큰 추가
                    },
                }
            );

            if (response.status === 200) {
                // 서버에서 로그아웃 처리가 완료되면, 클라이언트에서 토큰 삭제
                localStorage.removeItem('token');
                alert('로그아웃이 완료되었습니다.');

                // 로그인 페이지로 이동
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <Navbar className="custom-navbar">
            {/* 왼쪽: 로고 + 텍스트 */}
            <div className="header-left">
                <Navbar.Brand as={Link} to="/" className="navbar-brand">
                    <img src="/images/logo3.png" alt="로고" className="navbar-logo" />
                </Navbar.Brand>
            </div>

            {/* 오른쪽: 메뉴 */}
            <Nav className="header-right">
                <Nav.Link
                    as={NavLink}
                    to="/report"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    Report
                </Nav.Link>

                <Nav.Link
                    as={NavLink}
                    to="/gallery"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    Gallery
                </Nav.Link>

                <Nav.Link
                    as={NavLink}
                    to="/mypage"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    MyPage
                </Nav.Link>

                {/* 로그아웃 처리 */}
                <Nav.Link
                    as={NavLink}
                    to="/"
                    className="nav-link"
                    onClick={handleLogout} // 로그아웃 버튼 클릭 시 handleLogout 호출
                >
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
