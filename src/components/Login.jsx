// import { Component } from "react";

export function Login({ onLogin, handleChange, onOpenSignup }) {
    return (
        <section>

            <form onSubmit={onLogin}>
                <label htmlFor="username">User name</label>
                <input onChange={handleChange} type="text" name="username" />

                <label htmlFor="password">Password</label>
                <input onChange={handleChange} type="password" name="password" />
                <button>Login</button>
            </form>
            <button onClick={onOpenSignup}>Don't have an account yet ?</button>
        </section>

    );
}

////////////////////////////////////////////////////////////////////////////////////////////

// for class option :>>
// export class Login extends Component {


//     render() {
//         return (
//             <section>

//                 <form onSubmit={this.props.onLogin()}>
//                     <label htmlFor="username">User name</label>
//                     <input onChange={this.props.handleChange} type="text" name="username" />

//                     <label htmlFor="password">Password</label>
//                     <input onChange={this.props.handleChange} type="password" name="password" />
//                 </form>
//             </section>
//         );
//     }
// }



