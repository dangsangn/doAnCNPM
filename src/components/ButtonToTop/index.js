import React, { useEffect, useState } from "react";
import "./style.css";
function ButtonToTop(props) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setHeight(window.pageYOffset);
    };
  }, []);
  const handleToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      {height > 100 ? (
        <div className="btn-container">
          <button onClick={handleToTop} className=" btn--top">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ButtonToTop;
