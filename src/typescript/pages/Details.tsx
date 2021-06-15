import { Component, FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Carousel from '../components/Carousel';
import Modal from '../components/Modal';
import { PetAPIResponse, Animal } from '../APIResponseTypes';

import ErrorBoundary from '../components/ErrorBoundary';
import ThemeContext from '../components/ThemeContext';

// Using a class component to ilustrate how they work
class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    showModal: false,
    animal: '' as Animal,
    breed: '',
    name: '',
    city: '',
    state: '',
    description: '',
    images: [] as string[],
  };

  async componentDidMount() {
    // match.params.id matches the id from the path
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = (await res.json()) as PetAPIResponse;

    this.setState({
      loading: false,
      ...json.pets[0],
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location.href = 'http://bit.ly/pet-adopt');

  render() {
    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      loading,
      images,
      showModal,
    } = this.state;
    if (loading) return <div>Loading...</div>;
    if (!animal) throw new Error('No animal retrieved');
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          {/* Context looks weirder in Class components */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <div>
                    <h2>Would you like to adopt {name}?</h2>
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </ThemeContext.Consumer>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

const DetailsErrorBoundary: FunctionComponent =
  function DetailsWithErrorBoundary() {
    return (
      <ErrorBoundary>
        <DetailsWithRouter />
      </ErrorBoundary>
    );
  };

export default DetailsErrorBoundary;
