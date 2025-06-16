import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBounties() {
  const [mine, setMine] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/bounties/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMine(res.data));
  }, []);

  return (
    <div>
      <h2>My Bounties</h2>
      {mine.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}
