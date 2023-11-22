
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="max-w-md p-6 ">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600 mb-4">Oops! Something went wrong.</p>
        <p className="text-gray-600 mb-4">Please try again later.</p>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
