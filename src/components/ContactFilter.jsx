import { Component } from "react";

export class ContactFilter extends Component {

    state = {
        searchBy: null,

    };

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value }, () => {
            this.props.onFilter(this.state);
        });
    };

    componentDidMount() { }
    componentWillUnmount() { }

    render() {
        return (
            <section>
                <section>
                    <label htmlFor="searchBy">Search by Name / Phone</label>
                    <input onChange={this.handleChange} type="text" name="searchBy" id="searchBy" />
                </section>
                {/* <section>
                    <label htmlFor="byPhoneNumber">Phone Number</label>
                    <input onChange={this.handleChange} type="text" name="byPhoneNumber" id="byPhoneNumber" />
                </section> */}

            </section>
        );
    }
}
