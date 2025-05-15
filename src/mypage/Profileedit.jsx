// src/EditProfileModal.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Edit.css'; // 이 안에 Bootstrap 덮는 스타일 지정 가능

export default function Profileedit({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} centered className="my-modal">
            <Modal.Header closeButton>
                <Modal.Title>회원정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" placeholder="이름 입력" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control type="email" placeholder="이메일 입력" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="password" placeholder="새 비밀번호 입력" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary">저장</Button>
            </Modal.Footer>
        </Modal>
    );
}
