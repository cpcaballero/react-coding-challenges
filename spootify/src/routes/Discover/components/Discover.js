import React, { Component } from "react";
import cx from 'classnames';
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import config from "../../../config";
import setAuth from "../../../setAuth";

let tokenObject = {
  accessToken: "",
  tokenType: "",
};

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  fetchData = async () => {
    try {
      const { tokenType, accessToken } = await setAuth();
      const fetchHeaders = {
        headers: {
          Accept: "application/json",
          Authorization: tokenType + " " + accessToken,
          "Content-Type": "application/json",
        },
      };
      const [albums, playlists, categories] = await Promise.all([
        fetch(config.api.baseUrl + "/browse/new-releases", fetchHeaders)
          .then((res) => res.json())
          .then((res) => res.albums),
        fetch(config.api.baseUrl + "/browse/featured-playlists", fetchHeaders)
          .then((res) => res.json())
          .then((res) => res.playlists),
        fetch(config.api.baseUrl + "/browse/categories", fetchHeaders)
          .then((res) => res.json())
          .then((res) => res.categories),
      ]);
      this.setState({
        categories: categories.items,
        playlists: playlists.items,
        newReleases: albums.items,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount = () => {
    this.fetchData()
  };

  render() {
    const { newReleases, playlists, categories } = this.state;
    return (
      <div className="discover">
        <DiscoverBlock 
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
