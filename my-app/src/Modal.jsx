import React from 'react';

const Modal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{user.name}</h2>
        <p>Возраст: {user.age}</p>
        <p>Адрес: {user.address.city}, {user.address.street}</p>
        <p>Номер телефона: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Modal;
