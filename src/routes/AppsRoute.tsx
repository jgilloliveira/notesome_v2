import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { isLogged } from "../queries/session.query"
import MainLayout from "../layouts/MainLayout"
import MainPage from "../pages/MainPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

export function AppsRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

function AuthRoutes() {
  if (!isLogged()) return <Navigate to="/login" />

  return (
    <Routes>
      <Route
        path="/favorites"
        element={
          <MainLayout>
            <MainPage title="Favoritos" />
          </MainLayout>
        }
      />
      <Route
        path="/archived"
        element={
          <MainLayout>
            <MainPage title="Archivados" />
          </MainLayout>
        }
      />
      <Route
        path="/deleteds"
        element={
          <MainLayout>
            <MainPage title="Eliminados" />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <MainPage title="Inicio" />
          </MainLayout>
        }
      />
    </Routes>
  )
}
