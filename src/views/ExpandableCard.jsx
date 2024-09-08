import React, { useState } from 'react';

const ExpandableCard = ({ title, items, initialItemCount = 3 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedItems = isExpanded ? items : items.slice(0, initialItemCount);

  return (
    <div className="card">
      <h3>{title}</h3>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {items.length > initialItemCount && (
        <span 
          onClick={() => setIsExpanded(!isExpanded)}
          className="read-more-link"
        >
          {isExpanded ? 'Read less' : 'Read more...'}
        </span>
      )}
    </div>
  );
};

export default ExpandableCard;