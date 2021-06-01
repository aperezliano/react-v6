import { useState } from 'react';

const SearchParams = () => {
  const [location, setLocation] = useState('Start Value');

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={location}
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
