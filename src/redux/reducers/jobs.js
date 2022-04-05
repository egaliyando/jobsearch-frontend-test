const initialState = {
  jobs: [],
  args: { description: '', location: '', full_time: '' },
  loading: false,
  error: null,
};

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_JOBS_REQUESTED':
      return { ...state, loading: true };
    case 'GET_JOBS_SUCCESS':
      return { ...state, loading: false, jobs: action.jobs };
    case 'GET_JOBS_FAILED':
      return { ...state, loading: false, error: action.message };
    case 'AXIOS_ARGS':
      return { ...state, loading: false, args: action.args };
    default:
      return state;
  }
};

export default jobs;
