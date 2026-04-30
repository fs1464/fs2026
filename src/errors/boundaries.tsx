import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? this.props.children;
    }
    return this.props.children;
  }
}
