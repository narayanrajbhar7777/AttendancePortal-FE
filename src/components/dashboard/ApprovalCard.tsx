type Props = {
  data: any;
  onApprove: () => void;
  onReject: () => void;
};

const ApprovalCard = ({ data, onApprove, onReject }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="font-bold">{data.employeeName}</h3>
      <p className="text-sm text-gray-500">{data.designation}</p>

      <p className="mt-2 text-sm">{data.reason}</p>

      <div className="flex gap-2 mt-4">
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

export default ApprovalCard;