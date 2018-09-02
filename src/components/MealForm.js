import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';

class MealForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      duration: 1,
      winter: false
    };

    this.changeName = this.changeName.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeWinter = this.changeWinter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeDuration(event) {
    const value = parseInt(event.target.value);
    let duration = 1;

    if (value > 0 && value < 6) {
      duration = value;
    }
    
    this.setState({ duration: duration });
  }

  changeWinter(event) {
    this.setState({ winter: event.target.checked });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.saveMeal(this.state);
    
    this.setState({
      name: '',
      duration: 1,
      winter: false
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <h4 className="card-title">Create Meal</h4>
            <hr/>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" onChange={this.changeName} value={this.state.name} />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Days It Lasts</label>
              <input type="number" min="1" max="5" step="1" className="form-control" id="duration" placeholder="1" onChange={this.changeDuration} value={this.state.duration} />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="winter" onChange={this.changeWinter} checked={this.state.winter} />
                <label htmlFor="winter" className="custom-control-label">For Winter Only?</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
      
    );
  }
}

export default connect(null, actions)(MealForm);