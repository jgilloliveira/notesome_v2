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
import { Navigate, useNavigate } from "react-router"

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
          <Typography variant="h4">Login</Typography>
          <TextField label="Nombre de Usuario" variant="standard" autoFocus />
          <TextField
            label="Contraseña"
            variant="standard"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{ width: "100px", alignSelf: "center" }}
            variant="contained"
          >
            Login
          </Button>
          <Link underline="none" onClick={() => navigate("")}>
            Registrarse
          </Link>
          <Typography variant="subtitle1">Registrarse</Typography>
        </Stack>
      </Paper>
    </Container>
  )
}
