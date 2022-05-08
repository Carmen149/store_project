import React from "react";
import { Link } from "react-router-dom";
import "./ButonStore.css";

function ButonStore() {
  return (
    <Link to="signup">
      <button className="btn-store">LogOut</button>
    </Link>
  );
}

export default ButonStore;