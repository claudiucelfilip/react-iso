import React from 'react';
import styles from './styles.scss';
import RawHtml from 'react-raw-html';
import {RotatingSquare, RotatingSquares} from '../../../components/rotatingSquares';
import {RotatingSquares3d} from '../../../components/rotatingSquares3d/RotatingSquares3d';

export class Homepage extends React.Component {
    render() {
        let page = this.props.page;
        return (
            <div>
                <div className="jumbo">
                    {/*<RotatingSquares>*/}
                        {/*<RotatingSquare type="main">*/}
                            {/*<h1>Lab</h1>*/}
                            {/*<p>Launchpad for tech startups</p>*/}
                        {/*</RotatingSquare>*/}
                        {/*<RotatingSquare type="sec1">*/}
                            {/*<h1>Co. <br/> lab</h1>*/}
                            {/*<p>Sharing insights</p>*/}
                        {/*</RotatingSquare>*/}
                        {/*<RotatingSquare type="sec2">*/}
                            {/*<h1>Fuel</h1>*/}
                            {/*<p>Early funding of tech startups</p>*/}
                        {/*</RotatingSquare>*/}
                    {/*</RotatingSquares>*/}

                    <RotatingSquares3d/>
                </div>
                <div className="container">
                    <p>{page.title.rendered}</p>
                    <RawHtml.div>
                        {page.content.rendered}
                    </RawHtml.div>
                </div>
            </div>
        );
    }
}
