import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home/Home"
import { SettingContextProvider } from "./context/SettingContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Info from "./pages/Info/Info"
const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>

    <SettingContextProvider>
      <Routes>
         <Route path="/"  element={<Home />}/>
         <Route path="/info/:id/:type?"  element={<Info />}/>
      </Routes>
    </SettingContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App