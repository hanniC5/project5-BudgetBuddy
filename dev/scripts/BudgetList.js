import React from 'react';

const BudgetList = (props) => {
    return (
        <div className="lists">
            <h3>Home</h3>
            <table id="home">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.homeInfo.map((item)=> {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Food</h3>
            <table id="food">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.foodInfo.map((item) => {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Transportation</h3>
            <table id="transportation">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.transInfo.map((item) => {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Bills</h3>
            <table id="bills">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.billsInfo.map((item) => {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Savings</h3>
            <table id="savings">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.saveInfo.map((item) => {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Other</h3>
            <table id="other">
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Remove Item?</th>
                </tr>
                <React.Fragment>
                    {props.otherInfo.map((item) => {
                        return (
                            <tr>
                                <td>{item.item}</td>
                                <td>{item.amount}</td>
                                <td><button>X</button></td>
                            </tr>
                        )
                    })}
                </React.Fragment>
            </table>
        </div>
    )
}

export default BudgetList;