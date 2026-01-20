import { useEffect, useState } from "react";
import { fetchBookmarks, unbookmarkOpportunity } from "../api/bookmarks";
import { trackApplication } from "../api/applications";
import type { Opportunity } from "../types/opportunity";
import axios from "axios";

function MyBookmarks() {
  const [bookmarks, setBookmarks] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchBookmarks();
      setBookmarks(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleRemove = async (id: string) => {
    await unbookmarkOpportunity(id);
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleTrack = async (opportunityId: string) => {
  try {
    await trackApplication(opportunityId);

    setBookmarks((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId
          ? { ...opp, isApplied: true }
          : opp
      )
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        // Already tracked → still update UI
        setBookmarks((prev) =>
          prev.map((opp) =>
            opp.id === opportunityId
              ? { ...opp, isApplied: true }
              : opp
          )
        );
        return;
      }
    }
    alert("Failed to track application");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookmarks</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarked opportunities</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((opp) => (
            <div
              key={opp.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h2 className="text-lg font-semibold">{opp.title}</h2>
              <p className="text-sm text-gray-600">
                {opp.organization}
              </p>

              <p className="mt-2 text-gray-700">
                {opp.description}
              </p>

              <div className="mt-4 flex gap-3">
                {/* Apply */}
                {opp.apply_link && (
  <a
    href={opp.apply_link}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    Apply
  </a>
)}


                {/* Track */}
                <button
                  disabled={opp.isApplied}
                  onClick={() => handleTrack(opp.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    opp.isApplied
                      ? "bg-gray-300 text-gray-600"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {opp.isApplied ? "Tracked" : "Track"}
                </button>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(opp.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookmarks;
