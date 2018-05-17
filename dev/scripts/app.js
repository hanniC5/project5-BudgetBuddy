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
      initialBudget: 0,
      updatedBudget: 0,
      amount: 0,
      budgetCategory: "",
      item: "" , 
      //budgetItems: [],
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
  } //constructor ends

  componentDidMount() {
    const dbRef = firebase.database().ref('budgetItems');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const budgetItemsArray = [];
      for (let item in data) {
        data[item].key = item;
        budgetItemsArray.push(data[item]);
      }
      console.log(budgetItemsArray);
      // this.setState({
      //   budgetItems: budgetItemsArray
      // })
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
    }); //dbRef event listener ends
  }//componentDidMount ends

  handleInitialSubmit(e) {
    e.preventDefault();
    //console.log(this.state.initialBudget);
    this.setState({
      totalBudget: this.state.initialBudget, 
      updatedBudget: this.state.initialBudget
    })
  } //handleIntial submit ends

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  } //handleChange ends

  handleItemSubmit(e) {
    e.preventDefault();
    const listItem = {
      category: this.state.budgetCategory,
      item: this.state.item,
      amount: this.state.amount
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


  render() {
    return (
      <div> {/* container */}
        <div id="initialScreen">
          <h2>Please enter your total budget for this month: </h2>
          <form className="firstForm" onSubmit={this.handleInitialSubmit}>
            <input type="number" name="initialBudget" value={this.state.initialBudget} onChange={this.handleChange} />
            <input type="submit" value="Get Started!"/>
          </form>
        </div>
        <Mainscreen 
        totalBudg={this.state.totalBudget}
        whenChange={this.handleChange}
        whenSubmit={this.handleItemSubmit}
        remaining={this.state.updatedBudget}/>
        <BudgetList 
        key={this.state.key}
        homeInfo={this.state.home}
        foodInfo={this.state.food}
        transInfo={this.state.transportation}
        billsInfo={this.state.bills}
        saveInfo={this.state.savings}
        otherInfo={this.state.other}
        />
        <div className="totals">
          <p>Remaining budget: {this.state.updatedBudget}</p>
          <p>Your total budget is: {this.state.totalBudget}</p>
        </div>
      </div> /* main container div */
    )
  } //render ends
}

ReactDOM.render(<App />, document.getElementById('app'));
