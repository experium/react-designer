import React, { Component } from 'react';
import Designer from '@experium/react-designer';

export default class App extends Component {
    state = {
        data: {}
    };

    onChange = data => this.setState({ data });

    render() {
        return <Designer data={this.state.data} onChange={this.onChange} />;
    }
}
