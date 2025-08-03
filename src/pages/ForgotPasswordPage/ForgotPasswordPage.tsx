// src/pages/auth/ForgotPasswordPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.patch("http://localhost:5000/api/forgot-password", { email, newPassword: password });
      setMessage("Password has been reset successfully.");
    } catch (err: any) {
      console.error(err);
      setError("Failed to reset password. Try again.");
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="vh-100 vw-100">
        <Col md="6" className="form-side px-4 py-5">
          <h2 className="logo px-5 py-2 text-primary">THE APP</h2>
          <div
            className="w-100 align-self-center"
            style={{ maxWidth: "400px" }}
          >
            <p className="text-muted mb-0">Forgot your password?</p>
            <h4 className="mb-4">Reset Password</h4>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <ForgotPasswordForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="d-flex justify-content-end mt-3 small px-4">
            <span>
              Remembered it?{" "}
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
                Back to login
              </a>
            </span>
          </div>
        </Col>

        <Col md="6" className="image-side d-none d-md-block"></Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;
