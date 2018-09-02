import axios from 'axios';
import { FETCH_MEALS, SAVE_MEAL, ADD_MEAL, REMOVE_MEAL, CLEAR_MEALS, RANDOMIZE_MEALS } from './types';
import * as toastr from 'toastr';

toastr.options = {
    'preventDuplicates': true,
    'positionClass': 'toast-bottom-center'
};

const url = 'https://jodinichols.work/api/meal-planner/';

export function fetchMeals() {
    const response = axios.get(url + 'fetch-meals');

    return {
        type: FETCH_MEALS,
        payload: response
    };
}

export function saveMeal(meal) {
    const response = axios.post(url + 'save-meal', meal)
        .then(res => {
            if (res.data.id > 0) {
                toastr.success('Meal created', 'Success!');
            } else {
                toastr.error('An error occurred', 'Failed!');
            }
        })
        .catch(res => {
            toastr.error('An error occurred', 'Failed!');
        });

    return {
        type: SAVE_MEAL,
        payload: response
    };
}

export function addMeal(id) {
    return {
        type: ADD_MEAL,
        payload: id
    };
}

export function removeMeal(id) {
    return {
        type: REMOVE_MEAL,
        payload: id
    };
}

export function clearMeals() {
    return {
        type: CLEAR_MEALS
    };
}

export function randomizeMeals() {
    return {
        type: RANDOMIZE_MEALS
    };
}