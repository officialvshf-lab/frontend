import { useState } from "react";
import axios from "axios";

export const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= STEP CONTROL ================= */
  const [step, setStep] = useState(1);

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
    amount: 1100
  });

  /* ================= FILE STATES ================= */
  const [photo, setPhoto] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= AGE VALIDATION (16+) ================= */
  const isAgeValid = (dob) => {
    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
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

    setStep(2);
  };

  /* ================= STEP 2 → STEP 3 ================= */
  const paymentDone = () => {
    setStep(3);
  };

  /* ================= FINAL SUBMIT ================= */
  const submitRegistration = async () => {
  if (isSubmitting) return; // ⛔ double click guard

  if (!paymentScreenshot) {
    alert("Please upload payment proof");
    return;
  }

  setIsSubmitting(true); // 🔒 lock submission

  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  data.append("photo", photo);
  data.append("idProof", idProof);
  data.append("paymentScreenshot", paymentScreenshot);

  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Registration successful");
    window.location.reload();
  } catch (err) {
    alert(err?.response?.data?.message || "Registration failed");
  } finally {
    setIsSubmitting(false); // 🔓 unlock
  }
};


  return (


    <div className="main-rg">
      <div style={boxStyle} className="reg">
        <h2>Registration</h2>

        {/* ================= STEP 1 : FORM ================= */}
        {step === 1 && (
          <form onSubmit={proceedToPayment}>


            <div className="form-div">
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />

              <input
                name="fatherName"
                placeholder="Father / Spouse Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-div">

              <input
                type="date"
                name="dob"
                onChange={handleChange}
                required
              />

              {/* ✅ GENDER FIELD */}
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

            </div>


            <div className="form-div">

              <input
                name="mobile"
                placeholder="Mobile"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-div">
              <textarea
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />

              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-div">
              
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                required
              />

              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                required
              />

            </div>


          <div className="form-div">

            <select
              name="membershipType"
              onChange={handleChange}
              value={formData.membershipType}
            >
              <option value="General Member">General Member</option>
              <option value="State Member">State Member</option>
              <option value="District President">District President</option>
            </select>

            <div className="inner-form-div">
              <label>Upload Photo</label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </div>

            <div className="inner-form-div">

              <label>Upload ID Proof</label>
              <input
                type="file"
                onChange={(e) => setIdProof(e.target.files[0])}
                required
              />
            </div>


          </div>


            {/* <button type="submit" className="main-btn okp">Proceed to Payment</button> */}


<button type="submit" className="main-btn okp">
  Proceed to Payment
</button>






          </form>
        )}

        {/* ================= STEP 2 : PAYMENT ================= */}
        {step === 2 && (
          <div style={centerStyle}>
            <h3>Pay ₹{formData.amount}</h3>
            <img src="/images/qr.jpeg" alt="QR Code" width="400" />
            <br /><br />
            {/* <button type="button" className="main-btn okp" onClick={paymentDone}>
              I Have Paid
            </button> */}

<button
  type="button"
  className="main-btn okp"
  onClick={paymentDone}
  disabled={isSubmitting}
>
  I Have Paid
</button>



          </div>
        )}

        {/* ================= STEP 3 : PAYMENT PROOF ================= */}
                    {step === 3 && (
  <div style={centerStyle}>
    <h3 className="okio">Upload Payment Proof</h3>

    <input
      type="file"
      onChange={(e) => setPaymentScreenshot(e.target.files[0])}
      required
    />

    <br /><br />

    <button
      type="button"
      className="main-btn okp"
      onClick={submitRegistration}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit Registration"}
    </button>

    {isSubmitting && (
      <p style={{ color: "orange" }}>
        Uploading files, please wait…
      </p>
    )}
  </div>
)}
      </div>
    </div>

  );
};

/* ================= BASIC STYLES ================= */
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
