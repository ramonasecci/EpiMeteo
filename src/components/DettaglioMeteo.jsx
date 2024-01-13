import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DettagliSettimana from "./DettagliSettimana";
import DetailsDay from "./DetailsDay";
import HeroToday from "./HeroToday";

const DettaglioMeteo = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [oggi, setOggi] = useState({})
  const [location,setLocation] = useState(null)
  const params = useParams();

  const getNewToday = (today) => {
    setOggi(today)
  }

  useEffect(() => {
    const fetchCoordinate = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${params.city}&count=3&language=it&format=json`
        );
        const resultsList = response.data.results;
        setResults(resultsList);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.city) {
      fetchCoordinate();
     setLocation(params.city)
    }
  }, [params.city]);

  const latitude = results[0]?.latitude || null;
  const longitude = results[0]?.longitude || null;

  return (
    <>
      {latitude && longitude && (
        <>
          <HeroToday today={oggi} city={location}/>
          <DettagliSettimana latitudine={latitude} longitudine={longitude} dayShow={6}/>
          <DetailsDay latitudine={latitude} longitudine={longitude} getNewToday={getNewToday}/>
        </>
      )}
      {isLoading && <p>Caricamento...</p>}
      {error && <p>Errore: {error}</p>}
    </>
  );
};

export default DettaglioMeteo;
