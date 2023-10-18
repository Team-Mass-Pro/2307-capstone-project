import React, { useEffect, useState } from 'react';

const OrdersMap = ({ orders }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initialCenter = { lat: 0, lng: 0 };
    const mapOptions = {
      center: initialCenter,
      zoom: 6,
    };

    // Create the map with the initial center
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    setMap(map); // Store the map instance for later use

    const bounds = new window.google.maps.LatLngBounds(); // Create bounds object to fit all markers

    orders.forEach((order) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: order.address }, (results, status) => {
        if (status === 'OK' && results[0].geometry.location) {
          const location = results[0].geometry.location;
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: `Order by ${order.username}`,
          });

          // Extend the bounds to include the marker's position
          bounds.extend(location);

          // Create an info window for this marker
          const markerInfoWindow = new window.google.maps.InfoWindow({
            content: order.address, // Display the address in the info window
          });

          // Add a click event listener to the marker
          marker.addListener('click', () => {
            if (infoWindow) {
              infoWindow.close();
            }

            // Open the info window for the selected marker
            markerInfoWindow.open(map, marker);
            setSelectedMarker(marker);
            setInfoWindow(markerInfoWindow);
          });

          // Adjust the map's center and zoom to fit all markers
          if (orders.length > 0) {
            map.fitBounds(bounds);
          }
        }
      });
    });
  }, [orders]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default OrdersMap;