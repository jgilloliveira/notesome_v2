import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SnackbarProvider } from "notistack"
import { useState } from "react"
import "./App.css"
import { AppsRoutes } from "./routes/AppsRoute"

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

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
