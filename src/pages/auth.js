import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';

function Auth(props) {
  const navigate = useNavigate();
  const text = props;
  const types = props.typeOfLogin;

  React.useEffect(() => {
    let user = localStorage.getItem('user');
    let token = JSON.parse(user);
    if (token) {
      window.location.href = '/jobs';
    }
  }, []);

  const responseGoogle = (response) => {
    let data = {
      token: response.accessToken,
      name: response.Ju.tf,
    };
    localStorage.setItem('user', JSON.stringify(data));
    navigate('jobs');
  };
  const responseFacebook = (response) => {
    let data = {
      token: response.accessToken,
      name: response.name,
    };
    localStorage.setItem('user', JSON.stringify(data));
    navigate('jobs');
  };

  function showGmail() {
    return (
      <GoogleLogin
        clientId="491004959702-3bgqo54pt777f77dgl7cqd6s7e7rii81.apps.googleusercontent.com"
        buttonText={`${text.GMAIL ? ` ${text.GMAIL}` : 'LOGIN WITH GOOGLE'}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="GOOGLE"
      />
    );
  }

  function showFB() {
    return (
      <FacebookLogin
        btnContent="LOGIN With Facebook"
        appId="2101354396700728"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/3 bg-white rounded-lg shadow-lg p-5 text-center">
        <p className="text-lg py-4 font-bold text-sky-600 text-center">Github job Frontend test</p>
        {types.includes('GMAIL') ? showGmail() : null}

        {types.includes('FACEBOOK') ? showFB() : null}
      </div>
    </div>
  );
}

export default Auth;
