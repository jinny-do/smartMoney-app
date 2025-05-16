
// src/upload/Camera.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Camera() {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const streamRef = useRef(null); // 스트림 저장용


    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();

                    streamRef.current = stream; // 스트림 저장

                }
            } catch (err) {
                console.error('카메라 접근 실패:', err);
                alert('카메라를 사용할 수 없습니다.');
                navigate('/upload');
            }
        };

        startCamera();


        // ✅ 페이지 떠날 때 카메라 꺼지게 하기

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, [navigate]);


    return (
        <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            <h2>📷 카메라 촬영</h2>

            <video
                ref={videoRef}
                width="600"
                height="450"
                autoPlay
                playsInline
                muted
                style={{
                    border: '3px solid #999',
                    borderRadius: '12px',
                    marginBottom: '20px',
                }}
            />

            <br />
            <button
                onClick={() => navigate('/upload')}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: '#ff7f50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
            >

                ← 돌아가기
            </button>
        </div>
    );
}
