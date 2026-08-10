import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ManagePassword from "./pages/ManagePassword";
import ManageAddress from "./pages/ManageAddress";
import AdminLogin from "./components/AdminLogin";
import Orders from "./pages/Orders";
import Payment from "./components/Payment";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {

  const location = useLocation();

  // Header and Footer hidden on all admin routes
  const adminRoutes = ["/adminlogin", "/adminDashboard"];
  const isAdminRoute = adminRoutes.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">

      {!isAdminRoute && <Header />}

      <main className="flex-grow-1">
        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

``
          {/* Admin route — no ProtectedRoute wrapper yet,
              add AdminProtectedRoute here later when you implement role-check */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />

          {/* Protected routes */}
          <Route path="/reset-password" element={<ProtectedRoute><ManagePassword /></ProtectedRoute>} />
          <Route path="/manage-address" element={<ProtectedRoute><ManageAddress /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />

        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
