"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Spinner from "@/components/ui/spinner";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [certificates, setCertificates] = useState([]);
  const [certificatesLoading, setCertificatesLoading] = useState(true);

  const [projectLoading, setProjectLoading] = useState(false);
  const [certLoading, setCertLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editingCertId, setEditingCertId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    live_url: "",
    github_url: "",
  });

  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    issued_date: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [certMessage, setCertMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };

    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        } else {
          setUser(session.user);
          setLoading(false);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const loadProjects = async () => {
    setProjectsLoading(true);

    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setProjectsLoading(false);
  };

  const loadCertificates = async () => {
    setCertificatesLoading(true);

    const { data } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    setCertificates(data || []);
    setCertificatesLoading(false);
  };

  useEffect(() => {
    loadProjects();
    loadCertificates();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setProjectLoading(true);
    setMessage(editingId ? "Updating project..." : "Adding project...");

    try {
      if (editingId) {
        const res = await fetch("/api/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            title: form.title,
            description: form.description,
            live_url: form.live_url,
            github_url: form.github_url,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          setMessage(result.error || "Update failed");
          return;
        }

        setMessage("Project updated ✅");
      } else {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("live_url", form.live_url);
        formData.append("github_url", form.github_url);

        if (form.image instanceof File) {
          formData.append("image", form.image);
        }

        const res = await fetch("/api/projects", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          setMessage(result.error || "Failed");
          return;
        }

        setMessage("Project added ✅");
      }

      setForm({
        title: "",
        description: "",
        image: null,
        live_url: "",
        github_url: "",
      });

      setEditingId(null);
      loadProjects();
    } finally {
      setProjectLoading(false);
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: null,
      live_url: project.live_url || "",
      github_url: project.github_url || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;

    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Delete failed");
    } else {
      loadProjects();
    }
  }

  async function handleCertificateSubmit(e) {
    e.preventDefault();
    setCertLoading(true);

    try {
      if (editingCertId) {
        const res = await fetch("/api/certificates", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingCertId,
            title: certForm.title,
            issuer: certForm.issuer,
            issued_date: certForm.issued_date,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          setCertMessage(result.error || "Update failed");
          return;
        }

        setCertMessage("Certificate updated ✅");
      } else {
        const formData = new FormData();
        formData.append("title", certForm.title);
        formData.append("issuer", certForm.issuer);
        formData.append("issued_date", certForm.issued_date);

        if (certForm.image) {
          formData.append("image", certForm.image);
        }

        const res = await fetch("/api/certificates", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          setCertMessage(result.error || "Failed");
          return;
        }

        setCertMessage("Certificate added ✅");
      }

      setCertForm({
        title: "",
        issuer: "",
        issued_date: "",
        image: null,
      });

      setEditingCertId(null);
      loadCertificates();
    } finally {
      setCertLoading(false);
    }
  }

  function handleEditCertificate(cert) {
    setEditingCertId(cert.id);
    setCertForm({
      title: cert.title || "",
      issuer: cert.issuer || "",
      issued_date: cert.issued_date || "",
      image: null,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDeleteCertificate(id) {
    if (!confirm("Delete this certificate?")) return;

    const res = await fetch("/api/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Delete failed");
    } else {
      loadCertificates();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10 pt-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
        >
          Logout
        </button>
      </div>

      {/* PROJECT FORM */}
      <div className="border p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Project title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Project description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />

          {!editingId && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files?.[0] || null })
              }
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            name="live_url"
            placeholder="Live site URL"
            value={form.live_url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="github_url"
            placeholder="GitHub URL"
            value={form.github_url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <button
            disabled={projectLoading}
            className="bg-black text-white px-4 py-2 rounded flex gap-2 items-center"
          >
            {projectLoading && <Spinner />}
            {editingId ? "Update Project" : "Add Project"}
          </button>

          {message && <p className="text-sm text-gray-600">{message}</p>}
        </form>
      </div>

      {/* PROJECT LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projectsLoading && <Spinner />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="border p-4 rounded-xl space-y-3">
              {p.image && (
                <img
                  src={p.image}
                  className="h-40 w-full object-cover rounded"
                />
              )}
              <h3 className="font-bold">{p.title}</h3>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="border px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATE FORM (THIS WAS MISSING) */}
      <div className="border p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          {editingCertId ? "Edit Certificate" : "Add Certificate"}
        </h2>

        <form onSubmit={handleCertificateSubmit} className="space-y-4">
          <input
            placeholder="Certificate title"
            value={certForm.title}
            onChange={(e) =>
              setCertForm({ ...certForm, title: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            placeholder="Issuer"
            value={certForm.issuer}
            onChange={(e) =>
              setCertForm({ ...certForm, issuer: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="date"
            value={certForm.issued_date}
            onChange={(e) =>
              setCertForm({ ...certForm, issued_date: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCertForm({ ...certForm, image: e.target.files?.[0] || null })
            }
            className="w-full border px-3 py-2 rounded"
          />

          <button
            disabled={certLoading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {certLoading
              ? "Saving..."
              : editingCertId
                ? "Update Certificate"
                : "Add Certificate"}
          </button>

          {certMessage && (
            <p className="text-sm text-gray-600">{certMessage}</p>
          )}
        </form>
      </div>

      {/* CERTIFICATES LIST */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Certificates</h2>
        {certificatesLoading && <Spinner />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((c) => (
            <div key={c.id} className="border p-4 rounded-xl space-y-2">
              {c.image && (
                <img
                  src={c.image}
                  className="h-32 w-full object-cover rounded"
                />
              )}
              <h3 className="font-bold">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.issuer}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCertificate(c)}
                  className="border px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCertificate(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
