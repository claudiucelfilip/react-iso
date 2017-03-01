import React from 'react';
import { Link } from 'react-router';

export class NotFound extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Not found'
        }
    }

    componentDidMount() {
        this.setState({text: 'Client Not Found'});
    }

    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
                <Link to="/">Home</Link>
            </div>
        );
    }
}
;
