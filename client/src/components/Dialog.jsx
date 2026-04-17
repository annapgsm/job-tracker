import { FaTimes } from 'react-icons/fa';

function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Dialog;