import DashboardLayout from "../../components/layout/DashboardLayout";
import AppTopbar from "../../components/layout/AppTopbar";
import ApprovalCard from "../../components/dashboard/ApprovalCard";

const QueueOverviewPage = () => {
  const dummyData = [
    {
      id: 1,
      employeeName: "Alex",
      designation: "Developer",
      reason: "Late due to traffic"
    }
  ];

  return (
    <DashboardLayout topbar={<AppTopbar employeeName="Manager" />}>

      <h2 className="text-2xl font-bold mb-6">Queue Overview</h2>

      <div className="grid grid-cols-3 gap-6">
        {dummyData.map((d) => (
          <ApprovalCard
            key={d.id}
            data={d}
            onApprove={() => alert("Approved")}
            onReject={() => alert("Rejected")}
          />
        ))}
      </div>

    </DashboardLayout>
  );
};

export default QueueOverviewPage;