// import { Redirect } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './styles/styles.scss';
import { HomePage } from "./pages/HomePage";
import { ContactDetailsPage } from "./pages/ContactDetailsPage";
import { ContactPage } from "./pages/ContactPage";
import { StatisticPage } from "./pages/StatisticPage";
import { AppHeader } from "./components/AppHeader";
import { ContactEditPage } from "./pages/ContactEditPage";
import { SignupPage } from "./pages/SignupPage";
// import backGround from './assets/imgs/home-page.jpg';


function App() {
  return (
    <div className="App">
      {/* <img src={backGround} alt="image" /> */}
      <Router>
        <AppHeader />
        <main className="container">
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEditPage} />
            <Route path="/statistic/" component={StatisticPage} />
            <Route path="/contact/:id" component={ContactDetailsPage} />
            <Route path="/contact/" component={ContactPage} />
            <Route path={"/signup/"} component={SignupPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
