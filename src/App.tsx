import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home/Home"
import { SettingContextProvider } from "./context/SettingContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>

    <SettingContextProvider>
      <Routes>
         <Route path="/"  element={<Home />}/>
      </Routes>
    </SettingContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App