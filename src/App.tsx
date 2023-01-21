import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SnackbarProvider } from "notistack"
import { useState } from "react"
import "./App.css"
import { loadSession } from "./queries/session.query"
import { AppsRoutes } from "./routes/AppsRoute"
import { es } from "date-fns/locale"
import setDefaultOptions from "date-fns/setDefaultOptions"

setDefaultOptions({ locale: es })

const queryClient = new QueryClient()

function App() {
  loadSession()

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <AppsRoutes />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  )
}

export default App
