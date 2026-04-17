const RequestCard = ({ data, onApprove, onReject }: any) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="font-bold">{data.employeeName}</h3>

      <p className="text-sm text-gray-500">
        {data.type} • {data.date}
      </p>

      <div className="bg-gray-100 p-3 rounded mt-3 text-sm">
        {data.reason}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={onApprove} className="bg-green-500 text-white px-3 py-1 rounded">
          Approve
        </button>

        <button onClick={onReject} className="bg-red-500 text-white px-3 py-1 rounded">
          Reject
        </button>
      </div>

    </div>
  );
};

export default RequestCard;