import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
//import { useState } from 'react';

import Header from './components/Header';
import Home from './components/Home';
import Detail from './ledger/Detail';
import PageNotFound from './PageNotFound';
import MyPage from './mypage/MyPage';

function App() {
    return (
        <div className="container py-5">
            <BrowserRouter>
                {/* BrowserRouter로 앱 전체를 감싸야 라우팅 기능을 사용할 수 있다 */}
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {/* 라우트 */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/detail" element={<Detail />} />

                                <Route path="/mypage" element={<MyPage />} />

                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={3} className="d-none d-sm-block mt-3">
                            {/* d-none: 모두 안보이게한 뒤 d-sm-block => small사이즈부터 보여준다 */}
                            {/* <Side onShowLogin={onShowLoginChange} /> */}
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
