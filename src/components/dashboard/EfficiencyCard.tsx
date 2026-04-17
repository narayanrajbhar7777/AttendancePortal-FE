type Props = {
  averageHours: string;
};

const EfficiencyCard = ({ averageHours }: Props) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
        Efficiency Meta
      </p>
      <h3 className="text-2xl font-bold mt-2">
        {averageHours} <span className="text-sm font-medium">hrs/day</span>
      </h3>
    </div>
  );
};

export default EfficiencyCard;