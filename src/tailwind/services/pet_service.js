export { requestPets, requestBreedList };

async function requestPets(animal = '', location = '', breed = '') {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );
  const json = await res.json();
  return json.pets;
}

async function requestBreedList(animal = '') {
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  const json = await res.json();
  return json.breeds;
}
