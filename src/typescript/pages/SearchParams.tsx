import { useState, useEffect, useContext, FunctionComponent } from 'react';
import { useBreedList } from '../hooks/userBreedList';
import * as petService from '../services/pet_service';
import { Animal, PetAPIResponse, Pet } from '../APIResponseTypes';

import Results from '../components/Results';
import ThemeContext from '../components/ThemeContext';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams: FunctionComponent = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState(ANIMALS[0] as Animal);
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([] as Pet[]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    void requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    setLoadingPets(true);
    setPets([]);
    const response = (await petService.requestPets(
      animal,
      location,
      breed
    )) as PetAPIResponse;
    setPets(response.pets);
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
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="animal">Animal</label>
        <select
          id="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value as Animal)}
          onBlur={(e) => setAnimal(e.target.value as Animal)}
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
          onChange={(e) => setBreed(e.target.value)}
          onBlur={(e) => setBreed(e.target.value)}
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
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
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
