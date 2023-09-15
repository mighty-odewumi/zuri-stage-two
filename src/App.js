import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./components/MainPage";
import Details from "./components/Details";
import Error from "./components/Error";


export default function App() {
  return (
    <>
      <Router basename="/">
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path="/movies/:id" component={Details} />
          <Route path="/error" component={Error} />
        </Switch>
      </Router>
    </> 
  )
}
