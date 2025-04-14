import React from "react";

const ActivityIndicator = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
      <strong className="ml-1">Cargando....</strong>
    </div>
  );
};

export default ActivityIndicator;
