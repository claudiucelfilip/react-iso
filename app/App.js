import React, { PropTypes } from 'react';
import './styles/main.scss';
import { getPosts } from './actions';
import { connect } from 'react-redux';

class App extends React.Component {
    static fetchData(dispatch) {
        return dispatch(getPosts());
    }
    render () {
        let children = React.cloneElement(this.props.children, {
            posts: this.props.posts,
            getPosts: this.props.getPosts
        });
        return (
            <main className="container">
                {children}
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => {
            return dispatch(getPosts());
        }
    }
};

App.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.shape({
            rendered: PropTypes.string.isRequired
        })
    }).isRequired).isRequired,
    getPosts: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);