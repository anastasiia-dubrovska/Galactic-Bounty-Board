import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, background: "#eee", marginBottom: 20 }}>
      <Link to="/">Bounties</Link> | <Link to="/my">My Bounties</Link> |{" "}
      <Link to="/create">+ New Bounty</Link> | 
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link> |{" "}
      <Link to="/admin">Admin</Link> | 
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
