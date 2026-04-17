type Props = {
  type: "loading" | "error";
  message?: string;
};

const FullScreenStatus = ({ type, message }: Props) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        {type === "loading" ? (
          <>
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading dashboard...</p>
          </>
        ) : (
          <>
            <p className="text-3xl mb-3">⚠️</p>
            <p className="text-lg font-semibold">{message || "Something went wrong"}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-semibold"
            >
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FullScreenStatus;