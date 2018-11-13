import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import MenuComponent from './MenuComponent';
import ErrorBoundary from './ErrorBoundary';
import SearchPage from './SearchPage';
import escapeRegExp from 'escape-string-regexp';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      markers: [],
      showVenues: [],
      query: '',
      notVisibleMarkers: []
  }}

  componentDidMount() {
    this.getVenues()
  }



  /*
  * renderMap:
  * - load script
  * - initializes the map
  */

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyANIROoZ1fyuVwJJZqvJewchXrEye-r0HU&callback=initMap")
    window.initMap = this.initMap;
  }


  /*
  * endPoint & parameters:
  * https://developer.foursquare.com/docs/api/venues/explore
  */

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "J2E305JWASGSYFP5FY2C5C2DKBHYTAXGR1514K3S0HLLOSIP",
      client_secret: "PDDTROAZZLCBIH5USIWZSDQDSPY2N0B454HZ3H2FNZVIGANM",
      query: "museums",
      ll: "51.507351,-0.127758",
      v: "20201215",
      limit: 50
    }


    // FETCH API - axios

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
        showVenues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      alert(`Sorry, fetching data from Foursquare was not possible!`)
      console.log("Foursquare error! " + error)
    })
  }


  initMap = () => {

    /*
    * Create map.
    * Center coordinates point to city, London - England.
    */
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.507351, lng: -0.127758},
      zoom: 14
    })

    // Create an InfoWindow
    const infowindow = new window.google.maps.InfoWindow({
      maxWidth: 180
    })

    this.infowindow = infowindow

    // eslint-disable-next-line
    this.state.venues.map(myVenue => {

      /*
      * Reference: https://developers.google.com/maps/documentation/javascript/infowindows
      * Content of the InfoWindow
      */
      const contentString = `<b>${myVenue.venue.name}</b> <br><i>${myVenue.venue.location.address}</i>`
  

      // Create a marker

      const marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
        })

        this.state.markers.push(marker)



      // Set Animation with Marker Bounce.


      function animationEffect() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null) }, 550)
      }

      function openMarker() {
        // Setting the content of the InfoWindow
        infowindow.setContent(contentString)
        animationEffect()

      // Open an InfoWindow upon clicking on its marker
        infowindow.open(map, marker)
      }


      // Click on a marker
      marker.addListener('click', function() {
        openMarker()
        })
    }
  )
  }

  // Handling the update query

  updateQuery = query => {
    this.setState({ query })
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let notVisibleMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        match.test(myVenue.venue.name)
      )
      this.setState({ venues: filterVenues })
      notVisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
      )


      // Hiding the markers for venues not included in the filtered venues

      notVisibleMarkers.forEach(marker => marker.setVisible(false))

      this.setState({ notVisibleMarkers })
    } else {
      this.setState({ venues: this.state.showVenues })
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }


  render() {
    if (this.state.hasError) {
      return <div id="Error-message" aria-label="Error message">Sorry, something went wrong!</div>
    } else {
      return (
      <main>
        <ErrorBoundary>

        <div id="SearchBar" aria-label="Search Bar">
          <SearchPage
            venues={ this.state.showVenues }
            markers={ this.state.markers }
            filteredVenues={ this.filteredVenues }
  	      	query={this.state.query}
            clearQuery={this.clearQuery}
	        	updateQuery={b => this.updateQuery(b)}
	        	clickLocation={this.clickLocation}
          />
        </div>

        <div id="container" aria-label="Menu Container">
          <MenuComponent
            venues={ this.state.venues }
            markers={ this.state.markers }
          />
        </div>

        <div id="map" aria-label="Map" role="application">
        </div>

        </ErrorBoundary>
      </main>
    );
  }
  }
}


// LoadScript

function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  script.onerror = function() {
    alert("Error loading map! Check the URL!");
  };
}


export default App;
