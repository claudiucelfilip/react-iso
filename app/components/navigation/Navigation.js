import React from 'react';
import {Link} from 'react-router';

export class Navigation extends React.Component {

    render () {
        let items = this.props.menus[this.props.slug];

        return (
            <nav>
                <ul>
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
                        <Link to={link} key={index}>
                            <li>
                                {menu.title}
                            </li>
                        </Link>
                    );
                })}
                </ul>
            </nav>
        )
    }
}