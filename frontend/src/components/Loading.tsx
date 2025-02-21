import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#1a1a1ac4] bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-400"></div>
    </div>
  );
};
