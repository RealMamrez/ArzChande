const AddCard = () => {
  return (
    <div className="bg-[#1c1c1c] p-4 rounded-xl w-full max-w-[280px] min-h-[180px] flex flex-col items-center justify-center">
      <h3 className="text-xl font-medium text-white mb-2">Add Arz</h3>
      <p className="text-gray-400 text-sm text-center mb-4">
        You can add your desired cryptocurrency or currency to your dashboard.
      </p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
        ADD
      </button>
    </div>
  );
};

export default AddCard; 