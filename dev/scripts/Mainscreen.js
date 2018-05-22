import React from 'react';
//import BudgetList from './BudgetList';

const Mainscreen = (props) => {
    return (
        <div id="mainScreen">
            <h1>Budget Buddy<span className="logo"><img src="../public/assets/piggyBank.png" alt="mock up of a side view of a piggy bank"/></span></h1>
            <form className="listForm" onSubmit={props.whenSubmit}>
                <label htmlFor="category">Please choose a category: </label>
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
                <input type="submit" value="Add to budget" />
            </form>
            <div className="totals">
                <p>Remaining budget: <span className="budget">{props.updatedBudget}</span></p>
                <p>Your total budget is: <span className="budget">{props.totalBudget}</span></p>
            </div>
            <div className="resetButton">
                <button onClick={props.resetBudget}>Reset Budget</button>
            </div>
        </div> //main screen div ends
    )
}

export default Mainscreen;