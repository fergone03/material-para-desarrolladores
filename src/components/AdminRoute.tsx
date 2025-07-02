
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import React from 'react';
type Props = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) return <p>Cargando...</p>;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
