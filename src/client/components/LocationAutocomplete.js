import PlacesAutocomplete from "react-places-autocomplete";
import React, {Component} from "react";

class LocationAutocomplete extends Component {
    render() {
        return (
            <PlacesAutocomplete onChange={this.props.onChange} value={this.props.value}>
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Address',
                                className: 'location-search-input',
                            })}
                        />
                        <div className={"autocomplete"+this.props.class}>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {className})}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}</div>
                    </div>
                )}
            </PlacesAutocomplete>
        )
    };
}

export default LocationAutocomplete;