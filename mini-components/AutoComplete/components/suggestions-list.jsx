import React, { useEffect, useState } from 'react';

const SuggestionsList = ({
  suggestions = [],
  highlight,
  datakey,
  onSuggestionClick,
}) => {

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    
    return <span>{parts.map((part, index) => {
      return part.toLowerCase() === highlight.toLowerCase() ? (
        <b key={index}>{part}</b>
      ) : part
    })}</span>
  }

  return (
    <React.Fragment>{suggestions.map((suggestions, index) => {
      const currSuggestion = datakey ? suggestions[datakey] : suggestions; 

      return (
        <li 
          key={index}
          onClick={() => onSuggestionClick(suggestions)}
          className="suggestion-item"
        >
          {getHighlightedText(currSuggestion, highlight)}
        </li>
      )
    })}</React.Fragment>
  )
}

export default SuggestionsList