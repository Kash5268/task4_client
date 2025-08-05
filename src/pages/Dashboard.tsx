import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";
import DashboardNavbar from "../components/DashboardNavbar";
import UserTable from "../components/UserTable";

interface Props {
  user: User | null;
  setUser: (u: User | null) => void;
}

const Dashboard: React.FC<Props> = ({ user, setUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const fetchUsers = (user: User | null) => {
    axios
      .post<User[]>(
        "https://task4-server-v8pg.onrender.com/api/users",
        { user },
        {
          withCredentials: true,
        }
      )
      .then((res) => setUsers(res.data))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    console.log(user)
    if (!user) navigate("/login");
    fetchUsers(user);
  }, [user]);

  const handleAction = async (action: "block" | "unblock" | "delete") => {
    try {
      const ids = Array.from(selected);
      await axios.patch(
        `https://task4-server-v8pg.onrender.com/api/users/${action}`,
        { ids },
        { withCredentials: true }
      );
      if (user && ids.includes(user.id) && action === "block") {
        setUser(null);
      } else {
        fetchUsers(user);
        setMessage(
          `${action.charAt(0).toUpperCase() + action.slice(1)} successful.`
        );
        setSelected(new Set());
      }
    } catch {
      setMessage("Action failed.");
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 vw-100">
      <DashboardNavbar setUser={setUser} />
      <div className="p-4">
        {message && <div className="alert alert-info">{message}</div>}
        <UserTable
          users={users}
          selected={selected}
          setSelected={setSelected}
          handleAction={handleAction}
        />
      </div>
    </div>
  );
};

export default Dashboard;
