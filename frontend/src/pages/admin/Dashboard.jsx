import { useEffect, useState } from "react";
import { fetchAdminProfile } from "../../services/adminApi";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetchAdminProfile().then((res) => setAdmin(res.data.admin));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      {admin ? (
        <p>Welcome {admin.email}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
