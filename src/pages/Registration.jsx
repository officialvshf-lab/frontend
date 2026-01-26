import { useState, useEffect } from "react";
import axios from "axios";

export const Registration = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);

  /* ================= MEMBERSHIP AMOUNTS ================= */
  const MEMBERSHIP_AMOUNT = {
    "General Member": 1,
    "District Member": 2100,
    "State Member": 5100,
    "National Member": 11000
  };

  /* ================= FORM DATA ================= */
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "Male",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    membershipType: "General Member",
    amount: MEMBERSHIP_AMOUNT["General Member"]
  });

  /* ================= FILE STATES ================= */
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);

  /* ================= AUTO AMOUNT UPDATE ================= */
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      amount: MEMBERSHIP_AMOUNT[prev.membershipType]
    }));
  }, [formData.membershipType]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= AGE VALIDATION ================= */
  const isAgeValid = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 16;
  };

  /* ================= STEP 1 → STEP 2 ================= */
  const proceedToPayment = (e) => {
    e.preventDefault();

    if (!isAgeValid(formData.dob)) {
      alert("Minimum age is 16 years");
      return;
    }

    if (!photo || !idProof) {
      alert("Photo and ID Proof are required");
      return;
    }

    if (!agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    setStep(2);
  };

  /* ================= RAZORPAY PAYMENT ================= */
  const startRazorpayPayment = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: formData.amount })
        }
      );

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "NGO Registration",
        description: `${formData.membershipType} Fee`,
        order_id: order.id,

        handler: async (response) => {
          const verify = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                amount: formData.amount
              })
            }
          );

          const result = await verify.json();

          if (result.success) {
            submitRegistration(response.razorpay_payment_id);
          } else {
            alert("Payment verification failed");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      alert("Payment initiation failed");
    }
  };

  /* ================= FINAL REGISTRATION SUBMIT ================= */
  const submitRegistration = async (paymentId) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("photo", photo);
    data.append("idProof", idProof);
    data.append("paymentId", paymentId);
    data.append("paymentStatus", "PAID");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Registration successful 🎉");
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-rg">
      <div style={boxStyle} className="reg">
        <h2>Registration</h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <form onSubmit={proceedToPayment}>
            <div className="form-div">
              <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
              <input name="fatherName" placeholder="Father / Spouse Name" onChange={handleChange} required />
            </div>

            <div className="form-div">
              <input type="date" name="dob" onChange={handleChange} required />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-div">
              <input name="mobile" placeholder="Mobile" onChange={handleChange} required />
              <input name="email" placeholder="Email" onChange={handleChange} required />
            </div>

            <div className="form-div">
              <textarea name="address" placeholder="Address" onChange={handleChange} required />
              <input name="city" placeholder="City" onChange={handleChange} required />
            </div>

            <div className="form-div">
              <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
              <input name="state" placeholder="State" onChange={handleChange} required />
            </div>

            <div className="form-div">
              <select
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
              >
                <option>General Member 1</option>
                <option>District Member 2100</option>
                <option>State Member 5100</option>
                <option>National Member 11000</option>
              </select>

              <div>
                <label>Upload Photo</label>
                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
              </div>

              <div>
                <label>Upload ID Proof</label>
                <input type="file" onChange={(e) => setIdProof(e.target.files[0])} required />
              </div>
            </div>

            {/* ===== Terms & Conditions ===== */}
            <div style={{ marginTop: "15px" }}>
              <label className="atoz">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />{" "}
                I agree that the registration fee is non-refundable and accept the Terms & Conditions.
              </label>
            </div>

            <button type="submit" className="main-btn okp">
              Proceed to Payment (₹{formData.amount})
            </button>
          </form>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div style={centerStyle}>
            <h3>
              {formData.membershipType} – ₹{formData.amount}
            </h3>

            <p style={{ color: "orange" }}>
              ⚠️ Amount once paid is <b>non-refundable</b>
            </p>

            <button
              type="button"
              className="main-btn okp"
              onClick={startRazorpayPayment}
              disabled={isSubmitting}
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= STYLES ================= */
const boxStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px"
};

const centerStyle = {
  textAlign: "center"
};
