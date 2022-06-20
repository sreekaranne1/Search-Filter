import React from "react";
import "../App.css";

function ElementsList(props) {
  const { data } = props;

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
                    elem.data.map((child) => (
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
            );
          })}
      </div>
    </div>
  );
}

export default ElementsList;
