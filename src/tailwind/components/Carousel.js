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
      <div className="flex content-around items-center">
        <img
          src={images[active]}
          alt="animal"
          className="w-2/6 m-10 rounded-md"
        />
        <div className="">
          {images.map((photo, i) => (
            // This should be a button :)
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={`rounded-full w-32 m-2 border-black border-2 ${
                i === active ? 'active' : ''
              }`}
              style={{ display: 'inline-block' }}
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
