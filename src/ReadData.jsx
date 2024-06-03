import { useState, useEffect } from "react";
import fakedata from "../data.json";

const fetchData = async () => {
 // const response = await fetch("https://cinema-react-exploding.vercel.app/data.json");
 // const data = await response.json();
 const data = fakedata;
  return data;
};

const useData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return data;
};

export default useData;

//MOLTO INTERESSANTE: UNA VOLTA FATTA LA FETCH
//LA RITORNA IN QUESTA NUOVA FUNZIONE IN MANIERA MOLTO SEMPLICE,
//ESTRAE I DATI E SALVA LO STATO DI QUESTI DATI
//ESPORTA POI SOLO LA FUNZIONE --- export default useData;

//   const useData = () => {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//       fetchData().then(setData);
//     }, []);
//
//     return data;
//   };
