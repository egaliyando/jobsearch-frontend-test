const url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json';

const fetchJobs = () => {
  return fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};

export default fetchJobs;
