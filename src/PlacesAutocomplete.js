import React from 'react';


const AddressAutocomplete = ({ address, setAddress }) => {
  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const renderSuggestions = ({ getInputProps, suggestions, getSuggestionItemProps }) => {
      {suggestions.map((suggestion) => {
  const style = {
    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
      }
  return ( <div key={`${suggestion.id}-${suggestion.description}`} {...getSuggestionItemProps(suggestion, { style })}>
      {suggestion.description}
    </div>
  );
})}

};

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {renderSuggestions}
    </PlacesAutocomplete>
  );
};

export default PlacesAutocomplete;