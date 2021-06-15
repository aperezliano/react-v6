// Custom hook to ilustrate how they work

import { useState, useEffect } from 'react';
import { requestBreedList } from '../services/pet_service';
import { Animal, BreedListApiResponse } from '../APIResponseTypes';

export { useBreedList };

const cache: {
  [index: string]: string[];
} = {};
type Status = 'unloaded' | 'loading' | 'loaded';

function useBreedList(animal: Animal): [string[], Status] {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState('unloaded' as Status);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (cache[animal]) {
      setBreedList(cache[animal]);
    } else {
      void requestBreedListFromAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal]);

  return [breedList, status];

  async function requestBreedListFromAPI() {
    setBreedList([]);
    setStatus('loading' as Status);

    const json = (await requestBreedList(animal)) as BreedListApiResponse;
    cache[animal] = json.Breeds || [];

    setBreedList(cache[animal]);
    setStatus('loaded' as Status);
  }
}
