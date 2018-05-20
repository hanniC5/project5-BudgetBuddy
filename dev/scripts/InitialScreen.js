import React from 'react';

const InitialScreen = (props) => {
    return (
        <div id="initialScreen">
            <h1>Welcome to Budget Buddy!</h1>
            <h3>The app that helps you easily plan your monthly budget</h3>
            <h2>Please enter your total budget for this month: </h2>
            <form className="firstForm" onSubmit={props.handleInitialSubmit}>
                <input type="number" name="totalBudget" value={props.totalBudget} onChange={props.handleChange} />
                <input type="submit" value="Get Started!" onClick={props.handleTotalUpdate} />
            </form>
        </div>
    )
}

export default InitialScreen;