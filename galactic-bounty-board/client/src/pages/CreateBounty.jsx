import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBounty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target_name: "",
    planet: "",
    reward: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/bounties", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Bounty created!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Creating error");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Create new Bounty</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input name="target_name" placeholder="Target Name" value={form.target_name} onChange={handleChange} required />
      <input name="planet" placeholder="Planet" value={form.planet} onChange={handleChange} required />
      <input name="reward" placeholder="Reward" type="number" value={form.reward} onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
  );
}
