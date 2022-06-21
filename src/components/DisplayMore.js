import React, { useEffect, useState } from "react";
import "../DisplayMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function DisplayMore(props) {
  const { tabData, data, setMore } = props;
  const [displaydData, setDisplayData] = useState([]);

  return (
    <div>
      <div className="head">
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="1x"
          color="#414e5a"
          onClick={(e) => setMore(false)}
        />
        <div className="title">{tabData}</div>
        <div></div>
      </div>
      <hr></hr>
      <div className="container1">
        <div className="wrprCnt">
          {/* {console.log(displaydData)} */}
          {data["0"]["data"].length > 0 &&
            data["0"]["data"].map((child) => (
              <div
                className="element"
                onClick={(event) => {
                  window.location.replace(
                    `https://www.justdial.com${child.url}`
                  );
                }}
              >
                <img src={child.simg} alt={child.name}></img>
                <p key={child.name}>{child?.vname}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayMore;
