export const getJobs = (params) => {
  return {
    type: 'GET_JOBS_REQUESTED',
    args: params,
  };
};
