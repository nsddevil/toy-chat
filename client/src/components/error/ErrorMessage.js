import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="my-1">
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage;
