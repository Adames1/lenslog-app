function NotImages() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m4 0V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8m0 0a2 2 0 002 2h12a2 2 0 002-2z"
        />
      </svg>
      <p className="text-lg font-medium">No hay imágenes subidas aún</p>
      <p className="text-sm mt-1">¡Sube tu primera imagen para empezar!</p>
    </div>
  );
}

export default NotImages;
