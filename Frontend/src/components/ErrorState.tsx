type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="state-card error-state">

      <div className="state-icon">
        !
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button
          className="primary-btn"
          onClick={onRetry}
        >
          Try Again →
        </button>
      )}

    </div>
  );
}

export default ErrorState;