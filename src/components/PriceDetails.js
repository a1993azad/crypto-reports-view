import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import labels from "../constants/labels";
import useCrypto from "../hooks/useCrypto";
import Legend from "./Legend";

function PriceDetails() {
  const { indexes, setIndexes, ranges } = useCrypto();

  const onChangeCheckbox = (e) => {
    const { name, checked } = e.target;

    setIndexes({ ...indexes, [name]: checked });
  };
  return (
    <Card className="rounded-4">
      <Card.Body className="px-4">
        <Container fluid>
          <Row className="py-3">
            <Col>
              <p className="h5">{labels.indexes}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div className="d-table mx-auto">
                <Legend
                  checked={indexes.higher}
                  onChange={onChangeCheckbox}
                  label={labels.higher}
                  color={"green"}
                  className="mb-4"
                  name="higher"
                />
                <Legend
                  checked={indexes.average}
                  onChange={onChangeCheckbox}
                  label={labels.average}
                  color={"yellow"}
                  className="mb-4"
                  name="average"
                />
                <Legend
                  checked={indexes.lower}
                  onChange={onChangeCheckbox}
                  label={labels.lower}
                  color={"red"}
                  className="mb-4"
                  name="lower"
                />
              </div>
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex text-center justify-content-center align-items-center flex-column"
            >
              {ranges?.max?.from && ranges?.max?.to && (
                <>
                  <p className="text-red h5 fw-bold">{labels.maximumRange}:</p>
                  <p className="text-red h5 fw-bold">
                    {labels.timeToTime(ranges.max.from, ranges.max.to)}
                  </p>
                </>
              )}
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex text-center justify-content-center align-items-center flex-column"
            >
              {ranges?.min?.from && ranges?.min?.to && (
                <>
                  <p className="text-green h5 fw-bold">
                    {labels.minimumRange}:
                  </p>
                  <p className="text-green h5 fw-bold">
                    {labels.timeToTime(ranges.min.from, ranges.min.to)}
                  </p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default PriceDetails;
