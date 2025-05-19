import React, { useCallback, useEffect, useState } from 'react';
import "./styles.css";
import SuggestionsList from './suggestions-list';
import debounce from "lodash/debounce";

const Autocomplete = ({
  placeholder = "",
  staticData,
  fetchSuggestions, 
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) => {

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onchange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null)
    setLoading(true)
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300), []
  ) 

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSuggestioClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  }

  return (
    <div className='container'>
      <input 
        type="text" 
        style={customStyles}
        value={inputValue}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      
      {(suggestions.length > 0 || loading || error) && (
        <ul className='suggestions-list'>
        {error && <div className='error'>{error}</div>}
        {loading && <div className='loading'>{customLoading}</div>}
        <SuggestionsList
          datakey={dataKey}
          highlight={inputValue}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestioClick} 
        />
        </ul>
      )}
    </div>
  )
}

export default Autocomplete