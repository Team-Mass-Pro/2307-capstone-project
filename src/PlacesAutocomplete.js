import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AddressAutocomplete = ({ address, setAddress }) => {
  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  const renderSuggestions = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
    <div>
      {/* <input {...getInputProps({ placeholder: 'Enter your address' })} /> */}
      <div>
        {suggestions.map((suggestion) => {
          const style = {
            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
          };
          return (
            <div key={suggestion.id} {...getSuggestionItemProps(suggestion, { style })}>
              {suggestion.description}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {renderSuggestions}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;