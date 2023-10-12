
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
            {/* ... */}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressAutocomplete;
