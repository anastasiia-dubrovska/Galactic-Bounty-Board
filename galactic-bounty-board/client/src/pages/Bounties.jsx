import { useEffect, useState } from "react";
import axios from "axios";

export default function Bounties() {
  const [bounties, setBounties] = useState([]);
  const [planet, setPlanet] = useState("");
  const [status, setStatus] = useState("");

  const fetchData = async () => {
    const params = {};
    if (planet) params.planet = planet;
    if (status) params.status = status;

    const res = await axios.get("http://localhost:5000/api/bounties", { params });
    setBounties(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [planet, status]);

  const accept = async (id) => {
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:5000/api/bounties/accept/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData(); 
  };

  return (
    <div>
      <h2>All Bounties</h2>

      <div style={{ marginBottom: "10px" }}>
        <select value={planet} onChange={(e) => setPlanet(e.target.value)}>
          <option value="">🌍 Planet (All)</option>
          <option value="Tatooine">Tatooine</option>
          <option value="Naboo">Naboo</option>
          <option value="Alderaan">Alderaan</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="">🟢 Status (All)</option>
          <option value="open">Open</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      {bounties.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{b.title} — 💰{b.reward}</h3>
          <p>{b.description}</p>
          <p>Target: {b.target_name} | Planet: {b.planet}</p>
          <p>Status: {b.status}</p>
          {b.image_url && (<img src={b.image_url} alt={b.target_name} style={{ width: "100px" }} />)}
          {b.status === "open" && <button onClick={() => accept(b.id)}>Accept</button>}
        </div>
      ))}
    </div>
  );
}
