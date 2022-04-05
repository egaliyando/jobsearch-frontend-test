import React from 'react';

function Button({ className, action, children }) {
  return (
    <button
      className={`${className} text-white px-4 py-2 rounded-lg w-full font-semibold flex justify-start items-center`}
      onClick={action}
    >
      {children}
    </button>
  );
}

export default Button;
