import { Navbar, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  setUser: (user: null) => void;
}

const DashboardNavbar: React.FC<Props> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar bg="light" className="shadow-sm">
      <Container fluid className="justify-content-between px-4">
        <Navbar.Brand className="fw-bold text-primary">User Dashboard</Navbar.Brand>
        <Button variant="outline-secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
