import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Caught error', error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h2>
          Error Happended <Link to="/">Click here</Link> to go to the Home Page
          (or wait 5s)
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
