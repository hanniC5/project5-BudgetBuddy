import React from 'react';


const BudgetList = (props) => {
    return (
        <div id="lists">
            <h3>Home <span className="icon"><img src="../public/assets/homeIcon.png" alt="mockup of a house outline"/></span></h3>
            <table id="home">
                <col width="33%"/>
                <col width="33%"/>
                <col width="33%"/>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.homeInfo.map((item)=> {
                        return (
                           <tbody>
                                <tr key={props.key}>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                           </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Food <span className="icon"><img src="../public/assets/foodIcon.png" alt="outline of a fork and spoon crossed"/></span></h3>
            <table id="food">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.foodInfo.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Transportation <span className="icon"><img src="../public/assets/busIcon.png" alt="mockup of bus"/></span></h3>
            <table id="transportation">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.transInfo.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Bills <span className="icon"><img src="../public/assets/billsIcon.png" alt="outline of a bill" /></span></h3>
            <table id="bills">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.billsInfo.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Savings <span className="icon"><img src="../public/assets/piggyBank.png" alt="mockup of a piggybank" /></span></h3>
            <table id="savings">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.saveInfo.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
            <h3>Other <span className="icon"><img src="../public/assets/otherIcon.png" alt="mockup of movie reel" /></span></h3>
            <table id="other">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <React.Fragment>
                    {props.otherInfo.map((item) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{item.item}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => props.removeBudgetItem(item.key)}>X</button></td>
                                </tr>
                            </tbody>
                        )
                    })}
                </React.Fragment>
            </table>
        </div>
    )
}

export default BudgetList;