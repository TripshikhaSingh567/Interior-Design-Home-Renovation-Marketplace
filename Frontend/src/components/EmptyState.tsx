type EmptyStateProps = {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
};

function EmptyState({
  title,
  message,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="state-card empty-state">

      <div className="state-icon">
        —
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {actionText && onAction && (
        <button
          className="primary-btn"
          onClick={onAction}
        >
          {actionText} →
        </button>
      )}

    </div>
  );
}

export default EmptyState;