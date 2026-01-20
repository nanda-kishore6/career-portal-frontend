import { useEffect, useState } from "react";
import {
  fetchMyApplications,
  updateApplicationStatus,
  type Application,
} from "../api/applications";
import { APPLICATION_STATUSES } from "../constants/applicationStatus";


const STATUS_OPTIONS = [
  "APPLIED",
  "UNDER_REVIEW",
  "SELECTED",
  "REJECTED",
];


function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] =
    useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    async function load() {
      const data = await fetchMyApplications();
      setApplications(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleUpdate = async () => {
    if (!selectedApp || !newStatus) return;

    await updateApplicationStatus(selectedApp.id, newStatus);

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? { ...app, status: newStatus }
          : app
      )
    );

    setSelectedApp(null);
    setNewStatus("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading applications...
      </div>
    );
  }
  {APPLICATION_STATUSES.map((status) => (
  <option key={status} value={status}>
    {status.replace("_", " ")}
  </option>
))}


  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded shadow"
            >
              <h2 className="font-semibold">{app.title}</h2>
              <p className="text-sm text-gray-600">
                {app.organization}
              </p>

              <p className="text-sm mt-1">
                Applied on:{" "}
                {new Date(app.applied_at).toLocaleDateString()}
              </p>

              <span className="inline-block mt-2 px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                {app.status.replace("_", " ")}
              </span>

              <div className="mt-3">
                <button
                  onClick={() => {
                    setSelectedApp(app);
                    setNewStatus(app.status);
                  }}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h3 className="font-semibold mb-3">
              Update Status
            </h3>

            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border p-2 mb-4"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replace("_", " ")}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyApplications;
