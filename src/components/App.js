import React, { Component } from "react";
import Navbar from "./Navbar";
import RecipeItem from "./RecipeItem";
import recipes from "../sample_data/recipes.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ""
    };
    this.updateValueSearched = this.updateValueSearched.bind(this);
  }

  getHighlightedText(text, search) {
    if (text.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
      let splitted = text.split(new RegExp(`(${search})`, "gi"));
      return splitted.map(finder =>
        finder.toLowerCase() === search.toLowerCase() ? (
          <mark>{finder}</mark>
        ) : (
          finder
        )
      );
    }
    return text;
  }
  updateValueSearched(event) {
    this.setState({ searchString: event.target.value });
  }
  render() {
    let filteredRecipes = this.recipes.filter(recipe => {
      return (
        recipe.title
          .toLowerCase()
          .indexOf(this.state.searchString.toLowerCase()) !== -1 ||
        recipe.ingredients
          .toLowerCase()
          .indexOf(this.state.searchString.toLowerCase()) !== -1
      );
    });
    return (
      <div className="App">
        <Navbar
          value={this.state.searchString}
          search={this.updateValueSearched}
        />
        <div className="container mt-10">
          <div className="row">
            {filteredRecipes.length >= 1 ? (
              filteredRecipes.map(recipe => {
                return (
                  <RecipeItem
                    title={this.getHighlightedText(
                      recipe.title,
                      this.state.searchString
                    )}
                    ingredients={this.getHighlightedText(
                      recipe.ingredients,
                      this.state.searchString
                    )}
                    thumbnail={recipe.thumbnail}
                  />
                );
              })
            ) : (
              <h1 className="notFound">No Results to Show</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
