import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
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
import { useLogin } from "../connections/session.connection"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const navigate = useNavigate()
  const { isSenddingLogin, loginData, loginError, sentLogin } = useLogin()

  function handleLogin() {
    sentLogin(
      {
        username,
        password,
      },
      {
        onSuccess(data, variables, context) {
          console.log(data)
        },
      }
    )
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
          <Typography variant="h4">Login</Typography>
          <TextField
            label="Nombre de usuario"
            variant="standard"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordField
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            sx={{ width: "100px", alignSelf: "center" }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography variant="caption">
            ¿Todavía no tienes una cuenta?
          </Typography>
          <Link underline="none" onClick={() => navigate("/register")}>
            Registrarse
          </Link>
        </Stack>
      </Paper>
    </Container>
  )
}
