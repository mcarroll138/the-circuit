import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const AutoFill = () => {
  const [address, setAddress] = useState("");

  const handleChange = (value) => {
    setAddress(value);
  };

  const handleSelect = (value) => {
    setAddress(value);
  };

  return (
    <div>
      <GooglePlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeHolder: "Enter Address",
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "red", cursor: "pointer" }
                  : { backgroundColor: "white", cursor: "pointer" };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </GooglePlacesAutocomplete>
    </div>
  );
};
export default AutoFill;
