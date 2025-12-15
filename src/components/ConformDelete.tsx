interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDelete({ onConfirm, onCancel }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-gray-700">
        Are you sure you want to delete this task?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
