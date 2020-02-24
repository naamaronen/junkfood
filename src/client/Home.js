import React from "react";
import AppNavBar from "./components/AppNavBar";
import SearchNavBar from "./components/SearchNavBar";
import RestList from "./components/RestList";
import RestaurantModal from "./components/RestaurantModal";
import { Container } from "reactstrap";

const Home = () => (
  <div className="App" style={{"background-color":"yellow"}}>
    <AppNavBar />
    <SearchNavBar />
    <Container>
      <div className="addRestaurant">
        <RestaurantModal />
      </div>
      <RestList />
    </Container>
  </div>
);

export default Home;
