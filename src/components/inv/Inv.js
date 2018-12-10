import React, { Component } from 'react';
import './itemCard.css'
class Inv extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        console.log(this.props.item)
        const { comname, sciname, img, price } = this.props.item
        return (
            <div id='parent'>
                <div>
                    <h1>{comname}</h1>
                    <img src={img} />
                    <h5>{sciname}</h5>
                    <h3>${price}</h3>
                </div>
            </div>
        );
    }
}

export default Inv;
