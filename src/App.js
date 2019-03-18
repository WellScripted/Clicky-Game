import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import dice from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.dice to the cards json array
  state = {
    dice,
    clickedDiceIds: [],
    score: 0,
    goal: 6,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  rollDiceCard = id => {
    let clickedDiceIds = this.state.clickedDiceIds;

    if(clickedDiceIds.includes(id)){
      this.setState({ clickedDiceIds: [], score: 0, status:  "Game Over! You lost. Have you considered early retirement? Click to play again!" });
      return;
    }else{
      clickedDiceIds.push(id)

      if(clickedDiceIds.length === 6){
        this.setState({score: 6, status: "Congradulations! You Won! Click to play again!", clickedDiceIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ dice, clickedDiceIds, score: clickedDiceIds.length, status: " " });

      for (let i = dice.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [dice[i], dice[j]] = [dice[j], dice[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Roll of the Dice</h1>
          <p className="App-intro">
            Please don't click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={6}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.dice.map(theDice => (
            <Card
              rollDiceCard={this.rollDiceCard}
              id={theDice.id}
              key={theDice.id}
              image={theDice.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p>&copy;Big Willie Style 2018<a href="https://github.com/WellScripted" target="_blank" rel="noopener noreferrer"> here</a>.</p>
        </footer>
    </div>
    );
  }
}

export default App;
