import React from "react";
import { Cards, CountryPicker, Chart } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";
import Loader from "react-loader-spinner";

class App extends React.Component {
  state = {
    data: [],
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div>
        {data.length === 0 ? (
          <div className={styles.loader}>
            <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
          </div>
        ) : (
          <div>
            <div className={styles.container}>
              <img className={styles.image} src={coronaImage} alt="covid-19" />
              <Cards data={data} />
              <CountryPicker handleCountryChange={this.handleCountryChange} />
              <Chart data={data} country={country} />
            </div>
            <footer className={styles.footer}>
              Covid-19 World Tracker 2020
            </footer>
          </div>
        )}
      </div>
    );
  }
}

export default App;
