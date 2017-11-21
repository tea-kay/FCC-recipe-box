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
    //   {
    //     recipeName: 'Breakfast Sandwich',
    //     ingredients: ['Eggs1', 'Lettuce', 'Bread', 'Mustard'],
    //   },
    //   {
    //     recipeName: 'Breakfast Sandwich',
    //     ingredients: ['Eggs2', 'Lettuce', 'Bread', 'Mustard'],
    //   },
    //   {
    //     recipeName: 'Breakfast Sandwich',
    //     ingredients: ['Eggs3', 'Lettuce', 'Bread', 'Mustard'],
    //   }
    ],
    showAdd: false,
    showEdit: false,
    currentIndex: 0,
    newestRecipe: {
      recipeName: "",
      ingredients: []
    }
  }
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }
  updateNewRecipe(recipeName, ingredients) {
    this.setState( { newestRecipe: { recipeName, ingredients } } );
  }

  saveNewRecipe() {
    let recipes = this.state.recipes.slice();
    let { recipeName } = this.state.newestRecipe;
    let { ingredients } = this.state.newestRecipe;

    recipes.push({ recipeName, ingredients })
    localStorage.setItem('recipes', JSON.stringify(recipes));

    this.setState({ recipes });
    this.setState({ recipeName: '', ingredients: [] });
    this.close();
  }

  close = () => {
    if (this.state.showAdd) {
      this.setState({ showAdd: false });
    }
    if (this.state.showEdit) {
      this.setState({ showEdit: false });
    }
  }
  open = (state, currentIndex) => {
    this.setState({ [state]: true });
    this.setState({ currentIndex });
  }
  updateRecipeName(recipeName, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName, ingredients: recipes[currentIndex].ingredients };
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }
  updateIngredients(ingredients, currentIndex) {
    let recipes = this.state.recipes.slice();
    recipes[currentIndex] = { recipeName:recipes[currentIndex].recipeName, ingredients };
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({ recipes });
  }

  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({ recipes });
  }

  render() {
    const { recipes, newestRecipe, currentIndex } = this.state;

    return (
      <div className="App container">
      { recipes.length > 0 && (
        <div>
          <Accordion>
            { recipes.map((recipe, index) => (
              <Panel header={ recipe.recipeName } eventKey={ index } key={ index }>
                <div>
                  {recipe.ingredients.map((item) => (
                    <p key={ item }>{ item }</p>
                  ))}
                </div>
                <ButtonToolbar>
                  <Button bsStyle="danger" onClick={ (event)=>this.deleteRecipe(index) } >Delete</Button>
                  <Button bsStyle="default" onClick={ (event)=>this.open("showEdit", index) }>Edit</Button>
                </ButtonToolbar>
              </Panel>
            )) }
          </Accordion>
            <Modal show={ this.state.showEdit } onHide={ this.close }>
              <Modal.Header closeButton>
                <Modal.Title>Edit Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={ recipes[currentIndex].recipeName }
                    placeholder="Enter Text"
                    onChange = { (event) => this.updateRecipeName(event.target.value, currentIndex) }
                  ></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    value={ recipes[currentIndex].ingredients }
                    onChange = { (event) => this.updateIngredients(event.target.value.split(","), currentIndex) }>
                  </FormControl>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={ this.close }>Close</Button>
              </Modal.Footer>
            </Modal>
        </div>
      )}
        <Modal show={ this.state.showAdd } onHide={ this.close }>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
            <Modal.Body>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Recipe Name</ControlLabel>
                <FormControl
                  type="text"
                  value={newestRecipe.recipeName}
                  placeholder="Enter Recipe Name"
                  onChange = { (event) => this.updateNewRecipe(event.target.value, newestRecipe.ingredients) }
                ></FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="textarea"
                  value={newestRecipe.ingredients}
                  placeholder="Enter Ingredients: Please Separate By Commas"
                  onChange = { (event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(",")) }
                ></FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={ (event) => this.saveNewRecipe() }>Save Recipe</Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
        <Button bsStyle="primary" onClick={ (event) => this.open('showAdd', currentIndex) }>Add Recipe</Button>
      </div>
    );
  }
}

export default App;
