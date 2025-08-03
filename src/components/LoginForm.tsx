import { Form, Button } from "react-bootstrap";

interface Props {
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const LoginFrom: React.FC<Props> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="test@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="·········"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {/*<Form.Group className="mb-3 d-flex align-items-center">
        <Form.Check
          type="checkbox"
          label="Remember me"
          className="mb-3"
        />
      </Form.Group>*/}

      <Button type="submit" className="w-100 btn-primary">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginFrom;
