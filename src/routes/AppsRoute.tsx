import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { isLogged } from "../queries/session.query"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/HomePage"
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
      {/* <Route path="/folders/:parentFolder" element={<HomePage/>}/>
      <Route path="/favorites" element={<FavoritesPage/>}/>
      <Route path="/deleteds" element={<DeletedsPage/>}/>
      <Route path="/categories/:categoryId" element={<HomePage/>}/> */}
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
    </Routes>
  )
}
