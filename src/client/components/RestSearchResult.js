import React, { Component } from "react";
import {
  Container,
  Button,
  Col,
  Card,
  CardText,
  CardBody,
  CardDeck
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import SearchNavBar from "./SearchNavBar";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import {calcDistance} from "../helpFunctions";



class RestSearchResult extends Component {
  state = {
    restaurants:[],
    closerBetterScale: "100"
  };

  calcCloserBetterGrade = (distance, rate, minDist, maxDist) =>{
    if (this.state.closerBetterScale>-1) {
      let perc = this.state.closerBetterScale/100;
      let normalized_distance = (1 - (distance-minDist)/(maxDist-minDist)) * 100;

      let normalized_rate = rate * 20;
      return normalized_distance * perc + normalized_rate * (1 - perc);
    }
  };


  componentDidMount() {
    this.setState({ closerBetterScale: this.props.location.state.range });
  }

  sortByCloserBetter(rests) {
    // calculate all distances, then all closer-better grades
    let minDist = 99999999, maxDist = 0;
    rests.map((rest) => {
      rest.distance = calcDistance(rest.geolocation, this.props.userLocation);
      if (rest.distance < minDist) minDist = rest.distance;
      if (rest.distance > maxDist) maxDist = rest.distance;
    })
    rests.map((rest) => {
      rest.cbGrade = this.calcCloserBetterGrade(rest.distance, rest.averageRate, minDist, maxDist)
    })

    return rests.sort((restA, restB) => { return restB.cbGrade - restA.cbGrade })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state.range !== this.props.location.state.range)
      this.setState({closerBetterScale: this.props.location.state.range});

    if (prevProps.searchResults !== this.props.searchResults) {
      let rests = this.props.searchResults;
      if (rests) {
        if (this.props.userLocation) {
          rests = this.sortByCloserBetter(rests);
        }
      this.setState({restaurants: rests});
      }
    }
  }


  render() {
    // sort by closer-better grades (cbGrade)
    const searchResult = this.state.restaurants;
    return (
      <div className="App" style={{"background-color":"#FFFFCC"}}>
        <AppNavBar />
        <SearchNavBar />
        <div>
          <Container>
            <CardDeck className="restaurnt-list">
              {searchResult.length === 0 ? (
                <div>
                  <h3>Restaurants Not Found </h3>
                </div>
              ) : (
                searchResult.map(({ _id, name, location, stringDate, averageRate }) => (
                  <Col sm="3" key={_id}>
                    <Card
                      key={_id}
                      outline
                      color="danger"
                      className="text-center"
                    >
                      <CardBody>
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {location}
                        </h6>
                        <CardText>
                          {"Average Rate: "+Math.round(averageRate*100)/100}
                        </CardText>
                        <CardText>
                          <small className="text-muted">{stringDate}</small>
                        </CardText>
                        <Button color="primary" style={{ marginBottom: "2rem" }}>
                          <Link style={{ color: "#fff" }} to={`/${name}`}>
                            Watch Reviews
                          </Link>
                        </Button>
                        <ReviewModal rest_name={name} type="Add" />
                      </CardBody>
                    </Card>
                  </Col>
                ))
              )}
            </CardDeck>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.searchResult,
    userLocation: state.user.geoLocation
  };
};

export default connect(mapStateToProps, null)(RestSearchResult);
