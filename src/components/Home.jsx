import { Col, Row } from "react-bootstrap";
import DettagliSettimana from "./DettagliSettimana";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = (city) => {
        navigate("/DettaglioMeteo/" + city);
    };

    return (
        <div>
            <Row className="justify-content-center">
                <Col xs={4} className="my-card-custom m-3 d-flex justify-content-around my-animation-card" onClick={() => handleClick("Roma")}>
                    <h2 className=" text-white">Roma</h2>
                    <DettagliSettimana latitudine="41.89193" longitudine="12.51133" dayShow={1} />
                </Col>
                <Col xs={4} className="my-card-custom m-3 d-flex justify-content-around my-animation-card" onClick={() => handleClick("NewYork")}>
                    <h2 className="text-white">New York</h2>
                    <DettagliSettimana latitudine="56.25" longitudine="-5.28333" dayShow={1} />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={4} className="my-card-custom m-3 d-flex justify-content-around my-animation-card" onClick={() => handleClick("Tokyo")}>
                    <h2 className="text-white">Tokyo</h2>
                    <DettagliSettimana latitudine="35.6895" longitudine="139.69171" dayShow={1} />
                </Col>
                <Col xs={4} className="my-card-custom m-3 d-flex justify-content-around my-animation-card" onClick={() => handleClick("Londra")}>
                    <h2 className="text-white">Londra</h2>
                    <DettagliSettimana latitudine="51.50853" longitudine="-0.12574" dayShow={1} />
                </Col>
            </Row>
        </div>
    );
}

export default Home;
