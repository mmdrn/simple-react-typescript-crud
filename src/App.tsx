import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/scss/base.scss";
import "react-toastify/dist/ReactToastify.css";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Product from "./routes/Product";
import Header from "./components/Header";

function App() {
  return (
    <div className="App" dir="rtl">
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
