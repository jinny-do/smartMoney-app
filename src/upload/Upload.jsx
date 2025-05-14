//Upload.jsx

import React from 'react';
import { FaCameraRetro } from 'react-icons/fa';
import './upload.css';

export default function Upload() {
    return (
        <div>
            <p className="text"> [사진을 직접 촬영하거나, 파일을 업로드해 주세요!] </p>
            <div className="camera-icon">
                <FaCameraRetro />
            </div>

            <div className="camera-button-group">
                <button className="camera-button">갤러리에서 이미지 불러오기</button>
                <button className="camera-button">카메라 업로드</button>
                <button className="camera-button">업로드 영수증 보기</button>
            </div>
        </div>
    );
}
