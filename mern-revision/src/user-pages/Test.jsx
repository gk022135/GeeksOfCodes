const TestModel = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
             Get All Attendance Details Date Wise
          </h2>
          <div className="flex justify-center mb-4">
          </div>
          <p className="text-sm mb-4 text-gray-600">
            Temporarly unvailable this service
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TestModel;