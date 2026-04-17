type Props = {
  shortfall: string;
};

const ShortfallAlertCard = ({ shortfall }: Props) => {
  if (shortfall === "0:00") return null;

  return (
    <div className="bg-red-100 border border-red-200 rounded-xl p-6">
      <h4 className="text-sm font-bold text-red-800">Shortfall Alert</h4>
      <p className="text-sm text-red-700 mt-2">
        You are currently <strong>{shortfall} hours</strong> below the 9-hour daily requirement.
      </p>
      <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
        Request Regularization
      </button>
    </div>
  );
};

export default ShortfallAlertCard;