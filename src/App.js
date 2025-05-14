import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import Home from './components/Home';
import Detail from './ledger/Detail';

import Register from './Main/Register';
import MainPage from './Main/MainPage';
import MyPage from './mypage/MyPage';
import Login from './Main/LoginModal';
import Upload from './upload/Upload';
import ReportPage from './report/ReportPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            {/* 로그인 후에만 헤더 항상 표시 */}
            {isLoggedIn && <Header />}

            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? <Navigate to="/main" /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={isLoggedIn ? <MainPage /> : <Navigate to="/" />} />
                <Route path="/detail" element={isLoggedIn ? <Detail /> : <Navigate to="/" />} />
                <Route path="/MyPage" element={isLoggedIn ? <MyPage /> : <Navigate to="/" />} />
                <Route path="/upload" element={isLoggedIn ? <Upload /> : <Navigate to="/" />} />
                <Route path="/report" element={isLoggedIn ? <ReportPage /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
