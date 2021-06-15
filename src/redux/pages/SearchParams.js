import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useBreedList } from '../hooks/userBreedList';
import * as petService from '../services/pet_service';

import changeAnimal from '../action_creators/change_animal';
import changeLocation from '../action_creators/change_location';
import changeBreed from '../action_creators/change_breed';
import changeTheme from '../action_creators/change_theme';
import Results from '../components/Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const { animal, breed, location, theme } = useSelector((state) => state);
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    setLoadingPets(true);
    setPets([]);
    const pets = await petService.requestPets(animal, location, breed);
    setPets(pets);
    setLoadingPets(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    requestPets();
  }

  return (
    <div className="search-params">
      <form onSubmit={onSubmit}>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={location}
          placeholder="location"
          onChange={(e) => dispatch(changeLocation(e.target.value))}
        />
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => dispatch(changeAnimal(e.target.value))}
          onBlur={(e) => dispatch(changeAnimal(e.target.value))}
        >
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label htmlFor="breed">Breed</label>
        <select
          id="breed"
          value={breed}
          onChange={(e) => dispatch(changeBreed(e.target.value))}
          onBlur={(e) => dispatch(changeBreed(e.target.value))}
        >
          <option label="All" value="" />
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <label htmlFor="theme">Theme</label>
        <select
          value={theme}
          onChange={(e) => dispatch(changeTheme(e.target.value))}
          onBlur={(e) => dispatch(changeTheme(e.target.value))}
        >
          <option value="darkblue">Dark Blue</option>
          <option value="pink">Pink</option>
          <option value="peru">Peru</option>
          <option value="red">Red</option>
        </select>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {loadingPets ? <div>Loading...</div> : <Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
