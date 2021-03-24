import React from "react";
import Discover from "./Discover";
import config from "../config";
import axios from "axios";

export default function Routes() {
  // Here you'd return an array of routes
  const { baseUrl, authUrl, clientId, clientUrl } = config.api;
  let token = "";

  const authorize = () => {
    token = new URLSearchParams(window.location.hash.substr(1)).get(
      "access_token"
    );
    if (token == null) {
      const authUrlWithParams =
        authUrl +
        "?response_type=token" +
        "&client_id=" +
        clientId +
        "&redirect_uri=" +
        encodeURIComponent(clientUrl);
      window.location.assign(authUrlWithParams);
    }
  };

  const init = () => {
    authorize();
    return axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const getNewReleases = () => {
    return init().get("/browse/new-releases");
  };

  const getFeaturedPlaylists = () => {
    return init().get("/browse/featured-playlists");
  };

  const getCategories = () => {
    return init().get("/browse/categories");
  };

  return [getNewReleases, getFeaturedPlaylists, getCategories];
}
