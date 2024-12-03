
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-auto">
<div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>
    </div>
  );
};

export default LoadingSpinner;