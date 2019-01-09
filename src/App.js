import React, { Component } from 'react';
import Designer from './components/Designer';

export default class App extends Component {
    state = {
        data: {}
    };

    onChange = data => this.setState({ data });

    render() {
        return <Designer data={this.state.data} onChange={this.onChange} />;
    }
}
