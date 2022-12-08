import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material"
import { useState } from "react"

export default function PasswordField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      variant="standard"
      type={showPassword ? "text" : "password"}
      {...props}
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
  )
}
