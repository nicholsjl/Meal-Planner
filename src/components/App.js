import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { baseURL } from '../routes';
import MealForm from './MealForm';
import MealList from './MealList';

class App extends Component {
    renderHeader() {
        const currentRoute = this.props.location.pathname;

        return (
            <ul className="nav nav-pills mb-3">
                <li className="nav-item">
                    <Link to={baseURL} className={"nav-link" + (currentRoute == baseURL ? ' active' : '')}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to={baseURL + "create-meal"} className={"nav-link" + (currentRoute == baseURL + 'create-meal' ? ' active' : '')}>Create Meal</Link>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <div className="container">
                <h1>Meal Planner</h1>
                {this.renderHeader()}
                <Route path={baseURL + "create-meal"} component={MealForm} />
                <Route path={baseURL} exact component={MealList} />
            </div>
        );
    }
}

export default connect(null, actions)(App);