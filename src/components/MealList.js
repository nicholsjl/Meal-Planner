import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class MealList extends Component {
  constructor(props) {
    super(props);
    this.randomizeMeals = this.randomizeMeals.bind(this);
    this.clearMeals = this.clearMeals.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.removeMeal = this.removeMeal.bind(this);
  }

  componentDidMount() {
    this.props.fetchMeals();
  }

  renderMeals() {
    if (!this.props.available.length) {
      return (
        <li className="list-group-item">Loading...</li>
      );
    }

    return this.props.available.map(meal => {
      return (
        <a href="#" className="list-group-item list-group-item-action" key={meal.id} onClick={this.addMeal} data-id={meal.id}>
          {meal.name} ({meal.duration} days)
        </a>
      );
    });
  }

  renderSelections() {
    if (!this.props.selected.length) {
      return '';
    }

    return this.props.selected.map(meal => {
      return (
        <li key={meal.id}>
          {meal.name} ({meal.duration} days)
          <a href="#" className="ml-3" onClick={this.removeMeal} data-id={meal.id}>Remove</a>
        </li>
      );
    });
  }

  render() {
    let badgeClass = 'warning';
    let daysRemaining = this.props.daysRemaining;

    if (daysRemaining < 0) {
      badgeClass = 'danger';
    } else if (daysRemaining == 0) {
      badgeClass = 'success';
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-8 mb-3">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title d-inline">Meals for Next Two Weeks</h4>
                <div className="float-md-right mt-3 mt-sm-0">
                  <button type="button" className="btn btn-success btn-sm" onClick={this.randomizeMeals}>Randomize</button>
                  <button type="button" className="btn btn-light btn-sm ml-2" onClick={this.clearMeals}>Clear</button>
                </div>
                <hr/>

                <h5><span className={"badge badge-" + badgeClass}>{this.props.daysRemaining} days remaining</span></h5>

                {!this.props.selected.length ? 'Select from the available meals or click Randomize.' : ''}

                <ul>{this.renderSelections()}</ul>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">Available Meals</div>
              <div className="list-group list-group-flush">{this.renderMeals()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  randomizeMeals() {
    this.props.clearMeals();
    this.props.randomizeMeals();
  }

  clearMeals() {
    this.props.clearMeals();
  }

  addMeal(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    this.props.addMeal(id);
  }

  removeMeal(event) {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    this.props.removeMeal(id);
  }
}

function mapStateToProps(state) {
  return {
    daysRemaining: state.meals.daysRemaining,
    available: state.meals.available,
    selected: state.meals.selected,
  };
}

export default connect(mapStateToProps, actions)(MealList);