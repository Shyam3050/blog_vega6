import Navbar from "./Component/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return <>
   <Navbar/>
   <Outlet/>
  </>;
}

export default App;
