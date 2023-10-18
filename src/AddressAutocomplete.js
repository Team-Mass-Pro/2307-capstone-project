import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AddressAutocomplete = ({ address, setAddress }) => {
  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
  };

  return (
    <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input {...getInputProps({ placeholder: 'Enter your shipping address' })} />
          <div>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';

              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                  key={suggestion.placeId} // Using a unique identifier from the suggestion
                >
                  {suggestion.description}
                </div>
              );
            })}


          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;
