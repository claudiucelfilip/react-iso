import React from 'react';
import { Link } from 'react-router';
import PrefetchedLink from '../prefetchedLink/PrefetchedLink';
import cx from 'classnames';
import { connect } from 'react-redux';
import { getMenus } from '../../actions';

export class Navigation extends React.Component {
    static fetchData(dispatch) {
        return dispatch(getMenus());
    }

    componentWillMount() {
        Navigation.fetchData(this.props.dispatch);
    }

    render() {
        let items = this.props.menus[this.props.slug];
        let url = this.props.location.pathname;
        if (!items) {
            return <p>Loading</p>;
        }
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <ul className="nav nav-pills pull-right">
                        {items.map((menu, index) => {
                            let link;
                            switch (menu.object) {
                                case 'page':
                                    link = `/${menu.slug}`;
                                    break;
                                case 'post':
                                    link = `/post/${menu.slug}`;
                                    break;
                                case 'category':
                                    let slug = menu.url.replace(/.*\/(?=.*\/$)|\/$/g, '');
                                    link = `/category/${slug}`;
                                    break;
                                default:
                                    link = menu.url;
                            }
                            return (

                                <li role="presentation" key={link} className={cx({
                                    'active': link === url
                                })}>
                                    <PrefetchedLink to={link} type={menu.object}>
                                        {menu.title}
                                    </PrefetchedLink>
                                </li>

                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        menus: state.menus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);
