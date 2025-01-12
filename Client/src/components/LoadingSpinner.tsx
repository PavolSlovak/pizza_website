function LoadingSpinner() {
  return (
    <div className="flex flex-col p-5 items-center justify-center w-full h-screen bg-white">
      <div className="flex flex-col items-center  ">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        <div className="text-2xl font-bold text-gray-900 mt-5">Loading...</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
