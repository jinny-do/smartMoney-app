import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Profileedit from './Profileedit'; // 모달 컴포넌트
import './mypage.css';


export default function MyPage() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4">
            <div style={{ display: 'flex', height: 'auto' }}>
                {/* 왼쪽 - 사용자 정보 */}
                <div style={{ flex: 2, backgroundColor: '#fdfbe4', padding: '20px' }}>

                    <div className="icon-container">
                        <FaUser className="user" />
                    </div>

                    <ul className="user-info">

                        <li>이름 : 홍길동</li>
                        <li>이메일 : hong@naver.com</li>

                    </ul>

                    <div className="button">
                        <button className="bt" onClick={() => setShowModal(true)}>
                            회원정보 수정
                        </button>

                        <button className="bt" onClick={() => navigate('/', { replace: true })}>
                            로그아웃

                        </button>
                    </div>
                </div>

                {/* 오른쪽 - AI 분석 */}
                <div style={{ flex: 8, padding: '20px' }}>
                    <div className="ai-section">
                        <p className="ai-title">🤖 지갑 걱정, AI가 덜어줄게요!</p>
                        <div className="ai-description">

                            <span className="ai-quote">"내가 뭘 이렇게 많이 썼지?"</span>

                            <span className="ai-subtext">
                                AI가 당신의 하루 또는 한 달 소비 내역을 분석해드릴게요! <br />
                                필요한 건 버튼 하나만 누르면 끝! 🔍
                            </span>
                        </div>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div style={{ display: 'flex' }}>
                        <div className="ai-button-group" style={{ flex: 2, padding: '20px' }}>
                            <button className="ai-button">일일소비 데이터분석🧾</button>
                            <button className="ai-button">한달소비 데이터분석🗓️</button>
                        </div>
                        <div className="ai-result" style={{ flex: 9, padding: '20px' }}>
                            <p>
                                오늘 소비 총 소비는 80,000원 💸
                                <br />
                                쇼핑에 제일 많은 비용을 사용했어요 🛍️ <br />
                                웬만하면 쓸 데 없는 것은 안 사는 것이 좋을 것 같아요 ^^
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* 회원정보 수정 모달 */}
            <Profileedit show={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
}
