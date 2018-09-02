import { FETCH_MEALS, SAVE_MEAL, ADD_MEAL, REMOVE_MEAL, CLEAR_MEALS, RANDOMIZE_MEALS } from '../actions/types';
import _ from 'lodash';

const initialState = {
    daysRemaining: 14,
    available: [],
    selected: [],
};

export default function (state = initialState, action) {
    let meal, meals, daysRemaining, selected;

    switch (action.type) {
        case SAVE_MEAL:
            return state;
        case FETCH_MEALS:
            return {
                daysRemaining: state.daysRemaining,
                available: action.payload.data.map(meal => meal),
                selected: state.selected,
            };
        case ADD_MEAL:
            meal = state.available.find(meal => meal.id == action.payload);

            if (state.selected.filter(i => i.id == action.payload).length) {
                selected = state.selected;
                daysRemaining = state.daysRemaining;
            } else {
                selected = [...state.selected, meal];
                daysRemaining = parseInt(state.daysRemaining) - parseInt(meal.duration);
            }

            return {
                daysRemaining: daysRemaining,
                available: state.available,
                selected: selected,
            };
        case REMOVE_MEAL:
            meal = state.available.find(meal => meal.id == action.payload);

            return {
                daysRemaining: parseInt(state.daysRemaining) + parseInt(meal.duration),
                available: state.available,
                selected: state.selected.filter(meal => meal.id != action.payload),
            };
        case CLEAR_MEALS:
            return {
                daysRemaining: initialState.daysRemaining,
                available: state.available,
                selected: initialState.selected
            };
        case RANDOMIZE_MEALS:
            daysRemaining = initialState.daysRemaining;
            const shuffled = _.shuffle(state.available);
            meals = [];

            for (let meal of shuffled) {
                if (daysRemaining - meal.duration >= 0) {
                    meals.push(meal);
                    daysRemaining -= meal.duration;
                }
            }

            return {
                daysRemaining: daysRemaining,
                available: state.available,
                selected: meals
            };
        default:
            return state;
    }
}