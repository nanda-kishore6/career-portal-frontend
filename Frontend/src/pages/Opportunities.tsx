import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Opportunity } from "../types/opportunity";
import {
  fetchOpportunities,
  deleteOpportunity,
} from "../api/opportunities";
import { useAuth } from "../context/useAuth";
import {
  bookmarkOpportunity,
  unbookmarkOpportunity,
} from "../api/bookmarks";
import { trackApplication } from "../api/applications";
import axios from "axios";

function Opportunities() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ===============================
     DATA LOADER (PAGINATED)
     =============================== */
  const loadOpportunities = async (
   
    page: number = 1
  ) => {
    try {
      setLoading(true);

      const data = await fetchOpportunities(
        search || undefined,
        category || undefined,
        
        page,
        10 // items per page
      );
      console.log("Pagination response:", data);

      setOpportunities(data.opportunities);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setError("");
    } catch {
      setError("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  // Initial load (page 1)
  useEffect(() => {
    loadOpportunities(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ===============================
     BOOKMARK TOGGLE
     =============================== */
  const toggleBookmark = async (
    opportunityId: string,
    isBookmarked?: boolean
  ) => {
    try {
      if (isBookmarked) {
        await unbookmarkOpportunity(opportunityId);
      } else {
        await bookmarkOpportunity(opportunityId);
      }

      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === opportunityId
            ? { ...opp, isBookmarked: !isBookmarked }
            : opp
        )
      );
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 409
      ) {
        setOpportunities((prev) =>
          prev.map((opp) =>
            opp.id === opportunityId
              ? { ...opp, isBookmarked: true }
              : opp
          )
        );
      } else {
        alert("Failed to update bookmark");
      }
    }
  };

  /* ===============================
     TRACK APPLICATION
     =============================== */
  const handleTrack = async (opportunityId: string) => {
    try {
      await trackApplication(opportunityId);

      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === opportunityId
            ? { ...opp, isApplied: true }
            : opp
        )
      );
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 409
      ) {
        alert("Already tracked");
        return;
      }
      alert("Failed to track application");
    }
  };

  /* ===============================
     DELETE (ADMIN)
     =============================== */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this opportunity?")) return;

    try {
      await deleteOpportunity(id);
      loadOpportunities(currentPage);
    } catch {
      alert("Failed to delete opportunity");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6">
  <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
  Opportunities
</h1>
<p className="text-sm text-slate-500 mt-1">
  Explore internships, jobs, and programs curated for you
</p>

</div>



      {/* 🔍 Search & Filter */}
      <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border flex flex-wrap gap-3">
  <input
    type="text"
    placeholder="Search by title or organization..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 min-w-55 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
  >
    <option value="">All Categories</option>
    <option value="INTERNSHIP">Internship</option>
    <option value="JOB">Job</option>
    <option value="EVENT">Event</option>
    <option value="HACKATHON">Hackathon</option>
    <option value="SCHOLARSHIP">Scholarship</option>
  </select>

  <button
    onClick={() => loadOpportunities(1)}
    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
  >
    Search
  </button>
</div>

      {/* List */}
      {!opportunities || opportunities.length === 0 ? (
  <p>No opportunities found</p>
) : (
  <div className="grid gap-4">
    {opportunities.map((opp) => (
      <div
  key={opp.id}
  className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
>

        <div className="flex items-start justify-between gap-4">
  {/* Left: Logo + text */}
  <div className="flex items-start gap-4">
    {/* Logo */}
    <div className="w-14 h-14 flex items-center justify-center rounded-md bg-gray-100 overflow-hidden">
      {opp.organization_logo ? (
        <img
          src={opp.organization_logo}
          alt={opp.organization}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="text-xs text-gray-400 text-center px-1">
          No Logo
        </span>
      )}
    </div>

    {/* Text */}
    <div>
      <h2 className="text-lg font-semibold text-slate-800">
  {opp.title}
</h2>
<p className="text-sm text-slate-500">
  {opp.organization}
</p>

    </div>
  </div>

  {/* Right: Bookmark */}
  {user?.role === "STUDENT" && (
  <button
    onClick={() =>
      toggleBookmark(opp.id, opp.isBookmarked)
    }
    className={`px-3 py-1 text-xs font-medium rounded-full transition ${
  opp.isBookmarked
    ? "bg-yellow-100 text-yellow-800"
    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
}`}

  >
    {opp.isBookmarked ? "Bookmarked ★" : "Bookmark ☆"}
  </button>
  )}
</div>
    


        <p className="mt-2 text-gray-700">
          {opp.description}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Deadline:{" "}
          {new Date(opp.deadline).toLocaleDateString()}
        </p>

        {/* STUDENT ACTIONS */}
        {user?.role === "STUDENT" && (
          <div className="mt-4 flex gap-3">
            <a
              href={opp.apply_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"

            >
              Apply
            </a>

            <button
              onClick={() => handleTrack(opp.id)}
              disabled={opp.isApplied}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
              opp.isApplied
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
           }`}

            >
              {opp.isApplied ? "Tracked" : "Track"}
            </button>
          </div>
        )}

        {/* ADMIN ACTIONS */}
        {user?.role === "ADMIN" && (
          <div className="mt-4 flex gap-3">
            <button
              onClick={() =>
                navigate(`/admin/edit-opportunity/${opp.id}`)
              }
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(opp.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
)}


      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => loadOpportunities(currentPage - 1)}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => loadOpportunities(currentPage + 1)}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Opportunities;
