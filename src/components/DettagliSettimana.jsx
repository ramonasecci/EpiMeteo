import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import SingleDay from "./SingleDay";

const DettagliSettimana = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);


    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration`);
            const resultsData = response.data;
            setResults(resultsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (props.latitudine && props.longitudine) {
            fetchTempo();
        }
    }, [props.latitudine, props.longitudine]);

    return (
        <div className="mx-3">
            <Row className="text-center">
                {results?.daily?.weather_code?.slice(0, 0 + props.dayShow).map((codtempo, i) => (
                    <SingleDay results={results} codtempo={codtempo} i={i} />
                ))}
                {isLoading && <p>Caricamento...</p>}
                {error && <p>Errore: {error}</p>}
            </Row>
        </div>
    );
};

export default DettagliSettimana;

