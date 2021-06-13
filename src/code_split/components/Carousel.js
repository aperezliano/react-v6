import { Component } from 'react';

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };

  // Lexically scoping of this with arrow functions :)
  handleOnClick = (event) => {
    this.setState({
      active: parseInt(event.target.dataset.index),
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, i) => (
            // This should be a button :)
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={i === active ? 'active' : ''}
              alt="active thumbnail"
              data-index={i}
              onClick={this.handleOnClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
