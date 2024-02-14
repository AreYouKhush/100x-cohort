import React from "react";
import BusinessCard from "./components/BusinessCard";

const App = () => {
  return (
    <div className="p-5 bg-stone-950 h-dvh">
      <BusinessCard
        name={"Daemon Targeryen"}
        aliases={[
          "Prince of the City",
          "Lord of Flea Bottom",
          "The rogue prince",
        ]}
        title={[
          "Prince",
          "Ser",
          "Commander of the City Watch",
          "Master of coin",
          "Master of laws",
          "King of the Stepstones and the Narrow Sea",
          "Lord of Runestone",
          "Protector of the Realm",
        ]}
        interests={["Jousting", "Hunting", "Swordplay"]}
        Allegiances={["House Targaryen", "Blacks"]}
        dragon={"Caraxes"}
        fandomLink={"https://gameofthrones.fandom.com/wiki/Daemon_Targaryen"}
        imageLink={"https://wallpaperaccess.in/public/uploads/preview/matt-smith-daemon-targaryen-house-of-the-dragon-hd-wallpaper-p.jpg"}
      ></BusinessCard>
    </div>
  );
};

export default App;
