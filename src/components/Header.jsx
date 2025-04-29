// Header.jsx
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            //  className="bg-body-tertiary"
            fixed="top"
            data-bs-theme="light"
            style={{ backgroundColor: '#8B95A8' }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    {/* 로고고, 누르면 홈으로 이동하게 함  */}
                    <img src="./images/logo2.png" alt="로고 " style={{ width: '130px', height: 'auto' }} />
                </Navbar.Brand>

                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* 오른쪽으로 밀기 */}
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={Link}
                            to="/report"
                            style={{ marginLeft: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
                        >
                            Report
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/MyPage"
                            style={{ marginLeft: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
                        >
                            MyPage
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/Logout"
                            style={{ marginLeft: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
