
// get user location
navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        success: true
    };
    return pos;
}, ()=>{return {success:false}})


import { call, put, takeEvery } from "redux-saga/effects";
import {
    ADD_REST,
    DELETE_REST,
    FETCH_RESTS,
    WATCH_REVIEWS,
    GET_REST
} from "../actions/types";
import {
    loadedRests,
    restsFailure,
    addRestSuccess,
    reviewsSuccsses,
    reviewsFailure,
    getRestSuccsses
} from "../actions/restaurantAction";

function* getAllRestaurants() {
    console.log("get all restaurants");
    try {
        const res = yield call(fetch, "/api/restaurants", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const rests = yield call([res, "json"]);
        yield put(loadedRests(rests));
    } catch (e) {
        yield put(restsFailure(e.message));
    }
}

export default function* LocationSaga() {
    yield takeEvery(FETCH_RESTS, getAllRestaurants);
}