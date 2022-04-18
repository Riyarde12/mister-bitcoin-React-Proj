import { Component } from "react";
import { userService } from '../services/userService.js';
import { bitcoinService } from '../services/bitcoinService.js';
import { ContactPage } from "./ContactPage";
import { StatisticPage } from "./StatisticPage.jsx";
import { Link } from "react-router-dom";
import backGround from '../assets/imgs/home-page.jpg';

export class HomePage extends Component {
  state = {
    loggedinUser: null,
    currBitcoin: null,
    currentPage: null,
  };
  intervalId;
  componentDidMount() {
    this.onLoadLoggedinUser();
    this.onLoadBitCoin();
    console.log(HomePage);
  }

  componentWillUnmount() { }

  onLoadLoggedinUser() {
    this.setState({
      loggedinUser: userService.getUser()
    });
  }

  async onLoadBitCoin() {
    try {
      this.setState({ currBitcoin: await bitcoinService.getRate() });
    }
    catch (err) {
      console.log('Cannot load bitcoin');
    }
  }

  getCurrentBtc = () => {
    const { currBitcoin, loggedinUser } = this.state;
    let currency = '' + currBitcoin * loggedinUser.coins;
    return currency.substring(0, 8);
  };

  onSelectPage = (currentPage) => {
    this.setState({ currentPage: currentPage }, () => {
    });
  };

  render() {
    const { loggedinUser, currBitcoin, currentPage } = this.state;
    if (!loggedinUser && !currBitcoin) return <div>Loading...</div>;
    if (!currentPage) return (
      <section className="home-page main-layout">

        <h1>Hello {loggedinUser.name} !</h1>
        <h3>Coins: {loggedinUser.coins} $</h3>
        <h3>BTC: {this.getCurrentBtc()}</h3>
      </section>
    );

  }
}