import React, { Component } from 'react';
import './itemCard.css'
class Inv extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { comname, sciname, img, price } = this.props.item
        return (
            <div id='parent'>
                <div>
                    <h1>{comname}</h1>
                    <div id='imgBox'>
                        <img src={img} />
                    </div>
                    <div id='prodDetails'>
                        <h5>{sciname}</h5>
                        <h3>${price}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inv;
