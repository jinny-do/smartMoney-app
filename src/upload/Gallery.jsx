import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // 모달에 표시할 이미지
    const navigate = useNavigate(); // navigate를 사용해 페이지 이동

    useEffect(() => {
        const savedImages = JSON.parse(localStorage.getItem('receipts') || '[]');
        setImages(savedImages);
    }, []);

    // 이미지 삭제 함수
    const handleDeleteImage = (imageToDelete) => {
        // 확인 창을 띄워 사용자에게 삭제 여부를 묻기
        const userConfirmation = window.confirm('정말로 이 사진을 삭제하시겠습니까?');
        if (!userConfirmation) return;

        // 삭제할 이미지 제외한 새로운 목록을 만든 후 상태를 업데이트
        const updatedImages = images.filter((img) => img !== imageToDelete);
        setImages(updatedImages); // 상태 업데이트
        localStorage.setItem('receipts', JSON.stringify(updatedImages)); // 로컬스토리지에 업데이트된 목록 저장
    };

    return (
        <div className="gallery-wrapper">
            <h2 className="gallery-title">📂 업로드한 영수증 목록</h2>

            {images.length === 0 ? (
                <p className="no-image">저장된 이미지가 없습니다.</p>
            ) : (
                <div className="image-grid">
                    {images.map((src, idx) => (
                        <div key={idx} className="image-item">
                            <img
                                src={src}
                                alt={`receipt-${idx}`}
                                className="receipt-image"
                                onClick={() => setSelectedImage(src)} // 클릭 시 이미지 확대
                            />
                            {/* 이미지 삭제 버튼 */}
                            <button className="delete-button" onClick={() => handleDeleteImage(src)}>
                                <RiDeleteBin5Line />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 모달 */}
            {selectedImage && (
                <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
                    <img
                        src={selectedImage}
                        alt="확대 이미지"
                        className="modal-image"
                        onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 모달이 닫히지 않도록
                    />
                </div>
            )}

            {/* 카메라로 가기 버튼 */}
            <button className="gallery-button mt-4" onClick={() => navigate('/camera')}>
                📷 카메라로 가기
            </button>

            {/* 업로드 페이지로 가기 버튼 */}
            <button className="gallery-button mt-4" onClick={() => navigate('/upload')}>
                📤 업로드 페이지로 가기
            </button>
            {/* 일단 두 개 다 해놨는데 둘 중에 필요없다고 생각 되면 빼기  */}
        </div>
    );
}
