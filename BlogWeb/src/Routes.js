import { BrowserRouter, Switch, Route } from "react-router-dom";
import Blog from "./routes/Blog";
import Admin from "./routes/Admin";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Blog} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
