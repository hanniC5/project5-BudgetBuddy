import React from 'react';
//import BudgetList from './BudgetList';

const Mainscreen = (props) => {
    return (
        <div id="mainScreen">
            <h1>Budget Buddy</h1>
            <div className="budgetForm">
                <form className="listForm" onSubmit={props.whenSubmit}>
                    <label htmlFor="category">Please choose a category</label>
                    <select name="budgetCategory" id="category" onChange={props.whenChange}>
                        <option value=""></option>
                        <option value="home">Home</option>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="bills">Bills</option>
                        <option value="savings">Savings</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="item">Enter an item/ description:</label>
                    <input type="text" id="item" name="item" onChange={props.whenChange}/>
                    <label htmlFor="amount">Enter the amount to budget for this item:</label>
                    <input type="number" id="amount" name="amount" onChange={props.whenChange}/>
                    <input type="submit" value="Add to budget" onClick={props.handleBudgetUpdate}/>
                </form>
            </div> {/* budget form */}
        </div> //main screen div ends
    )
}

export default Mainscreen;