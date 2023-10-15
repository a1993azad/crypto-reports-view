import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HourlyPrice from "../components/HourlyPrice";
import HourlyMarketVolume from "../components/HourlyMarketVolume";
import PriceDetails from "../components/PriceDetails";
import { cryptocurrencySymbols, currencySymbols } from "../constants/symbols";

function Home() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={8} lg={10}>
          <HourlyPrice
            cryptocurrencySymbol={cryptocurrencySymbols.BTC}
            currencySymbol={currencySymbols.USD}
          />
        </Col>
        <Col xs={12} md={4} lg={2}>
          <HourlyMarketVolume cryptocurrencySymbol={cryptocurrencySymbols.BTC} />
        </Col>
        <Col xs={12}>
          <PriceDetails />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
