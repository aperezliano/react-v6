import { useState, useEffect, useContext } from 'react';
import { useBreedList } from '../hooks/userBreedList';
import * as petService from '../services/pet_service';

import Results from '../components/Results';
import ThemeContext from '../components/ThemeContext';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState(ANIMALS[0]);
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

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
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg
          flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={onSubmit}
      >
        <label className="search-label" htmlFor="location">
          Location
        </label>
        <input
          className="search-control"
          id="location"
          value={location}
          placeholder="location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <label className="search-label" htmlFor="animal">
          Animal
        </label>
        <select
          className="search-control"
          id="animal"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          onBlur={(e) => setAnimal(e.target.value)}
        >
          {ANIMALS.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <label className="search-label" htmlFor="breed">
          Breed
        </label>
        <select
          className="search-control disabled:opacity-50"
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
        <label className="search-label" htmlFor="theme">
          Theme
        </label>
        <select
          className="search-control"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onBlur={(e) => setTheme(e.target.value)}
        >
          <option value="darkblue">Dark Blue</option>
          <option value="pink">Pink</option>
          <option value="peru">Peru</option>
          <option value="red">Red</option>
        </select>
        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      {loadingPets ? <div>Loading...</div> : <Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
