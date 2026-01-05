import { useEffect, useState } from "react";
import axios from "axios";

export const AdminPanel = () => {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loadingId, setLoadingId] = useState(null); // 🔥 NEW

  const token = localStorage.getItem("adminToken");

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, [token]);

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async (filterStatus = "pending") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/members?status=${filterStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMembers(res.data);
      setStatus(filterStatus);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  useEffect(() => {
    fetchMembers("pending");
  }, []);

  /* ================= APPROVE (OPTIMISTIC UI) ================= */
  const approve = async (id) => {
    if (!window.confirm("Approve this member?")) return;

    setLoadingId(id);

    // 🔥 INSTANT UI UPDATE
    setMembers((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, paymentStatus: "approved" } : m
      )
    );

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      alert("Approval failed. Please refresh.");
      fetchMembers(status); // rollback
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= REJECT ================= */
  const reject = async (id) => {
    if (!window.confirm("Reject this member?")) return;

    setLoadingId(id);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchMembers(status);
    } catch (err) {
      alert("Reject failed");
    } finally {
      setLoadingId(null);
    }
  };

  /* ================= OPEN FILE ================= */
  const openFile = (url) => {
    if (!url) {
      alert("File not available");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div style={container}>
      <div style={header}>
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* FILTER BUTTONS */}
      <div style={filters}>
        <button onClick={() => fetchMembers("pending")}>Pending</button>
        <button onClick={() => fetchMembers("approved")}>Approved</button>
        <button onClick={() => fetchMembers("rejected")}>Rejected</button>
        <button onClick={() => fetchMembers("")}>All</button>
      </div>

      {members.length === 0 && (
        <p style={{ textAlign: "center" }}>No records found</p>
      )}

      {members.map((m) => (
        <div key={m._id} style={card}>
          <h3>{m.fullName}</h3>

          <p><b>Father / Spouse:</b> {m.fatherName}</p>
          <p><b>Gender:</b> {m.gender}</p>
          <p><b>DOB:</b> {new Date(m.dob).toLocaleDateString()}</p>
          <p><b>Mobile:</b> {m.mobile}</p>
          <p><b>Email:</b> {m.email}</p>
          <p><b>Address:</b> {m.address}</p>
          <p><b>City:</b> {m.city}</p>
          <p><b>Pincode:</b> {m.pincode}</p>
          <p><b>State:</b> {m.state}</p>
          <p><b>Membership:</b> {m.membershipType}</p>
          <p><b>Amount:</b> ₹{m.amount}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                fontWeight: "bold",
                color:
                  m.paymentStatus === "approved"
                    ? "green"
                    : m.paymentStatus === "rejected"
                    ? "red"
                    : "orange"
              }}
            >
              {m.paymentStatus.toUpperCase()}
            </span>
          </p>

          <hr />

          <p><b>Attachments:</b></p>

          <button onClick={() => openFile(m.photo)}>View Photo</button>
          <br /><br />

          <button onClick={() => openFile(m.idProof)}>View ID Proof</button>
          <br /><br />

          <button onClick={() => openFile(m.paymentScreenshot)}>
            View Payment Proof
          </button>

          {m.idCardPath && (
            <>
              <br /><br />
              <button onClick={() => openFile(m.idCardPath)}>
                View ID Card
              </button>
            </>
          )}

          {/* ACTION BUTTONS */}
          {m.paymentStatus === "pending" && (
            <div style={actions}>
              <button
                disabled={loadingId === m._id}
                onClick={() => approve(m._id)}
                style={{
                  background: loadingId === m._id ? "gray" : "green",
                  color: "white",
                  cursor:
                    loadingId === m._id ? "not-allowed" : "pointer"
                }}
              >
                {loadingId === m._id ? "Approving..." : "Approve"}
              </button>

              <button
                disabled={loadingId === m._id}
                onClick={() => reject(m._id)}
                style={{
                  background: loadingId === m._id ? "gray" : "red",
                  color: "white",
                  cursor:
                    loadingId === m._id ? "not-allowed" : "pointer"
                }}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

/* ================= STYLES ================= */

const container = {
  maxWidth: "1000px",
  margin: "20px auto",
  padding: "20px"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const filters = {
  margin: "15px 0",
  display: "flex",
  gap: "10px"
};

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "6px",
  marginBottom: "15px"
};

const actions = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};
