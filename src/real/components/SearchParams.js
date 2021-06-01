import { useState, useEffect } from 'react';
import * as petService from '../services/pet_service';
import Pet from './Pet';

const ANIMALS = ['bird', 'cat', 'dog', 'pig', 'blah'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const breeds = [];

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const pets = await petService.requestPets();
    setPets(pets);
  }

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
        <label htmlFor="animal">Animal</label>
        <select
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
        <label htmlFor="breed">Breed</label>
        <select
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          onBlur={(e) => setBreed(e.target.value)}
        >
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      {pets.map(({ name, animal, breed, id }) => (
        <Pet name={name} animal={animal} breed={breed} key={id} />
      ))}
    </div>
  );
};

export default SearchParams;
