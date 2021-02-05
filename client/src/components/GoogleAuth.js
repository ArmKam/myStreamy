import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    // state = { isSignedIn: null }; no need enymore we passe by reducer for initializing out state
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '281892986253-7nnj2hbcusbh0vec4igl2lj9ct8mtkp6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                //  this.setState({ isSignedIn: this.auth.isSignedIn.get() }); refactor
                this.onAuthCange(this.auth.isSignedIn.get());

                this.auth.isSignedIn.listen(this.onAuthCange);
            });
        });
    }

    onAuthCange = (isSignedIn) => {

        if (isSignedIn) {

            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut()
        }
    };



    renderAuthButton() {

        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    <button onClick={() => this.auth.signOut()} className="ui inverted  red google button">

                        Sign Out  <br />
                        <small> {this.auth.currentUser.get().Es.sd}</small>
                    </button>

                </div>

            )
        } else {
            return (


                <button onClick={() => this.auth.signIn()} className="ui inverted  red  button">
                    <i className="google icon" />
                    Sign In with Google
                </button>

            );
        }
    }
    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    };
};

const mapStateToProps = state => {

    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);