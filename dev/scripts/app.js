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
      //initialBudget: 0,
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
    this.handleUpdate = this.handleUpdate.bind(this);
  } //constructor ends

  componentDidMount() {
    const dbRef = firebase.database().ref('budgetItems');
    dbRef.on('value', (snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const budgetItemsArray = [];
      for (let item in data) {
        data[item].key = item,
        budgetItemsArray.push(data[item])
      }
      console.log(budgetItemsArray);
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
      // console.log(snapshot.val());
      const dataTotal = snapshot.val();
      for (let data in dataTotal) {
        dataTotal[data].key = data,
        firebaseTotal.push(dataTotal[data])
      }
      // console.log(firebaseTotal)
      this.setState ({
        //initialBudget: firebaseTotal[0].total,
        firebaseKey: firebaseTotal[0].key,
        totalBudget: firebaseTotal[0].total
      })
    })
    //when an item in database is removed, want the data of the removed obj back so that can update budget amount
    dbRef.on('child_removed', function (snapshot) {
      const amountToAddBack = snapshot.val().amount;
      console.log(amountToAddBack);
      const updated = this.state.updatedBudget + parseInt(amountToAddBack);
      console.log (updated); //null
    }); //dbRef remove from database event listener ends
  }//componentDidMount ends

  handleInitialSubmit(e) {
    e.preventDefault(); 
    const initialBudgetValue = {
      total: this.state.totalBudget
    }
    this.setState({
      updatedBudget: this.state.totalBudget
    });
  } //handleIntial submit ends

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  } //handleChange ends

  handleUpdate(){
    firebase.database().ref(`budgetItems/totalBudget/${this.state.firebaseKey}`).update({
      total: this.state.totalBudget,
    });
    console.log(this.state.firebaseKey)
  }
  handleItemSubmit(e) {
    e.preventDefault();
    const listItem = {
      category: this.state.budgetCategory,
      item: this.state.item,
      amount: this.state.amount,
    }
    const dbRef= firebase.database().ref('budgetItems');
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
    firebase.database().ref(`budgetItems/${keyToRemove}`).remove();
  }

  render() {
    return (
      <div> {/* container */}
        <div id="initialScreen">
          <h2>Please enter your total budget for this month: </h2>
          <form className="firstForm" onSubmit={this.handleInitialSubmit}>
            <input type="number" name="totalBudget" value={this.state.totalBudget} onChange={this.handleChange} />
            <input type="submit" value="Get Started!" onClick={this.handleUpdate}/>
          </form>
        </div>
        <Mainscreen 
        whenChange={this.handleChange}
        whenSubmit={this.handleItemSubmit}/>
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
