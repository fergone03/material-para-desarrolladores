import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabase'; 

type UserProfile = {
  id: string;
  username: string;
  role: string;
};

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, role')
      .order('username', { ascending: true });
    if (error) {
      console.error('Error fetching users:', error.message);
    } else if (data) {
      setUsers(data);
    }
    setLoading(false);
  };

  const filteredUsers = filterRole === 'all'
    ? users
    : users.filter(user => user.role === filterRole);

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>

      <label htmlFor="roleFilter" className="form-label">
        Filtrar por rol:
      </label>
      <select
        id="roleFilter"
        className="form-select mb-3"
        value={filterRole}
        onChange={e => setFilterRole(e.target.value)}
      >
        <option value="all">Todos</option>
        <option value="admin">Admins</option>
        <option value="user">Usuarios</option>
      </select>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Rol</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
