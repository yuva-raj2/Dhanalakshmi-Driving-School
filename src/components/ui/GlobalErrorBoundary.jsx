import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production: send to Sentry / logging service
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'var(--color-bg-primary)' }}
        role="alert"
        aria-live="assertive"
      >
        <div className="glass-card p-8 max-w-lg w-full text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-red-900/30 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle size={32} className="text-red-400" aria-hidden="true" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            An unexpected error occurred. Our team has been notified. You can try
            refreshing the page or going back to the home screen.
          </p>

          {/* Error detail in dev */}
          {import.meta.env.DEV && this.state.error && (
            <details className="mb-6 text-left">
              <summary className="text-xs text-slate-500 cursor-pointer mb-2 hover:text-slate-400">
                Technical details (dev only)
              </summary>
              <pre className="text-2xs text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg p-3 overflow-auto max-h-40 scrollbar-thin">
                {this.state.error?.toString()}
                {'\n\n'}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={this.handleReset}
              className="btn btn-secondary"
              type="button"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
            <button
              onClick={this.handleGoHome}
              className="btn btn-primary"
              type="button"
            >
              <Home size={16} aria-hidden="true" />
              Go home
            </button>
          </div>
        </div>
      </div>
    );
  }
}