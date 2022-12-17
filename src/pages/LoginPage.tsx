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
  Alert,
  AlertTitle,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PasswordField from "../components/base/PasswordField"
import { useLogin } from "../connections/session.connection"
import { formatErrorResponse } from "../connections/utils"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [usernameRef, setUsernameRef] = useState<any>(null)
  const [passwordRef, setPasswordRef] = useState<any>(null)

  const navigate = useNavigate()
  const { isSenddingLogin, loginData, loginError, sendLogin } = useLogin()

  function handleLogin() {
    sendLogin(
      {
        username,
        password,
      },
      {
        onError(error, variables, context) {
          if (error?.response?.data.username && usernameRef) usernameRef.focus()
          else if (error?.response?.data.password && passwordRef)
            passwordRef.focus()
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
          {loginError?.error && (
            <Alert severity="error">{loginError?.error}</Alert>
          )}
          <TextField
            label="Nombre de usuario"
            variant="standard"
            autoFocus
            value={username}
            error={Boolean(loginError?.username || loginError?.error)}
            helperText={loginError?.username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            inputRef={setUsernameRef}
          />
          <PasswordField
            label="Contraseña"
            value={password}
            error={Boolean(loginError?.password || loginError?.error)}
            helperText={loginError?.password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            inputRef={setPasswordRef}
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
