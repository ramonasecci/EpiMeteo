import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

import SingleHour from "./SingleHour";
import MySpinner from "./MySpinner";

const DetailsHours = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);


    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&hourly=temperature_2m,weather_code,wind_speed_10m`);
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
        <div className="mx-3 mb-3">
            <Row className="text-center text-white">
                <Col xs={3} className="border-end border-white">
                    {results?.hourly?.time?.slice(0, 0 + 6).map((hour, i) => (
                        <SingleHour ora={hour.slice(11, 13)} codtempo={results.hourly.weather_code[i]} windspeed={results.hourly.wind_speed_10m[i]} gradi={results.hourly.temperature_2m[i]} key={i} />
                    ))}
                </Col>
                <Col xs={3} className="border-end border-white">
                    {results?.hourly?.time?.slice(6, 6 + 6).map((hour, i) => (
                        <SingleHour ora={hour.slice(11, 13)} codtempo={results.hourly.weather_code[i]} windspeed={results.hourly.wind_speed_10m[i]} gradi={results.hourly.temperature_2m[i]} key={i}/>

                    ))}
                </Col>
                <Col xs={3} className="border-end border-white">
                    {results?.hourly?.time?.slice(12, 12 + 6).map((hour, i) => (
                        <SingleHour ora={hour.slice(11, 13)} codtempo={results.hourly.weather_code[i]} windspeed={results.hourly.wind_speed_10m[i]} gradi={results.hourly.temperature_2m[i]} key={i}/>

                    ))}
                </Col>
                <Col xs={3}>
                    {results?.hourly?.time?.slice(18, 18 + 6).map((hour, i) => (
                        <SingleHour ora={hour.slice(11, 13)} codtempo={results.hourly.weather_code[i]} windspeed={results.hourly.wind_speed_10m[i]} gradi={results.hourly.temperature_2m[i]} key={i}/>

                    ))}
                </Col>
                {isLoading && <MySpinner />}
                {error && <p>Errore: {error}</p>}
            </Row>
        </div>
    );
};

export default DetailsHours;