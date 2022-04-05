import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const parse = require('html-react-parser');

function JobDetail() {
  const params = useParams();
  const [detail, setDetail] = useState({
    type: '',
    url: '',
    created_at: '',
    company: '',
    company_url: '',
    location: '',
    title: '',
    description: '',
    how_to_apply: '',
    company_logo: '',
  });

  const fetchJobById = async (id) => {
    axios.get(`http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`).then((res) => {
      console.log(res);
      setDetail(res.data);
    });
  };

  React.useEffect(() => {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user);
    if (!token) {
      window.location.href = '/';
    }

    const jobId = params.id;

    fetchJobById(jobId);
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full flex justify-between items-center bg-sky-700 p-3">
        <p className="text-xl font-bold text-white">
          GitHub <span className="font-light">Jobs</span>
        </p>
      </div>

      <div className="container-fluid mb-8 px-10">
        <Link to="/jobs">
          <p className="font-bold text-lg my-5 text-blue-500">{'<-'} Back</p>
        </Link>

        <div className="border border-4 px-5 py-5 bg-white">
          <p>
            {detail.type} / {detail.location}
          </p>
          <h1 className="font-bold text-2xl mb-8">{detail.title}</h1>

          <div className="border-b-2 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-8">{parse(detail.description)}</div>

            <div className="col-span-4">
              {/* Company */}
              <div className="border border-4 px-5 py-5 bg-gray-100 mb-8">
                <div className="grid grid-cols-4 border-b-2 pb-2">
                  <p className="col-span-3">{detail.company}</p>
                  <div className="cols-span-1">
                    <p className="bg-gray-200 text-sm inline text-blue-500 font-bold rounded-md px-1 py-1">1 other job</p>
                  </div>
                </div>

                <div className="bg-white p-2 mt-2">
                  <p className="text-red-500 text-xs text-center">
                    Note: Source dari gambar kebanyakan tidak valid atau server memberikan 404
                  </p>
                  <img src={detail.company_logo} />
                </div>

                <a className="text-blue-500 underline">{detail.company_url}</a>
              </div>

              <div className="border border-4 px-5 py-5 bg-yellow-100">
                <p className="font-bold border-b-2 pb-2 mb-2">How to Apply</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: detail.how_to_apply,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
