import { Component } from "react";
import { loadLoggedInUser } from "../store/actions/userActions";
import { connect } from "react-redux";
import { bitcoinService } from '../services/bitcoinService.js';
import { Link } from "react-router-dom";

class _HomePage extends Component {
  state = {
    currBitcoin: null,
  };

  componentDidMount() {
    this.props.loadLoggedInUser();
    this.onLoadBitCoin();
  }

  componentWillUnmount() { }

  async onLoadBitCoin() {
    try {
      this.setState({ currBitcoin: await bitcoinService.getRate() });
    }
    catch (err) {
      console.log('Cannot load bitcoin');
    }
  }

  getCurrentBtc = () => {
    const { currBitcoin } = this.state;
    const { loggedInUser } = this.props;
    let currency = '' + currBitcoin * loggedInUser.coins;
    return currency.substring(0, 8);
  };

  render() {
    const { currBitcoin } = this.state;
    const { loggedInUser } = this.props;
    if (!loggedInUser && !currBitcoin) return <div>Loading...</div>;
    if (loggedInUser) return (
      <section className="home-page main-layout">
        <h1>Hello {loggedInUser.fullname} !</h1>
        <h3>Coins: {loggedInUser.coins} $</h3>
        <h3>BTC: {this.getCurrentBtc()}</h3>
      </section>
    );
    else return <Link to={'/signup/'} />;

  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  };
};

const mapDispatchToProps = {
  loadLoggedInUser,
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);