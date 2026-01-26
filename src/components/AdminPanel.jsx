import { useEffect, useState } from "react";
import axios from "axios";

export const AdminPanel = () => {
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [loadingId, setLoadingId] = useState(null);

  const token = localStorage.getItem("adminToken");

  /* 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, [token]);

  /* ================= FETCH MEMBERS ================= */
  const fetchMembers = async (filterStatus = "PENDING") => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/members?status=${filterStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // ✅ SAFETY FIX
      const list = Array.isArray(res.data)
        ? res.data
        : res.data.members || [];

      setMembers(list);
      setStatus(filterStatus);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }
  };

  useEffect(() => {
    fetchMembers("PENDING");
  }, []);

  /* ================= APPROVE ================= */
  const approve = async (id) => {
    if (!window.confirm("Approve this member?")) return;

    setLoadingId(id);

    // optimistic UI
    setMembers((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, approvalStatus: "APPROVED" } : m
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
    } catch {
      alert("Approval failed");
      fetchMembers(status);
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
    } catch {
      alert("Reject failed");
    } finally {
      setLoadingId(null);
    }
  };

  const openFile = (url) => {
    if (!url) return alert("File not available");
    window.open(url, "_blank");
  };

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

      {/* FILTERS */}
      <div style={filters}>
        <button onClick={() => fetchMembers("PENDING")}>Pending</button>
        <button onClick={() => fetchMembers("APPROVED")}>Approved</button>
        <button onClick={() => fetchMembers("REJECTED")}>Rejected</button>
        <button onClick={() => fetchMembers("")}>All</button>
      </div>

      {members.length === 0 && (
        <p style={{ textAlign: "center" }}>No records found</p>
      )}

      {Array.isArray(members) &&
        members.map((m) => (
          <div key={m._id} style={card}>
            <h3>{m.fullName}</h3>

            <p><b>Mobile:</b> {m.mobile}</p>
            <p><b>Email:</b> {m.email}</p>
            <p><b>Membership:</b> {m.membershipType}</p>
            <p><b>Amount:</b> ₹{m.amount}</p>

            <p>
              <b>Status:</b>{" "}
              <span
                style={{
                  color:
                    m.approvalStatus === "APPROVED"
                      ? "green"
                      : m.approvalStatus === "REJECTED"
                      ? "red"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {m.approvalStatus}
              </span>
            </p>

            <hr />

            <button onClick={() => openFile(m.photo)}>View Photo</button>
            <br /><br />
            <button onClick={() => openFile(m.idProof)}>View ID Proof</button>

            {m.idCardPath && (
              <>
                <br /><br />
                <button onClick={() => openFile(m.idCardPath)}>
                  View ID Card
                </button>
              </>
            )}

            {m.approvalStatus === "PENDING" && (
              <div style={actions}>
                <button
                  disabled={loadingId === m._id}
                  onClick={() => approve(m._id)}
                  style={{ background: "green", color: "white" }}
                >
                  Approve
                </button>

                <button
                  disabled={loadingId === m._id}
                  onClick={() => reject(m._id)}
                  style={{ background: "red", color: "white" }}
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
