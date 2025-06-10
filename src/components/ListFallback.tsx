export const ListFallback = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="text-center">
      <div className="text-6xl mb-4">📭</div>
      <p className="text-gray-900 font-medium">No emails found</p>
      <p className="text-gray-500 text-sm mt-1">Your inbox is empty</p>
      <button
        onClick={refetch}
        className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
      >
        Refresh
      </button>
    </div>
  );
};
