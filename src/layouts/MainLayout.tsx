import {
  Avatar,
  Box,
  Container,
  ContainerProps,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
  Typography,
} from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import MailIcon from "@mui/icons-material/Mail"
import InboxIcon from "@mui/icons-material/Inbox"
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import StarIcon from "@mui/icons-material/Star"
import ArchiveIcon from "@mui/icons-material/Archive"
import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"
import { Stack } from "@mui/system"
import { useGetCategories } from "../queries/category.query"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

export default function MainLayout(props: ContainerProps) {
  const [open, setOpen] = useState(false)
  const {
    isGettingCategories,
    categories,
    isCategoriesError,
    loadNextCategoriesPage,
    hasCategoriesNextPage,
  } = useGetCategories()

  const drawerOptions = [
    {
      label: "Inicio",
      icon: <HomeIcon />,
    },
    {
      label: "Favoritos",
      icon: <StarIcon />,
    },
    {
      label: "Archivados",
      icon: <ArchiveIcon />,
    },
    {
      label: "Eliminados",
      icon: <DeleteIcon />,
    },
  ]

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Stack direction="row">
          <IconButton onClick={() => setOpen(!open)} sx={{ p: "20px" }}>
            <MenuIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {drawerOptions.map((option) => (
            <ListItem
              key={option.label}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List
          subheader={
            open && (
              <ListSubheader sx={{ textAlign: "left" }}>
                Categorías
              </ListSubheader>
            )
          }
        >
          {categories?.map((category) => (
            <ListItem
              key={category.id}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: "28px",
                      height: "28px",
                      fontSize: "14px",
                      bgcolor: "rgba(0, 0, 0, 0.54)",
                    }}
                  >
                    {category.initials}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={category.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {/* Botón de mostrar más */}
          {hasCategoriesNextPage && (
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={loadNextCategoriesPage}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExpandMoreIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Mostrar más"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Container maxWidth="md" {...props}>
        {props.children}
      </Container>
    </Box>
  )
}
