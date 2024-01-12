import { Navbar, Container } from "react-bootstrap";
import SearchCity from './SearchCity'
import logo from '../logo.svg'

const MyNavbar = () => {

    return (
        <>
            <Navbar className="bg-body-light">
                <Container className="d-flex justify-content-between">
                    <Navbar.Brand href="#home" className="d-flex justify-content-between">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Meteo logo"
                        />
                        <h1>EpiMeteo</h1>
                    </Navbar.Brand>
                    <SearchCity />
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar