import { Component, ErrorInfo, ReactNode } from 'react';
import { Link, Redirect } from 'react-router-dom';

interface StateType {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError(): StateType {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Caught error', error, info);
  }

  componentDidUpdate(): void {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render(): ReactNode {
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
