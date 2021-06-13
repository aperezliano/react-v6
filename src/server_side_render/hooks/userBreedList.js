// Custom hook to ilustrate how they work

import { useState, useEffect } from 'react';
import { requestBreedList } from '../services/pet_service';

export { useBreedList };

const cache = {};
const STATUSES = {
  unloaded: 'unloaded',
  loading: 'loading',
  loaded: 'loaded',
};

function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState(STATUSES.unloaded);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (cache[animal]) {
      setBreedList(cache[animal]);
    } else {
      requestBreedListFromAPI(animal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal]);

  return [breedList, status];

  async function requestBreedListFromAPI() {
    setBreedList([]);
    setStatus(STATUSES.loading);

    const breeds = await requestBreedList(animal);
    if (!cache[animal]) cache[animal] = breeds || [];

    setBreedList(breeds);
    setStatus(STATUSES.loaded);
  }
}
