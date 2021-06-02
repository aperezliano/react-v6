import { useState, useEffect } from 'react';
import { useBreedList } from '../hooks/userBreedList';
import * as petService from '../services/pet_service';
import Results from './Results';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState(ANIMALS[0]);
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [breeds] = useBreedList(animal);

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
          <option label="All" value="" />
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      {loadingPets ? <div>Loading...</div> : <Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
