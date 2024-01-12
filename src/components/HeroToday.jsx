import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const HeroToday = (props) => {

    return (
        <>
            <Card className="w-50 m-auto text-center border-0 mb-3">
                <Card.Body>
                    <Card.Title>{props.today.tempPerc}</Card.Title>
                    {props.today.codeTemp === 0 && <p>Cielo sereno</p>}
                    {[1, 2, 3].includes(props.today.codeTemp) && <p>Nuvoloso</p>}
                    {[45, 48].includes(props.today.codeTemp) && <p>Nebbia</p>}
                    {[51, 53, 55].includes(props.today.codeTemp) && <p>Leggermente nuvoloso</p>}
                    {[61, 63, 65, 66, 67, 80, 81, 82].includes(props.today.codeTemp) && <p>Pioggia</p>}
                    {[71, 73, 75, 85, 86].includes(props.today.codeTemp) && <p>Neve</p>}
                    {[95, 96, 99].includes(props.today.codeTemp) && <p>Temporale</p>}
                    {![0, 1, 2, 3, 45, 48, 51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 71, 73, 75, 85, 86, 95, 96, 99].includes(props.today.codeTemp) && <p>Previsioni non disponibili, trasferisciti da qualche parte</p>}
                    <Card.Text>
                        <div className="d-flex justify-content-center">
                            <p>{props.today.maxtemp}&deg;C&nbsp;/&nbsp;</p>
                            <p>{props.today.mintemp}&deg;</p>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )

}

export default HeroToday 