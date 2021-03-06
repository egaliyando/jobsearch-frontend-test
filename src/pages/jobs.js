import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { put, takeLatest } from 'redux-saga/effects';

import { getJobs } from '../redux/actions/jobs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Jobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const datas = useSelector((state) => state.jobs);

  const [page, setPage] = useState(1);
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [isFulltime, setIsFulltime] = useState(false);
  const [datalIsLimit, setDatalIsLimit] = useState(true);

  const onSearch = () => {
    let params = {
      description: desc,
      location: location,
      full_time: isFulltime,
    };
    dispatch(getJobs(params));
  };

  React.useEffect(() => {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user);
    if (!token) {
      window.location.href = '/';
    }
  }, []);

  const onLoadMore = () => {
    setPage(page + 1);
    axios
      .get(`http://dev3.dansmultipro.co.id/api/recruitment/positions.json`, {
        params: {
          description: desc,
          location: location,
          full_time: isFulltime,
          page: page + 1,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setDatalIsLimit(true);
          let _temp = [];
          res.data.forEach((item) => {
            if (item?.id) {
              _temp.push(item);
            }
          });
          dispatch({ type: 'GET_JOBS_SUCCESS', jobs: _temp.concat(datas.jobs) });
        }
      })
      .catch((err) => {
        console.log(err.response);
        setDatalIsLimit(false);
      });
  };

  React.useEffect(() => {
    let params = {
      description: desc,
      location: location,
      full_time: isFulltime,
      page: page,
    };
    dispatch(getJobs(params));
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-between px-3 py-5">
        <div>
          <p className="font-semibold">Job Description</p>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Filter by title, benefit, companies, experties"
            className="border w-full border-gray-200 p-1"
          />
        </div>
        <div className="ml-5">
          <p className="font-semibold">Location</p>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by city, state, zip code or country"
            className="border w-full border-gray-200 p-1"
          />
        </div>
        <div className="ml-5">
          <p className="font-semibold opacity-0">-</p>

          <div className="flex items-center">
            <input type="checkbox" checked={isFulltime} onChange={(e) => setIsFulltime(e.target.checked)} />
            <p className="font-semibold ml-2">Full Time Only</p>
          </div>
        </div>

        <div className="ml-5">
          <p className="font-semibold opacity-0">-</p>

          <button onClick={onSearch} className="px-4 py-1 rounded-md bg-gray-400 text-white">
            Search
          </button>
        </div>
      </div>

      <p className="text-2xl font-bold ml-3 mt-3">Job List</p>

      <div className="mx-3 p-3 shadow-lg rounded-lg">
        {datas.loading ? (
          <span>Loading...</span>
        ) : (
          datas.jobs?.map((item) => {
            if (item?.id) {
              return (
                <div
                  onClick={() => navigate(`${item?.id}`)}
                  className="border-b cursor-pointer border-gray-600 py-4"
                  key={item?.id}
                >
                  <p className="text-lg text-sky-600 font-semibold">{item?.title}</p>
                  <div className="flex text-gray-400">
                    {item?.company} - <span className="font-semibold ml-1 text-green-400">{item?.type}</span>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      {datalIsLimit && (
        <button onClick={onLoadMore} className="w-full py-1 rounded-md bg-sky-600 font-semibold m-3 text-white">
          Load More
        </button>
      )}
    </div>
  );
}

export default Jobs;
