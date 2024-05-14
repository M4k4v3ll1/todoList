import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import Menu from "@mui/icons-material/Menu"
import { TodoListsList } from "features/todolistsList/TodoListsList"
import IntegrationNotistack from "../common/components/errorSnackbar/ErrorSnackbar"
import { RequestStatusType } from "app/appSlice"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { AppRootState, useAppSelector } from "./store"
import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "features/auth/ui/Login"
import CircularProgress from "@mui/material/CircularProgress"
import { useDispatch } from "react-redux"
import { MenuButton } from "common/components/menuButton/MenuButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import { authThunks } from "features/auth/model/authSlice"
import { selectIsInitialized, selectIsLoggedIn, selectStatus } from "./selectors"

type AppPropsType = {
  demoMode?: boolean
}
type ThemeMode = "dark" | "light"

function App({ demoMode = false }: AppPropsType) {
  const status = useAppSelector<RequestStatusType>(selectStatus)
  const isInitialized = useAppSelector<boolean>(selectIsInitialized)
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const dispatch = useDispatch<any>()
  const logOutHandler = useCallback(() => {
    dispatch(authThunks.logout())
  }, [])
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  //Theme settings
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#425E91",
      },
    },
  })
  const changeModeHandler = () => {
    setThemeMode(themeMode == "light" ? "dark" : "light")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <IntegrationNotistack />
        <AppBar position={"static"} sx={{ mb: "30px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton edge={"start"} color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">TodoList</Typography>
            {isLoggedIn && (
              <div>
                <MenuButton>Login</MenuButton>
                <MenuButton onClick={logOutHandler}>Logout</MenuButton>
                <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                <Switch color={"default"} onChange={changeModeHandler} />
              </div>
            )}
          </Toolbar>
        </AppBar>
        {status === "loading" && <LinearProgress />}
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodoListsList />}></Route>
            <Route path={"/auth"} element={<Login />}></Route>
            <Route path={"/404"} element={<h1 style={{ textAlign: "center" }}>404: PAGE NOT FOUND</h1>}></Route>
            <Route path={"*"} element={<Navigate to={"/404"} />}></Route>
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App

//React style guide: https://code-style.it-incubator.io/react
