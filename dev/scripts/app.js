import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import InitialScreen from './InitialScreen';
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
      budgetCategory: '',
      item: '', 
      home: [],
      food: [],
      transportation: [],
      bills: [],
      savings: [],
      other: [], 
      view: 'initial'
    }
    this.handleInitialSubmit = this.handleInitialSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.removeBudgetItem = this.removeBudgetItem.bind(this);
    this.handleTotalUpdate = this.handleTotalUpdate.bind(this);
    this.renderScreenInitial= this.renderScreenInitial.bind(this);
    this.renderMainscreen = this.renderMainscreen.bind(this);
    this.resetBudget = this.resetBudget.bind(this);
  } //constructor ends

  componentDidMount() {
    const dbRef = firebase.database().ref('budgetItems/items');
    dbRef.on('value', (snapshot) => {
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
      let amountInDb = 0;
      for (let item in data) {
        amountInDb += parseInt(data[item].amount);
      }
      this.setState({
        updatedBudget: this.state.totalBudget - amountInDb
      });
      firebase.database().ref(`budgetItems/totalBudget/${this.state.firebaseKey}`).update({
        updated: amountInDb
      })
    }) //dbRef value change event listener ends
    //event listener to get the key for the total budget
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
    });
  }//componentDidMount ends

//method to handle the submit of the first form where user enters their total monthly budget 
  handleInitialSubmit(e) {
    e.preventDefault(); 
    const initialBudgetValue = {
      total: this.state.totalBudget
    }
    this.setState({
      updatedBudget: this.state.totalBudget, 
      view: 'main'
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
    });
  } //handleTotalUpdate ends 

//method to add each budget item to the list on the page as well as to the database 
  handleItemSubmit(e) {
    e.preventDefault();
    const listItem = {
      category: this.state.budgetCategory,
      item: this.state.item,
      amount: this.state.amount
    }
    const dbRef= firebase.database().ref('budgetItems').child('items');
    dbRef.push(listItem);
    //const updated = this.state.updatedBudget - listItem.amount;
    this.setState({
      //updatedBudget: updated,
      category: '',
      item: '',
      amount: 0
    })
  } //handleItemSubmit ends

//method to remove item from list and db on user click of remove button
  removeBudgetItem(keyToRemove) {
    firebase.database().ref(`budgetItems/items/${keyToRemove}`).remove();
  }

//method to render the initial screen  
  renderScreenInitial() {
    if(this.state.view == 'initial') {
      return (
        <InitialScreen
          handleInitialSubmit={this.handleInitialSubmit}
          handleChange={this.handleChange}
          totalBudget={this.state.totalBudget}
          handleTotalUpdate={this.handleTotalUpdate}
        />
      )
    } else {
      return null; 
    }
  }
//method to render the mainscreen
  renderMainscreen() {
    if(this.state.view === 'main') {
      return (
        <React.Fragment>
          <Mainscreen
            whenChange={this.handleChange}
            whenSubmit={this.handleItemSubmit}
            updatedBudget={this.state.updatedBudget}
            totalBudget={this.state.totalBudget}
            resetBudget={this.resetBudget}
          />
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
        </React.Fragment>
      )
    } else {
      return null
    }
  } //render mainScreen method ends

//method to reset the whole db and budget list- takes user back to mainscreen 
resetBudget() {
  console.log('hi reset budget')
  this.setState({
    view: 'initial'
  })
}
  render() {
    return (
      <div id="container"> 
          {this.renderScreenInitial()}
          {this.renderMainscreen()}
        
      </div> /* main container div */
    )
  } //render ends
}

ReactDOM.render(<App />, document.getElementById('app'));
