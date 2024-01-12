import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

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

    const getDayOfWeek = (date) => {
        const daysOfWeek = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    const formatDate = (date) => {
        const options = { month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("it-IT", options);
    };

    return (
        <>
            <Row className="text-center">
                {results?.daily?.weather_code?.map((codtempo, i) => (
                    <Col>
                        <div key={i}>
                            <p>{getDayOfWeek(results.daily.time[i])}</p>
                            <p>{formatDate(results.daily.time[i])}</p>
                            {codtempo === 0 && <p>Cielo sereno</p>}
                            {[1, 2, 3].includes(codtempo) && <p>Nuvoloso</p>}
                            {[45, 48].includes(codtempo) && <p>Nebbia</p>}
                            {[51, 53, 55].includes(codtempo) && <p>Leggermente nuvoloso</p>}
                            {[61, 63, 65, 66, 67, 80, 81, 82].includes(codtempo) && <p>Pioggia</p>}
                            {[71, 73, 75, 85, 86].includes(codtempo) && <p>Neve</p>}
                            {[95, 96, 99].includes(codtempo) && <p>Temporale</p>}
                            {![0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 71, 73, 75, 85, 86, 95, 96, 99].includes(codtempo) && <p>Previsioni non disponibili, trasferisciti da qualche parte</p>}
                            <div className="d-flex justify-content-center">
                                <p>{results.daily.temperature_2m_min[i]}&deg;C&nbsp;/&nbsp;</p>
                                <p>{results.daily.temperature_2m_max[i]}&deg;</p>
                            </div>
                        </div>
                    </Col>
                ))}
                {isLoading && <p>Caricamento...</p>}
                {error && <p>Errore: {error}</p>}
            </Row>
        </>
    );
};

export default DettagliSettimana;

