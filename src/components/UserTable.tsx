import "bootstrap-icons/font/bootstrap-icons.css";
import { Table, Button, Form } from "react-bootstrap";
import type { User } from "../types";

interface Props {
  users: User[];
  selected: Set<number>;
  setSelected: (s: Set<number>) => void;
  handleAction: (action: "block" | "unblock" | "delete") => void;
}

const UserTable: React.FC<Props> = ({
  users,
  selected,
  setSelected,
  handleAction,
}) => {
  const toggleSelect = (id: number) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const toggleAll = () => {
    setSelected(
      selected.size === users.length
        ? new Set()
        : new Set(users.map((u) => u.id))
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="btn-group">
          <Button
            variant="outline-primary"
            onClick={() => handleAction("block")}
          >
            <i className="bi bi-lock-fill me-1"></i> <b>Block</b>
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => handleAction("unblock")}
          >
            <i className="bi bi-unlock-fill"></i>
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => handleAction("delete")}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ maxWidth: "40px", width: "40px" }}>
              <Form.Check
                type="checkbox"
                checked={selected.size === users.length && users.length > 0}
                onChange={toggleAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Seen</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort(
              (a, b) =>
                new Date(b.last_login).getTime() -
                new Date(a.last_login).getTime()
            )
            .map((u) => (
              <tr key={u.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selected.has(u.id)}
                    onChange={() => toggleSelect(u.id)}
                  />
                </td>
                <td>
                  <strong>{u.name}</strong>
                </td>
                <td>{u.email}</td>
                <td title={new Date(u.last_login).toLocaleString()}>
                  {timeAgo(new Date(u.last_login))}
                </td>
                <td className="">
                  {u.status === "active" ? "✅ Active" : "🚫 Blocked"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "less than a minute ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export default UserTable;
