import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

function EditOpportunity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    organization: "",
    category: "INTERNSHIP",
    deadline: "",
    status: "ACTIVE",
    apply_link: "",
    organization_logo: "",

  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     LOAD OPPORTUNITY
     ========================= */
  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/opportunities/${id}`);
        const opp = res.data.opportunity;

        setForm({
          title: opp.title || "",
          description: opp.description || "",
          organization: opp.organization || "",
          category: opp.category || "INTERNSHIP",
          deadline: opp.deadline
            ? opp.deadline.split("T")[0]
            : "",
          status: opp.status || "ACTIVE",
          apply_link: opp.apply_link || "",
          organization_logo: opp.organization_logo || "",
        });
      } catch {
        setError("Failed to load opportunity");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     UPDATE OPPORTUNITY
     ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/opportunities/${id}`, {
        title: form.title.trim(),
        description: form.description.trim(),
        organization: form.organization.trim(),
        category: form.category,
        deadline: form.deadline,
        status: form.status,
        apply_link: form.apply_link.trim() || null,
        organization_logo: form.organization_logo.trim() || null,

      });

      navigate("/");
    } catch {
      setError("Failed to update opportunity");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-xl"
      >
        <h1 className="text-xl font-bold mb-4">Edit Opportunity</h1>

        {error && (
          <p className="text-red-600 mb-3">{error}</p>
        )}

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input
          name="organization"
          value={form.organization}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="INTERNSHIP">Internship</option>
          <option value="JOB">Job</option>
          <option value="SCHOLARSHIP">Scholarship</option>
          <option value="HACKATHON">Hackathon</option>
          <option value="EVENT">Event</option>
        </select>

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        {/* ✅ APPLY LINK FIELD */}
        <input
          type="url"
          name="apply_link"
          placeholder="Apply Link (optional)"
          value={form.apply_link}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />
        <input
          type="url"
          name="organization_logo"
          placeholder="Organization Logo URL (optional)"
          value={form.organization_logo}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
       />


        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Opportunity
        </button>
      </form>
    </div>
  );
}

export default EditOpportunity;
