"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

const API_URL = "http://127.0.0.1:5000";

function getAuthHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default function DashboardPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // JWT auth check
  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [mounted, router]);

  async function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  const loadProjects = async () => {
    setProjectsLoading(true);

    const res = await fetch(`${API_URL}/api/projects`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      router.replace("/login");
      return;
    }

    const data = await res.json();
    setProjects(data || []);
    setProjectsLoading(false);
  };

  const loadCertificates = async () => {
    setCertificatesLoading(true);

    const res = await fetch(`${API_URL}/api/certificates`, {
      headers: getAuthHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      router.replace("/login");
      return;
    }

    const data = await res.json();
    setCertificates(data || []);
    setCertificatesLoading(false);
  };

  useEffect(() => {
    if (!mounted) return;
    loadProjects();
    loadCertificates();
  }, [mounted]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setProjectLoading(true);
    setMessage(editingId ? "Updating project..." : "Adding project...");

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/api/projects/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
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

        const res = await fetch(`${API_URL}/api/projects`, {
          method: "POST",
          headers: getAuthHeaders(),
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
    setEditingId(project._id);
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

    await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    loadProjects();
  }

  async function handleCertificateSubmit(e) {
    e.preventDefault();
    setCertLoading(true);

    try {
      if (editingCertId) {
        await fetch(`${API_URL}/api/certificates/${editingCertId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            title: certForm.title,
            issuer: certForm.issuer,
            issued_date: certForm.issued_date,
          }),
        });

        setCertMessage("Certificate updated ✅");
      } else {
        const formData = new FormData();
        formData.append("title", certForm.title);
        formData.append("issuer", certForm.issuer);
        formData.append("issued_date", certForm.issued_date);

        if (certForm.image) {
          formData.append("image", certForm.image);
        }

        await fetch(`${API_URL}/api/certificates`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });

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
    setEditingCertId(cert._id);
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

    await fetch(`${API_URL}/api/certificates/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    loadCertificates();
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10 pt-24">
      {/* YOUR ORIGINAL UI REMAINS UNCHANGED */}
    </main>
  );
}
