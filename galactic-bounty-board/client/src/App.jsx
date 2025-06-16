import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bounties from "./pages/Bounties";
import MyBounties from "./pages/MyBounties";
import Navbar from "./components/Navbar";
import CreateBounty from "./pages/CreateBounty";
import Admin from "./pages/Admin";




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Bounties />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my" element={<MyBounties />} />
        <Route path="/create" element={<CreateBounty />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
