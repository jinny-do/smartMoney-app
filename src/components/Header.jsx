import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // ✅ NavLink 사용
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

export default function Header() {
    return (
        <Navbar fixed="top" className="custom-navbar">
            <Container className="header-container">
                <div className="header-left">
                    <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
                        <img src="/images/logo2.png" alt="로고" className="navbar-logo" />
                    </Navbar.Brand>
                </div>

                <div className="header-right">
                    <NavLink to="/report" className="nav-link">
                        Report
                    </NavLink>
                    <NavLink to="/MyPage" className="nav-link">
                        MyPage
                    </NavLink>
                    <NavLink to="/Logout" className="nav-link">
                        Logout
                    </NavLink>
                </div>
            </Container>
        </Navbar>
    );
}
