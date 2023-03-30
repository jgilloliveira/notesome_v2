import { IconButton, Menu, MenuItem } from "@mui/material"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import { useState } from "react"
import { Circle } from "@uiw/react-color"

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
        PaperProps={{
          style: {
            maxHeight: "400px",
            width: "212px",
            paddingLeft: "12px",
            paddingTop: "12px",
          },
        }}
        sx={
          {
            //TODO: Flechita del menú de colores
            // "&::after": { content: },
          }
        }
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
      </Menu>
    </div>
  )
}
