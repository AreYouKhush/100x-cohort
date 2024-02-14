import React, { useEffect, useState } from "react";

const BusinessCard = (props) => {
  const [alias, setAlias] = useState(props.aliases[0]);

  const changeAlias = () => {
    let i = 0;
    setInterval(() => {
      if (i < props.aliases.length) {
        setAlias(props.aliases[i]);
        i++;
      } else {
        i = 0;
        setAlias(props.aliases[i]);
      }
    }, 1500);
  };

  useEffect(() => {
    changeAlias();
  }, []);

  return (
    <div className="bg-black w-96 h-56 rounded-2xl text-gray-300 px-2 py-1 relative drop-shadow-glow hover:drop-shadow-deepglow duration-150 cursor-pointer select-none">
      <div className="w-72 flex flex-col justify-between h-full p-3">
        <div>
          <div className="font-bold uppercase">{props.name}</div>
          <div className="font-semibold text-xs uppercase">{alias}</div>
        </div>
        <div>
          <div className="uppercase font-semibold text-sm">Interests: </div>
          <ul>
            {props.interests.map((elem, key) => {
              return (
                <li className="text-sm" key={key}>
                  {elem}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <span className="font-semibold uppercase">Dragon:</span>{" "}
          {props.dragon}
        </div>
      </div>
      <div className="w-28 absolute right-2 top-2">
        <img className="rounded-xl " src={props.imageLink} alt="" />
      </div>
      <button
        className="absolute bottom-3 right-3 px-5 py-2 bg-orange-600 rounded-xl font-bold hover:bg-orange-700 hover:opacity-75 duration-150"
        onClick={() => window.open(props.fandomLink)}
      >
        Fandom
      </button>
    </div>
  );
};

export default BusinessCard;
