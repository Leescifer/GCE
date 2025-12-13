import { useRoutes } from "react-router-dom";
import Modal from 'react-modal';
import {routes} from "./routes"

Modal.setAppElement('#root');


function App() {

  const routing = useRoutes(routes);
  return routing

       
}

export default App
