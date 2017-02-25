import React from 'react';
import {Link} from 'react-router';
import cx from 'classnames';

export class Navigation extends React.Component {

    render() {
        let items = this.props.menus[this.props.slug];
        let url = this.props.location.pathname;

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
                                    link = `/category/${menu.slug}`;
                                    break;
                                default:
                                    link = menu.url;
                            }
                            return (

                                <li role="presentation" key={link} className={cx({
                                    'active': link === url
                                })}>
                                    <Link to={link}>
                                        {menu.title}
                                    </Link>
                                </li>

                            );
                        })}
                    </ul>
                </div>
            </nav>
        )
    }
}