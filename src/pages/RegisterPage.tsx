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
import { useRegister } from "../connections/session.connection"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()
  const { isSenddingRegister, registerData, registerError, sendRegister } =
    useRegister()

  function handleRegister() {
    sendRegister({
      username,
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    })
  }

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
          <TextField
            label="Nombre de usuario"
            variant="standard"
            autoFocus
            required
            error={Boolean(registerError?.username || registerError?.error)}
            helperText={registerError?.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Nombre"
              variant="standard"
              required
              error={Boolean(registerError?.firstName || registerError?.error)}
              helperText={registerError?.firstName}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Apellido"
              variant="standard"
              required
              error={Boolean(registerError?.lastName || registerError?.error)}
              helperText={registerError?.lastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>

          <TextField
            label="Correo electrónico"
            variant="standard"
            required
            type="email"
            error={Boolean(registerError?.email || registerError?.error)}
            helperText={registerError?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            label="Contraseña"
            required
            error={Boolean(registerError?.password || registerError?.error)}
            helperText={registerError?.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordField
            label="Confirmar contraseña"
            required
            error={Boolean(
              registerError?.passwordConfirm || registerError?.error
            )}
            helperText={registerError?.passwordConfirm}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <Button
            sx={{ width: "150px", alignSelf: "center" }}
            variant="contained"
            onClick={handleRegister}
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
