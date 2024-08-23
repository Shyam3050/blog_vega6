import Navbar from "./Component/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./Component/ScrollToTop";
function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
