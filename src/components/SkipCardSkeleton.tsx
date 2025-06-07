export const SkipCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-lg animate-pulse">
    {/* Image skeleton */}
    <div className="relative">
      <div className="w-full h-56 bg-gray-200" />
      <div className="absolute top-4 right-4 w-24 h-8 bg-gray-200 rounded-full" />
    </div>

    <div className="p-8">
      {/* Title skeleton */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-8 w-40 bg-gray-200 rounded-lg" />
      </div>

      <div className="space-y-4 mb-6">
        {/* Hire period skeleton */}
        <div className="flex items-center bg-gray-100 p-3 rounded-lg">
          <div className="w-6 h-6 bg-gray-200 rounded mr-3" />
          <div className="h-6 w-48 bg-gray-200 rounded" />
        </div>

        {/* Features skeleton */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <div className="w-5 h-5 bg-gray-200 rounded mr-2" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <div className="w-5 h-5 bg-gray-200 rounded mr-2" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Pricing skeleton */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <div className="h-6 w-16 bg-gray-200 rounded" />
              <div className="h-6 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="w-full h-12 bg-gray-200 rounded-xl" />
    </div>
  </div>
);
