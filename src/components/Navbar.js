import React from 'react';

function Navbar() {
  const [user, setuser] = React.useState(null);

  const onLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  React.useEffect(() => {
    setuser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className="w-full flex justify-between items-center bg-sky-700 p-3">
      <p className="text-xl font-bold text-white">
        GitHub <span className="font-light">Jobs</span>
      </p>

      <div className="flex items-center">
        <div className="px-3 py-1 mr-3 rounded-lg bg-sky-600 text-white">{user?.name}</div>
        <p className="text-md font-bold text-white cursor-pointer" onClick={onLogout}>
          <span className="font-light">Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Navbar;
