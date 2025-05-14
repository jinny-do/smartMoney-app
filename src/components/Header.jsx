import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
<<<<<<< HEAD
    return (
        <Navbar fixed="top" className="custom-navbar">
            <Container className="header-container">
                {/* 왼쪽: 로고 + 텍스트 */}
=======
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <Navbar fixed="top" className="custom-navbar">
            <Container className="header-container">
                {/* 왼쪽: 로고 */}
>>>>>>> 07705cd ( 디자인 적용)
                <div className="header-left">
                    <Navbar.Brand as={Link} to="/" className="navbar-brand">
                        <img src="/images/logo2.png" alt="로고" className="navbar-logo" />
                    </Navbar.Brand>
                </div>

<<<<<<< HEAD
                {/* 오른쪽: 메뉴 */}
=======
                {/* 오른쪽 메뉴 */}
>>>>>>> 07705cd ( 디자인 적용)
                <Nav className="header-right">
                    <Nav.Link as={Link} to="/report">
                        Report
                    </Nav.Link>
                    <Nav.Link as={Link} to="/MyPage">
                        MyPage
                    </Nav.Link>
<<<<<<< HEAD
                    <Nav.Link as={Link} to="/Logout">
=======

                    <Nav.Link as="span" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
>>>>>>> 07705cd ( 디자인 적용)
                        Logout
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
