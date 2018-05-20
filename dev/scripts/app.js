import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Mainscreen from './Mainscreen';
import BudgetList from './BudgetList';

const config = {
  apiKey: "AIzaSyB0B1zHgum2HbGB2tpOIgK8I9PCkkg4Mn4",
  authDomain: "project5-budgetbuddy.firebaseapp.com",
  databaseURL: "https://project5-budgetbuddy.firebaseio.com",
  projectId: "project5-budgetbuddy",
  storageBucket: "project5-budgetbuddy.appspot.com",
  messagingSenderId: "655398823360"
};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      totalBudget: 0,
      updatedBudget: 0,
      amount: 0,
      budgetCategory: "",
      item: "" , 
      home: [],
      food: [],
      transportation: [],
      bills: [],
      savings: [],
      other: []
    }
    this.handleInitialSubmit = this.handleInitialSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.removeBudgetItem = this.removeBudgetItem.bind(this);
    this.handleTotalUpdate = this.handleTotalUpdate.bind(this);
    this.handleBudgetUpdate = this.handleBudgetUpdate.bind(this);
  } //constructor ends

  componentDidMount() {
    const dbRef = firebase.database().ref('budgetItems');
    dbRef.on('value', (snapshot) => {
      //console.log(snapshot.val());
      const data = snapshot.val();
      const budgetItemsArray = [];
      for (let item in data) {
        data[item].key = item,
        budgetItemsArray.push(data[item])
      }
      //console.log(budgetItemsArray);
      const homeArray = budgetItemsArray.filter((item) => {
        return item.category === 'home'
      });
      const foodArray = budgetItemsArray.filter((item) => {
        return item.category === 'food'
      });
      const transpArray = budgetItemsArray.filter((item) => {
        return item.category === 'transportation'
      });
      const billsArray = budgetItemsArray.filter((item) => {
        return item.category === 'bills'
      })
      const saveArray = budgetItemsArray.filter((item) => {
        return item.category === 'savings'
      })
      const otherArray = budgetItemsArray.filter((item) => {
        return item.category === 'other'
      })
      this.setState({
        home: homeArray,
        food: foodArray,
        transportation: transpArray,
        bills: billsArray,
        savings: saveArray,
        other: otherArray
      })
    }) //dbRef value change event listener ends
    const dbRefTotal= firebase.database().ref('budgetItems/totalBudget');
    dbRefTotal.on('value', (snapshot) => {
      const firebaseTotal = []
      const dataTotal = snapshot.val();
      for (let data in dataTotal) {
        dataTotal[data].key = data,
        firebaseTotal.push(dataTotal[data])
      }
      this.setState ({
        firebaseKey: firebaseTotal[0].key,
        totalBudget: firebaseTotal[0].total
      })
    })
    //when an item in database is removed, want the data of the removed obj back so that can update budget amount
    // dbRef.on('child_removed', function (snapshot) {
    //   const amountToAddBack = snapshot.val().amount;
    //   console.log(amountToAddBack);
    //   const updated = this.state.updatedBudget + parseInt(amountToAddBack);
    //   console.log (updated); //null
    // }); //dbRef remove from database event listener ends
  }//componentDidMount ends
//method to handle the submit of the first form where user enters their total monthly budget 
  handleInitialSubmit(e) {
    e.preventDefault(); 
    const initialBudgetValue = {
      total: this.state.totalBudget
    }
    this.setState({
      updatedBudget: this.state.totalBudget
    });
  } //handleIntial submit ends
//method to get the value of the inputs into the App's state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  } //handleChange ends
//method to update the total budget stored in the db with the user's entered budget 
  handleTotalUpdate(){
    firebase.database().ref(`budgetItems/totalBudget/${this.state.firebaseKey}`).update({
      total: this.state.totalBudget,
      updated: this.state.totalBudget
    });
    // console.log(this.state.firebaseKey)
  } //handleTotalUpdate ends 
//method to update the updated budget based on what amounts are stored in the db and when new budget item is added
  handleBudgetUpdate(e) {
    e.preventDefault();
    //const dbRef= firebase.database().ref('budgetItems');
    // dbRef.on('value', (snapshot) => {
    //   let storedAmounts = 0;
    //   const dbTotalAmounts = snapshot.val();
    //   for(let key in dbTotalAmounts) {
    //     let amount = parseInt(dbTotalAmounts[key].amount);
    //     console.log(amount);
    //   }
    //   console.log(storedAmounts);
    // });

    const updatedBudget = {
      updated: (this.state.updatedBudget - this.state.amount),
    }
    console.log(updatedBudget);
  }
//method to add each budget item to the list on the page as well as to the database 
  handleItemSubmit(e) {
    e.preventDefault();
    const listItem = {
      category: this.state.budgetCategory,
      item: this.state.item,
      amount: this.state.amount
    }
    const dbRef= firebase.database().ref();
    //const childRef = dbRef.child('budgetItems/items'); //EDIT HERE
    dbRef.push(listItem);
    
    const updated = this.state.updatedBudget - listItem.amount;
    this.setState({
      updatedBudget: updated,
      category: '',
      item: '',
      amount: 0
    })
  } //handleItemSubmit ends

  removeBudgetItem(keyToRemove) {
    firebase.database().ref(`budgetItems/items/${keyToRemove}`).remove();
  }

  render() {
    return (
      <div> {/* container */}
        <div id="initialScreen">
          <h1>Welcome to Budget Buddy!</h1>
          <h3>The app that helps you easily plan your monthly budget</h3>
          <h2>Please enter your total budget for this month: </h2>
          <form className="firstForm" onSubmit={this.handleInitialSubmit}>
            <input type="number" name="totalBudget" value={this.state.totalBudget} onChange={this.handleChange} />
            <input type="submit" value="Get Started!" onClick={this.handleTotalUpdate}/>
          </form>
        </div>
        <Mainscreen 
        whenChange={this.handleChange}
        whenSubmit={this.handleItemSubmit}
        handleBudgetUpdate={this.handleBudgetUpdate}
        />
        <div className="totals">
          <p>Remaining budget: {this.state.updatedBudget}</p>
          <p>Your total budget is: {this.state.totalBudget}</p>
        </div>
        <BudgetList 
        key={this.state.key}
        homeInfo={this.state.home}
        foodInfo={this.state.food}
        transInfo={this.state.transportation}
        billsInfo={this.state.bills}
        saveInfo={this.state.savings}
        otherInfo={this.state.other}
        removeBudgetItem={this.removeBudgetItem}
        />
      </div> /* main container div */
    )
  } //render ends
}

ReactDOM.render(<App />, document.getElementById('app'));
