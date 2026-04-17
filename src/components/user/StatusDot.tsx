const StatusDot = ({ status }: { status?: string }) => {
  const color =
    status === "PRESENT"
      ? "bg-green-500"
      : status === "ABSENT"
      ? "bg-red-500"
      : status === "PENDING"
      ? "bg-gray-400"
      : "bg-gray-200";

  return <div className={`w-3 h-3 rounded-full ${color}`} />;
};

export default StatusDot;