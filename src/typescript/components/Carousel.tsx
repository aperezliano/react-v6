import { Component, MouseEvent, ReactNode } from 'react';

interface Props {
  images: string[];
}

class Carousel extends Component<Props> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };

  // Lexically scoping of this with arrow functions :)
  handleOnClick = (event: MouseEvent<HTMLElement>): void => {
    if (!(event.target instanceof HTMLElement)) return;
    this.setState({
      active: parseInt(event.target.dataset.index),
    });
  };

  render(): ReactNode {
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
