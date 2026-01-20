import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function CreateOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    organization: "",
    category: "",
    deadline: "",
    status: "ACTIVE",
    apply_link: "", 
     organization_logo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/opportunities", {
        title: form.title.trim(),
        description: form.description.trim(),
        organization: form.organization.trim(),
        category: form.category,
        status: "ACTIVE",
        deadline: form.deadline,
        apply_link: form.apply_link.trim() || null, 
        organization_logo: form.organization_logo.trim() || null,
      });

      navigate("/");
    } catch {
      setError("Failed to create opportunity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-xl"
      >
        <h1 className="text-xl font-bold mb-4">Create Opportunity</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="organization"
          placeholder="Organization"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="JOB">Job</option>
          <option value="SCHOLARSHIP">Scholarship</option>
          <option value="HACKATHON">Hackathon</option>
          <option value="EVENT">Event</option>
        </select>

        <input
          type="date"
          name="deadline"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        
        <input
          type="url"
          name="apply_link"
          placeholder="Apply Link (URL)"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />
        <input
          type="url"
          name="organization_logo"
          placeholder="Organization Logo (URL)"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        />


        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Opportunity"}
        </button>
      </form>
    </div>
  );
}

export default CreateOpportunity;
