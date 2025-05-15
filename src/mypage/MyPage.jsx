import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Profileedit from './Profileedit'; // 모달 컴포넌트
import './mypage.css';
import axios from 'axios'; // axios를 통해 서버에 요청

export default function MyPage() {
    const [showModal, setShowModal] = useState(false); // 회원정보 수정 모달
    const [analysisData, setAnalysisData] = useState(null); // AI 분석 결과 저장 상태
    const navigate = useNavigate();

    // 회원탈퇴 처리
    const handleDeleteAccount = async () => {
        const userConfirmation = window.confirm('정말로 회원 탈퇴하시겠습니까?');
        if (!userConfirmation) return;

        try {
            // 탈퇴 요청 API 호출
            const response = await axios.delete('/api/user/delete', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // 로그인 토큰
                },
            });

            if (response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.');
                localStorage.removeItem('token'); // 토큰 삭제하여 로그아웃
                navigate('/', { replace: true }); // 홈페이지로 이동
            }
        } catch (error) {
            console.error('회원 탈퇴 실패:', error);
            alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 일일 소비 분석 API 호출
    const handleDailyAnalysis = async () => {
        try {
            // 실제 API 호출
            const response = await axios.get('/api/ai/daily-spending-analysis', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // 로그인 토큰
                },
            });
            // 받은 데이터를 상태에 저장
            setAnalysisData(response.data); // 예시: { totalSpending: 80000, mostSpentCategory: '쇼핑' }
        } catch (error) {
            console.error('일일 소비 분석 실패:', error);
            alert('일일 소비 분석에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 한 달 소비 분석 API 호출
    const handleMonthlyAnalysis = async () => {
        try {
            // 실제 API 호출
            const response = await axios.get('/api/ai/monthly-spending-analysis', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // 로그인 토큰
                },
            });
            // 받은 데이터를 상태에 저장
            setAnalysisData(response.data); // 예시: { totalSpending: 300000, mostSpentCategory: '쇼핑' }
        } catch (error) {
            console.error('한 달 소비 분석 실패:', error);
            alert('한 달 소비 분석에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="mypage-wrapper">
            <div style={{ display: 'flex', height: 'auto' }}>
                {/* 왼쪽 - 사용자 정보 */}
                <div className="profile-container" style={{ flex: 3, backgroundColor: '#fdfbe4', padding: '20px' }}>
                    <div className="icon-container">
                        <FaUser className="user" />
                    </div>

                    <ul className="user-info">
                        <li> ✏️ 이름 : 홍길동</li>
                        <li>📧 이메일 : hong@naver.com</li>
                        <li>📆 가입날짜 : 2025-05-16</li>
                    </ul>

                    <div className="button">
                        <button className="bt" onClick={() => setShowModal(true)}>
                            회원정보 수정
                        </button>
                        <button className="bt" onClick={handleDeleteAccount}>
                            회원탈퇴
                        </button>
                    </div>
                </div>

                {/* 오른쪽 - AI 분석 */}
                <div style={{ flex: 8, padding: '20px' }}>
                    <div className="ai-section">
                        <p className="ai-title">🤖 지갑 걱정, AI가 덜어줄게요!</p>
                        <div className="ai-description">
                            <span className="ai-quote">"내가 뭘 이렇게 많이 썼지?" </span>
                            <span className="ai-subtext">
                                AI가 당신의 하루 또는 한 달 소비 내역을 분석해드릴게요! <br />
                                필요한 건 버튼 하나만 누르면 끝! 🔍
                            </span>
                        </div>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <div className="mt-1" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <div className="ai-button-group" style={{ flex: 2, padding: '20px' }}>
                            <button className="ai-button" onClick={handleDailyAnalysis}>
                                일일소비 <br />
                                데이터분석🧾
                            </button>
                            <button className="ai-button" onClick={handleMonthlyAnalysis}>
                                한달소비 <br />
                                데이터분석🗓️
                            </button>
                        </div>
                        <div className="ai-result" style={{ flex: 9, padding: '20px' }}>
                            {analysisData ? (
                                <p>
                                    💸 오늘 소비 총액은 {analysisData.totalSpending}원이에요.
                                    <br />
                                    🛍️ 오늘 비용을 가장 많이 소비한 곳은 "{analysisData.mostSpentCategory}"이에요!{' '}
                                    <br />
                                    🙅 웬만하면 쓸 데 없는 것은 사지 않는 것이 좋을 것 같아요 ^^
                                </p>
                            ) : (
                                <div className="waiting-message">
                                    <p>🔄 분석 결과를 준비 중입니다...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 회원정보 수정 모달 */}
            <Profileedit show={showModal} handleClose={() => setShowModal(false)} />
        </div>
    );
}
