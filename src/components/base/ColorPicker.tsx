import { IconButton, Menu, MenuItem } from "@mui/material"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import { useState } from "react"
import { Circle } from "@uiw/react-color"
import { Stack } from "@mui/system"

type ColorPickerProps = {
  color: string
  onChange: (color: string) => void
}
export default function ColorPicker(props: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ColorLensIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ transform: "translateY(-20px)" }}
        PaperProps={{
          sx: {
            //TODO: Agregar fondo blanco y margin left
            backgroundColor: "transparent",
            boxShadow: "none",
            maxHeight: "400px",
            width: "248px",
            paddingLeft: "12px",
            paddingTop: "12px",
            "&::after": {
              content: '""',
              display: "block",
              position: "absolute",
              top: "32px",
              right: 100,
              width: 15,
              height: 15,
              bgcolor: "white",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 100,
            },
          },
        }}
      >
        <Stack
          sx={{
            bgcolor: "white",
            pt: 1.5,
            pl: 1.5,
            borderRadius: "10px",
            m: "12px",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
          }}
        >
          <Circle
            colors={[
              "#FBF8CC",
              "#FDE4CF",
              "#FFCFD2",
              "#F1C0E8",
              "#CFBAF0",
              "#A3C4F3",
              "#90DBF4",
              "#8EECF5",
              "#98F5E1",
              "#B9FBC0",
            ]}
            color={props.color}
            onChange={(color) => props.onChange(color.hex)}
          />
        </Stack>
      </Menu>
    </div>
  )
}
