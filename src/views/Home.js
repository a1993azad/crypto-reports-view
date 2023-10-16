import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HourlyPrice from "../components/HourlyPrice";
import HourlyMarketVolume from "../components/HourlyMarketVolume";
import PriceDetails from "../components/PriceDetails";
import { cryptocurrencySymbols, currencySymbols } from "../constants/symbols";

function Home() {
  return (
    <Container>
      <Row className="py-2">
        <Col xs={12} sm={12} md={9} lg={8} className="my-2 order-2 order-md-1">
          <HourlyPrice
            cryptocurrencySymbol={cryptocurrencySymbols.BTC}
            currencySymbol={currencySymbols.USD}
          />
        </Col>
        <Col xs={12} sm={12} md={3} lg={4} className="my-2 order-1 order-md-2">
          <HourlyMarketVolume
            cryptocurrencySymbol={cryptocurrencySymbols.BTC}
          />
        </Col>
        <Col xs={12} className="my-2 order-3">
          <PriceDetails />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
