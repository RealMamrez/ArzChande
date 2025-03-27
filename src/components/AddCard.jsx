const AddCard = () => {
  return (
    <div className="bg-[#1c1c1c] p-6 rounded-2xl w-full max-w-[320px] min-h-[240px] flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#242424]">
      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-3">Add Arz</h3>
      <p className="text-gray-400 text-base text-center mb-6 px-4">
        You can add your desired cryptocurrency or currency to your dashboard.
      </p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium transition-colors duration-300">
        ADD
      </button>
    </div>
  );
};

export default AddCard; 