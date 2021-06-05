import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ErrorBoundary from '../components/ErrorBoundary';

// Using a class component to ilustrate how they work
class Details extends Component {
  state = { loading: true };

  async componentDidMount() {
    // match.params.id matches the id from the path
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();

    this.setState({
      loading: false,
      ...json.pets[0],
    });
  }

  render() {
    const { animal, breed, city, state, description, name, loading, images } =
      this.state;
    if (loading) return <div>Loading...</div>;
    if (!animal) throw new Error('No animal retrieved');
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
