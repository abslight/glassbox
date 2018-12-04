import React, { Component } from 'react';

class Inv extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    render() {
        console.log(this.props.item)
        const { comname, sciname, img, price } = this.props.item
        return (
            <div>
                <h1>{comname}</h1>
                <img src={img} />
                <h5>{sciname}</h5>
                <h3>${price}</h3>
            </div>
        );
    }
}

export default Inv;
