import React from "react";

const ConfirmDeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Delete Item?",
  message = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-neet-neutral font-inter rounded-xl shadow-2xl p-6 w-full max-w-xs border border-neet-accent/20">
        <h3 className="text-lg font-semibold text-neet-base-100 mb-2">
          {title}
        </h3>
        <p className="text-neet-accent/70 mb-6 text-sm">
          {message}
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-lg bg-neet-neutral/80 text-neet-base-100 hover:bg-black/30 hover:text-neet-primary transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;