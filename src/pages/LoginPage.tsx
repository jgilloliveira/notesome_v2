import {
  Box,
  Paper,
  Container,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material"

export default function LoginPage() {
  return (
    <Container fixed>
      <Paper
        elevation={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          padding: 8,
        }}
      >
        <Stack spacing={6}>
          <Typography variant="h4">Login</Typography>
          <TextField label="Nombre de Usuario" variant="standard" autoFocus />
          <TextField label="Contraseña" variant="standard" type="password" />
          <Button variant="contained">Login</Button>
        </Stack>
      </Paper>
    </Container>
  )
}
