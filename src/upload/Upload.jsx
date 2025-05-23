import React, { useRef } from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import './upload.css';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const openFilePicker = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            console.log('선택된 파일:', file);

        }
    };

    return (
        <div>
            <p className="text">[영수증 사진을 직접 촬영하거나, 파일을 업로드해 주세요!]</p>
            <div className="camera-icon">
                <FaCameraRetro />
            </div>

            <div className="camera-button-group">
                <button className="camera-button" onClick={openFilePicker}>
                    갤러리에서 이미지 불러오기
                </button>
                <button className="camera-button" onClick={() => navigate('/camera')}>
                    촬영하기
                </button>


                <button className="camera-button">업로드한 영수증 보기</button>

            </div>

            {/* 숨겨진 파일 업로드 input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
}
