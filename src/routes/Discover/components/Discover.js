import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import Routes from "../../index";
import "../styles/_discover.scss";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      error: false,
    };
  }

  componentDidMount() {
    Promise.all(Routes().map((fx) => fx()))
      .then((responses) => {
        return responses.map((res) => res.data);
      })
      .then((data) => {
        return Object.assign(...data);
      })
      .then((map) => {
        this.setState({
          newReleases: map.albums.items,
          playlists: map.playlists.items,
          categories: map.categories.items,
        });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  render() {
    const { newReleases, playlists, categories, error } = this.state;

    return error ? (
      <h1>Error retrieving data</h1>
    ) : (
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
