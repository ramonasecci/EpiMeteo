import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

const DetailsDay = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m&daily=apparent_temperature_max,apparent_temperature_min`);
            const resultsData = response.data;
            setResults(resultsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const processResults = () => {
        console.log(results);
        const objToday = {
            tempPerc: results.current.apparent_temperature,
            maxtemp: results.daily.apparent_temperature_max[0],
            mintemp: results.daily.apparent_temperature_min[0],
            codeTemp: results.current.weather_code,
        };
        props.getNewToday(objToday);
    };

    useEffect(() => {
        if (props.latitudine && props.longitudine) {
            fetchTempo();
        }
    }, [props.latitudine, props.longitudine]);

    useEffect(() => {
        if (results) {
            processResults();
        }
    }, [results]);

    return (
        <>
            <Row>
                <Col>
                    {isLoading && <p>Caricamento...</p>}
                    {error && <p>Errore: {error}</p>}
                </Col>
            </Row>
            {results && (
                <Row>
                    <Col>
                        <p>Oggi</p>
                        <p>Percepiti: {results.current.apparent_temperature}&deg;C</p>
                        <p>Vento: {results.current.wind_speed_10m} km/h</p>
                        <p>Umidità: {results.current.relative_humidity_2m}%</p>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default DetailsDay;
