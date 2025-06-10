export const EmailSkeleton = ({ count }: { count: number }) => {
  return (
    <div className="divide-y divide-gray-200">
      {Array.from({ length: count }).map((_, index) => (
        <div className="p-4 animate-pulse" key={index}>
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
