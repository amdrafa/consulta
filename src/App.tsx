import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Router } from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  )
}