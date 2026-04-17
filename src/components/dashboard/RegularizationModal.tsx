import { useState } from "react";
import type { RegularizationRequest, RegularizationResponse } from "../../types/attendance";
import { createRegularization } from "../../api/employeeApi";
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    employeeId: number;
    userId: number;
    date: string;
    onSuccess: () => void;
    regularizationResponse: RegularizationResponse;
};

const RegularizationModal = ({ isOpen, onClose, employeeId, userId, date, onSuccess }: Props) => {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!reason) {
            toast.success("Please enter reason");
            return;
        }
        setLoading(true);
        const request: RegularizationRequest = {
            employeeId: employeeId,
            userId: userId,
            type: "Misspunching",
            status: "Pending",
            regularizationDate: date,
            reason,
        };

        try {
            const data = await createRegularization(request);
             toast.success("Regularization Request Submitted Successfully!");
            setReason("");
            onClose();
            onSuccess();
        } catch (err) {
            toast.success("Error submitting request:" + err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px]">

                <h2 className="text-lg font-bold mb-4">Apply Regularization</h2>

                <div className="mb-3">
                    <label className="text-sm">Employee ID</label>
                    <input value={employeeId} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="text-sm">Date</label>
                    <input value={date} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="text-sm">Reason</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose} className="px-3 py-1 border rounded">
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegularizationModal;