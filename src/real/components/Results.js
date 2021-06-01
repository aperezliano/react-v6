import Pet from './Pet';

const Results = ({ pets }) => (
  <div className="search">
    {!pets.length ? (
      <h2>Not Pets Found</h2>
    ) : (
      pets.map(({ name, animal, breed, id, images, city, state }) => (
        <Pet
          key={id}
          id={id}
          name={name}
          animal={animal}
          breed={breed}
          images={images}
          location={`${city}, ${state}`}
        />
      ))
    )}
  </div>
);

export default Results;
