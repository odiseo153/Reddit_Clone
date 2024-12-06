export function Avatar({ src, alt = "User Avatar", children, size = "8" }) {
  return (
    <div
      className={`w-${size} h-${size} rounded-full bg-gray-600 flex items-center justify-center overflow-hidden shadow-md`}
      title={alt}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
          loading="lazy" 
        />
      ) : (
        <span className="text-white font-semibold text-sm">{children || "?"}</span>
      )}
    </div>
  );
}
