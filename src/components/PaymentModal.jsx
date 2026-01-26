import React from "react";

export const PaymentModal = ({ show, onClose, amount }) => {
  if (!show) return null;

  const handlePayment = async () => {
    // CREATE ORDER
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      }
    );

    const order = await res.json();

    // RAZORPAY OPTIONS
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "NGO Donation",
      description: "Support Payment",
      order_id: order.id,

      handler: async (response) => {
        const verify = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payment/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              amount
            })
          }
        );

        const result = await verify.json();

        if (result.success) {
          alert("Payment Successful ✅");
          onClose();
        } else {
          alert("Payment Failed ❌");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Complete Payment</h3>
        <p><strong>Amount:</strong> ₹{amount}</p>

        <button onClick={handlePayment} style={{ marginTop: "15px" }}>
          Pay Now
        </button>

        <div style={{ marginTop: "10px" }}>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

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
