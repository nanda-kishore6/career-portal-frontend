import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Opportunities from "../pages/Opportunities";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import CreateOpportunity from "../pages/admin/CreateOpportunity";
import EditOpportunity from "../pages/admin/EditOpportunity";
import MyApplications from "../pages/MyApplications";
import MyBookmarks from "../pages/MyBookmarks";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 PROTECTED ROUTES WITH LAYOUT */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/opportunities"
            element={<Opportunities />}
          />
          <Route
            path="/applications"
            element={<MyApplications />}
          />
          <Route
            path="/bookmarks"
            element={<MyBookmarks />}
          />
        </Route>

        {/* 🔐 ADMIN ROUTES */}
        <Route
          path="/admin/create-opportunity"
          element={
            <AdminRoute>
              <CreateOpportunity />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-opportunity/:id"
          element={
            <AdminRoute>
              <EditOpportunity />
            </AdminRoute>
          }
        />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
