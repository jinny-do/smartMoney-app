import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <Navbar fixed="top" className="custom-navbar">
            <Container className="header-container">
                {/* 왼쪽: 로고 + 텍스트 */}
                <div className="header-left">
                    <Navbar.Brand as={Link} to="/" className="navbar-brand">
                        <img src="/images/logo3.png" alt="로고" className="navbar-logo" />
                    </Navbar.Brand>
                </div>

                {/* 오른쪽: 메뉴 */}
                <Nav className="header-right">
                    <Nav.Link as={Link} to="/report">
                        Report
                    </Nav.Link>
                    <Nav.Link as={Link} to="/MyPage">
                        MyPage
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Logout">
                        Logout
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
