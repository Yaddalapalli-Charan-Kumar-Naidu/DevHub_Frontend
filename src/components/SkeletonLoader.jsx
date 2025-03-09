import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      {/* Skeleton for profile image */}
      <div className="w-24 h-24 rounded-full mx-auto bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

      {/* Skeleton for name */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-3/4 mx-auto animate-pulse"></div>

      {/* Skeleton for gender and age */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-1/2 mx-auto animate-pulse"></div>

      {/* Skeleton for about section */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-full mx-auto animate-pulse"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-3/4 mx-auto animate-pulse"></div>

      {/* Skeleton for skills */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16 animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;