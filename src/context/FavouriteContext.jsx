import React, { createContext, useContext, useState, useEffect } from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
    window.dispatchEvent(new Event("favouritesUpdated"));
  }, [favourites]);

  const addToFavourite = (id) => {
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  const removeFromFavourite = (id) => {
    setFavourites(favourites.filter((item) => item !== id));
  };

  const isFavourite = (id) => favourites.includes(id);

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourite, removeFromFavourite, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
