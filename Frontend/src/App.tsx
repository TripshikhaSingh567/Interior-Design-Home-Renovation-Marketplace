import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import FindDesigners from "./pages/FindDesigners";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DesignerProfile from "./pages/DesignerProfile";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateProject from "./pages/CreateProject";
import ConsultationRequest from "./pages/ConsultationRequest";
import Quotation from "./pages/Quotation";
import DesignReview from "./pages/DesignReview";
import Milestones from "./pages/Milestones";
import Payments from "./pages/Payments";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/designers"
          element={<FindDesigners />}
        />

        <Route
          path="/designer-profile"
          element={<DesignerProfile />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />


        {/* =========================
            PROTECTED CUSTOMER PAGES
        ========================= */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<CustomerDashboard />}
          />

          {/* Create Project */}
          <Route
            path="/create-project"
            element={<CreateProject />}
          />

          {/* Consultation */}
          <Route
            path="/consultation"
            element={<ConsultationRequest />}
          />

          {/* Quotation */}
          <Route
            path="/quotation"
            element={<Quotation />}
          />

          {/* Design Review */}
          <Route
            path="/design-review"
            element={<DesignReview />}
          />

          {/* Project Milestones */}
          <Route
            path="/milestones"
            element={<Milestones />}
          />

          {/* Payments */}
          <Route
            path="/payments"
            element={<Payments />}
          />

          {/* Reviews */}
          <Route
            path="/reviews"
            element={<Reviews />}
          />

        </Route>


        {/* =========================
            404 PAGE
        ========================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;