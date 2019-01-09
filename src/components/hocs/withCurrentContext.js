import React, { Component } from 'react';

import CurrentContext from '../context/CurrentContext';

export default WrappedComponent =>
    class CurrentContextWrapper extends Component {
        render() {
            return <CurrentContext.Consumer>
                { props => <WrappedComponent {...props} {...this.props} /> }
            </CurrentContext.Consumer>
        }
    }
