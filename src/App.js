import logo from "./logo.svg";
import "./App.css";
import Workform from "./components/Workform";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
function App() {
  return (
    <div>
      <div className="container py-5">
        <div className="card border-0 shadow text-white text-center p-4 w-55 mx-auto">
          <Workform />
        </div>
      </div>
    </div>
  );
}

export default App;
