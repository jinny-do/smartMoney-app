import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';

export default function Header() {
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
                    to="/mypage"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    MyPage
                </Nav.Link>

                <Nav.Link
                    as={NavLink}
                    to="/logout"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                    Logout
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
