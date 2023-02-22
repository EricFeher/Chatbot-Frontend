import React from 'react';
import EndLoader from "./EndLoader";

const PageNotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the requested page could not be found.</p>
        <EndLoader/>
    </div>
  );
};

export default PageNotFound;
