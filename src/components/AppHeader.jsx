import { Component } from "react";
import { Link } from 'react-router-dom';

export class AppHeader extends Component {
    render() {
        return (
            <section className="app-header flex">
                <Link to="/contact/">Contacts</Link>
                <Link to="/statistic/">Statistic</Link>
            </section>
        );
    }
}
