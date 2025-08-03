import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import type { User } from "../../types";
import "./LoginPage.css";
import LoginForm from "../../components/LoginForm";

interface Props {
  setUser: (user: User) => void;
}

const LoginPage: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        " http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError("User is blocked.");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <Container fluid className="login-page ">
      <Row className="vh-100 vw-100">
        <Col md="6" className="form-side px-4 py-5">
          <h2 className="logo px-5 py-2 px-s-0 text-primary">THE APP</h2>
          <div
            className="w-100 align-self-center"
            style={{ maxWidth: "400px" }}
          >
            <p className="text-muted mb-0">Start your journey</p>
            <h4 className="mb-4">Sign In to The App</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="d-flex justify-content-between mt-3 small justify-content-end px-4">
            <span>
              Don’t have an account?{" "}
              <a
                href="#"
                style={{
                  color: "#0d6efd",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register");
                }}
              >
                Sign up
              </a>
            </span>
            <a
              href="#"
              style={{
                color: "#0d6efd",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </a>
          </div>
        </Col>

        <Col md="6" className="image-side d-none d-md-block"></Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
