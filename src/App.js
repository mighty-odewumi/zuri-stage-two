import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "./components/MainPage";
import Details from "./components/Details";


export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route path="/movies/:id" component={Details} />
        </Switch>
      </Router>
    </> 
  )
}
