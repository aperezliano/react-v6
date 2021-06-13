import { Component, lazy } from 'react';
import { withRouter } from 'react-router-dom';

import Carousel from '../components/Carousel';

import ErrorBoundary from '../components/ErrorBoundary';
import ThemeContext from '../components/ThemeContext';

// Lazy loading the Modal to showcase how easy it is to lazy load inside any component
// As Suspense is at top level, we don't need to reuse Suspense again
const Modal = lazy(() => import('../components/Modal'));

// Using a class component to ilustrate how they work
class Details extends Component {
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = 'http://bit.ly/pet-adopt');

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

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsWithRouter {...props} />
    </ErrorBoundary>
  );
}
