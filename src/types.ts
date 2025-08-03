export interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "blocked";
  last_login: string;
}