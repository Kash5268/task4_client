import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import RegistrationForm from "../../components/RegistrationForm";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(name, email, password);
      await axios.post("https://task4-server-v8pg.onrender.com/api/register", { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.response?.status === 400) {
        setError("Email already registered.");
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <Container fluid className="register-page">
      <Row className="vh-100 vw-100">
        <Col md="6" className="form-side px-4 py-5">
          <h2 className="logo px-5 py-2 text-primary">THE APP</h2>
          <div
            className="w-100 align-self-center"
            style={{ maxWidth: "400px" }}
          >
            <p className="text-muted mb-0">Create your account</p>
            <h4 className="mb-4">Sign Up for The App</h4>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">Registration successful!</Alert>
            )}

            <RegistrationForm
              name={name}
              email={email}
              password={password}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="d-flex justify-content-between mt-3 small justify-content-end">
            <span>
              Already have an account?{" "}
              <a
                href="#"
                style={{
                  color: "#0d6efd",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Sign in
              </a>
            </span>
          </div>
        </Col>

        <Col md="6" className="image-side d-none d-md-block"></Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
