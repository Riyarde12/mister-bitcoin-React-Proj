import React, { Component } from "react";
import { userService } from "../services/userService";
import { Login } from "../components/Login";


export class SignupPage extends Component {

    state = {
        fullname: null,
        username: null,
        password: null,
        isSignUp: false,
    };

    componentDidMount() { }
    componentWillUnmount() { }

    onSignUp = async (ev) => {
        ev.preventDefault();
        try {
            const newUser = await userService.signUp({ ...this.state });
            console.log('new user signup', newUser);
        } catch (err) {
            console.log('Cannot signup :', err);
        }
    };

    onLogin = async (ev) => {
        ev.preventDefault();
        const { username, password } = this.state;
        try {
            const logginUser = await userService.login({ username, password });
            this.setState({ isSignUp: false });
            this.onBack();
            console.log('loggin user', logginUser);
        } catch (err) {
            console.log('Cannot login', err);
        }
    };

    onOpenSignup = () => {
        const { isSignUp } = this.state;
        this.setState({ isSignUp: !isSignUp });
    };

    handleChange = async ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? (+target.value || '') : target.value;
        this.setState({ [field]: value });
    };

    onBack = () => {
        this.props.history.push('/');
    };

    render() {
        const { isSignUp } = this.state;
        if (isSignUp) return (
            <section className="signup-page">
                <form onSubmit={this.onSignUp}>
                    <label htmlFor="fullname">Fullname</label>
                    <input onChange={this.handleChange} type="text" name="fullname" />

                    <label htmlFor="username">User name</label>
                    <input onChange={this.handleChange} type="text" name="username" />

                    <label htmlFor="password">Password</label>
                    <input onChange={this.handleChange} type="password" name="password" />
                    <button>Sign up</button>
                </form>
                <button onClick={this.onOpenSignup}>Already have an accoount ?</button>
            </section>
        );
        else return <Login onLogin={this.onLogin} handleChange={this.handleChange} onOpenSignup={this.onOpenSignup} />;
    }
}
