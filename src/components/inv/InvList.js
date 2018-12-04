import React, { Component } from 'react';
import { getInv } from '../../ducks/reducer'
import { connect } from 'react-redux'
import Inv from './Inv'

class InvList extends Component {
    constructor() {
        super();
        this.state = {
            inventory: []
        }
    }
    componentDidMount() {
        let { inventory } = this.props;
        // console.log(inventory)
        if (inventory.length === 0) {
            this.props.getInv().then(res => this.setState({ inventory: inventory }))
        } else {
            this.setState({ inventory: inventory });
        }
    }

    render() {
        console.log(this.state.inventory)
        let allInv = this.state.inventory.map(e => {
            return (
                <div>
                    <Inv
                        item={e}
                        key={e.id}
                    />
                </div>
            )
        })
        return (
            <div>
                {allInv}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        inventory: state.inventory
    }
}

export default connect(mapStateToProps, { getInv })(InvList)
