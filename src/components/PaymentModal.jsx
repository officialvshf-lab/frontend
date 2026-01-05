import React from "react";

export const PaymentModal = ({
  show,
  onClose,
  amount,
  onScreenshotChange
}) => {
  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Complete Payment</h3>

        <p><strong>Amount:</strong> ₹{amount}</p>

        <img
          src="/qr.png"
          alt="Payment QR"
          style={{ width: "200px", margin: "10px 0" }}
        />

        <p>Scan QR and complete payment</p>

        <label>Upload Payment Screenshot *</label>
        <input
          type="file"
          accept="image/*"
          onChange={onScreenshotChange}
          required
        />

        <div style={{ marginTop: "15px" }}>
          <button onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

/* ===== simple inline styles ===== */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center"
};
