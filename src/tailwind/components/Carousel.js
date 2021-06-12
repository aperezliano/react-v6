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
      <div className="flex justify-items-stretch items-center">
        <img src={images[active]} alt="animal" className="flex-2" />
        <div className="flex justify-center flex-grow flex-wrap">
          {images.map((photo, i) => (
            // This should be a button :)
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={
                i === active ? 'active rounded-full w-32' : 'rounded-full w-32'
              }
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
