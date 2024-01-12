import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

const DettaglioGiorno = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&hourly=temperature_2m&daily=apparent_temperature_max,sunrise,sunset,daylight_duration,wind_speed_10m_max,wind_gusts_10m_max,et0_fao_evapotranspiration`);
            const resultsData = response.data;
            setResults(resultsData);
            console.log(results);
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
                        <p>Data: {results.daily.time[0]}</p>
                        <p>Massima temperatura apparente: {results.daily.apparent_temperature_max[0]}</p>
                        {/* Aggiungi altri dettagli meteorologici che vuoi visualizzare */}
                    </Col>
                </Row>
            )}
        </>
    );
};

export default DettaglioGiorno;
