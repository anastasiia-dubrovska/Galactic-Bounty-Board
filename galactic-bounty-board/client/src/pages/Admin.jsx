import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Acess is forbidden"));
  }, []);

  return (
    <div>
      <h2>🔐 Admin Panel</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            👤 {u.username} — 📝 Posted: {u.posted_count} | ✅ Accepted: {u.accepted_count}
          </li>
        ))}
      </ul>
    </div>
  );
}
