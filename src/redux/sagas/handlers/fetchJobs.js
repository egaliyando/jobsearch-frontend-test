import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* handleGetJobs(action) {
  try {
    const { data } = yield call(axios.get, `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`, {
      params: action.args,
    });

    yield put({ type: 'GET_JOBS_SUCCESS', jobs: data });
  } catch (err) {
    yield put({ type: 'GET_JOBS_FAILED', message: err.message });
  }
}

function* watcherUserSaga() {
  yield takeLatest('GET_JOBS_REQUESTED', handleGetJobs);
}

export default watcherUserSaga;
