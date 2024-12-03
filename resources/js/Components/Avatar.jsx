export function Avatar({ src, alt, children }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-semibold">{children}</span>
      )}
    </div>
  );
}
