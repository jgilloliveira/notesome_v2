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
  StackProps,
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
import { ElementType, useState } from "react"
import { Stack } from "@mui/system"
import { useGetCategories } from "../queries/categories.query"
import { useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import NoteDrawer from "../components/notes/NoteDrawer"

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

export default function MainLayout(props: Omit<StackProps, "component">) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const theme = useTheme()
  console.log(location.pathname)
  const navigate = useNavigate()
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
      url: "/",
    },
    {
      label: "Favoritos",
      icon: <StarIcon />,
      url: "/favorites",
    },
    {
      label: "Archivados",
      icon: <ArchiveIcon />,
      url: "/archived",
    },
    {
      label: "Eliminados",
      icon: <DeleteIcon />,
      url: "/deleteds",
    },
  ]

  return (
    <Stack direction="row" sx={{ width: "100vw" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Stack direction="row">
          <IconButton onClick={() => setOpen(!open)} sx={{ p: "20px" }}>
            <MenuIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ px: 1 }}>
          {drawerOptions.map((option) => (
            <ListItem
              key={option.label}
              disablePadding
              sx={{
                display: "block",
                bgcolor:
                  location.pathname === option.url
                    ? theme.palette.primary.main
                    : "",
                borderRadius: 2,
              }}
              onClick={() => navigate(option.url)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: location.pathname === option.url ? "white" : "",
                  }}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  className={
                    location.pathname === option.url
                      ? "text-weight-bold"
                      : "text-weight-medium"
                  }
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === option.url ? "white" : "#777",
                  }}
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
              sx={{ display: "block", px: 1 }}
              onClick={() => navigate(`/categories/${category.id}`)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 2,
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
                  className={
                    location.pathname === category.id
                      ? "text-weight-bold"
                      : "text-weight-medium"
                  }
                  sx={{
                    opacity: open ? 1 : 0,
                    overflow: "hidden",
                    color: location.pathname === category.id ? "white" : "#777",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {/* Botón de mostrar más */}
          {hasCategoriesNextPage && (
            <ListItem
              disablePadding
              sx={{ display: "block", px: 1 }}
              onClick={loadNextCategoriesPage}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  borderRadius: 2,
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
      <Stack sx={{ flexGrow: 1 }}>{props.children}</Stack>
      <NoteDrawer />
    </Stack>
  )
}
