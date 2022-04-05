import { all } from 'redux-saga/effects';
import watcherJobsSaga from './handlers/fetchJobs';

export default function* rootSaga() {
  yield all([watcherJobsSaga()]);
}
