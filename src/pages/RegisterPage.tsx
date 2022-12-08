import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Paper,
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PasswordField from "../components/base/PasswordField"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  return (
    <Container fixed>
      <Paper
        elevation={12}
        sx={{
          width: "400px",
          padding: 8,
        }}
      >
        <Stack spacing={6}>
          <Typography variant="h4">Crea una cuenta</Typography>
          <TextField label="Nombre de usuario" variant="standard" autoFocus />

          <Stack direction="row" spacing={2}>
            <TextField label="Nombre" variant="standard" />
            <TextField label="Apellido" variant="standard" />
          </Stack>

          <PasswordField
            label="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordField
            label="Confirmar contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            sx={{ width: "150px", alignSelf: "center" }}
            variant="contained"
          >
            Registrarse
          </Button>
          <Typography variant="caption">¿Ya tienes una cuenta?</Typography>
          <Link underline="none" onClick={() => navigate("/login")}>
            Iniciar sesión
          </Link>
        </Stack>
      </Paper>
    </Container>
  )
}
