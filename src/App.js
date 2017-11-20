import React, { Component } from 'react';
import './App.css';

import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class App extends Component {

  state = {
    recipes: [
      {
        recipeName: 'Breakfast Sandwich',
        ingredients: ['Eggs1', 'Lettuce', 'Bread', 'Mustard'],
      },
      {
        recipeName: 'Breakfast Sandwich',
        ingredients: ['Eggs2', 'Lettuce', 'Bread', 'Mustard'],
      },
      {
        recipeName: 'Breakfast Sandwich',
        ingredients: ['Eggs3', 'Lettuce', 'Bread', 'Mustard'],
      }
    ],
    showAdd: false,
    newestRecipe: {
      recipeName: "",
      ingredients: []
    }
  }
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({ recipes });
  }

  newestRecipeRecipeName(recipeName, ingredients) {
    this.setState( { newestRecipe: { recipeName, ingredients } } );
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
  }
  open = (state) => {
    this.setState({ [state]: true });
  }
  render() {
    const { recipes, newestRecipe } = this.state;

    return (
      <div className="App container">
        <Accordion>
          { recipes.map((recipe, index) => (
            <Panel header={ recipe.recipeName } eventKey={ index } key={ index }>
              <ul>
                {recipe.ingredients.map((item) => (
                  <li key={ item }>{ item }</li>
                ))}
              </ul>
              <ButtonToolbar>
                <Button bsStyle="danger" onClick={ (event)=>this.deleteRecipe(index) } >Delete</Button>
                <Button bsStyle="default">Edit</Button>
              </ButtonToolbar>
            </Panel>
          )) }
        </Accordion>
        <Modal show={ this.state.showAdd } onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange = { (event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients) }
                ></FormControl>
              </FormGroup>
            </Modal.Body>
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={ (event) => this.open('showAdd') }>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
