import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ElementsList(props) {
  const { data, setTab, setCount } = props;

  return (
    <div>
      <div className="container">
        {data?.length > 0 &&
          data.map((elem) => {
            return (
              <div
                key={`${elem.tab}${elem.tab_ln}`}
                id={elem.tab}
                className="wrpr"
              >
                <span>{elem.tab}</span>
                <div className="wrprCnt">
                  {elem?.data?.length > 0 &&
                    elem.data.map((child, index) => {
                      if (index > 5) {
                        return false;
                      }
                      return (
                        <div
                          className="element"
                          key={child.name}
                          onClick={(event) => {
                            window.location.replace(
                              `https://www.justdial.com${child.url}`
                            );
                          }}
                        >
                          <img src={child.simg} alt={child.name}></img>
                          <p key={child.name}>{child?.vname}</p>
                        </div>
                      );
                    })}
                  {elem?.data?.length > 6 && (
                    <div
                      className="moreoption"
                      onClick={(event) => {
                        setTab(elem.tab);
                        setCount(1);
                      }}
                    >
                      <FontAwesomeIcon icon={faEllipsisH} size="2x" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ElementsList;
