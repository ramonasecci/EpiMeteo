import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchCity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate("/DettaglioMeteo/" + searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Row className="mb-3 mx-5">
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ricerca località"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SearchCity;
