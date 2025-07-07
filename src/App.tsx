import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UsersList from "./components/UsersList";
import AdminRoute from "./components/AdminRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header/>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UsersList />
                </AdminRoute>
              }
            />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
