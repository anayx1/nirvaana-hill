"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Trash2,
  Download,
  CheckCircle,
  RefreshCw,
  X,
} from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (data.success) {
        setContacts(data.data || []);
      }
    } catch (err) {
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        showToast(`Lead marked as ${newStatus}`);
      }
    } catch (err) {
      console.error("Error updating lead status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
        showToast("Lead deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) return;

    const headers = ["ID", "Name", "Phone", "Email", "Requirement", "Message", "Status", "Date"];
    const rows = filteredContacts.map((c) => [
      `"${c.id}"`,
      `"${(c.name || "").replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      `"${(c.email || "").replace(/"/g, '""')}"`,
      `"${(c.requirement || "").replace(/"/g, '""')}"`,
      `"${(c.message || "").replace(/"/g, '""')}"`,
      `"${c.status}"`,
      `"${new Date(c.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nirvaana-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter contacts by status & search
  const filteredContacts = contacts.filter((c) => {
    const matchesStatus = activeStatus === "ALL" || c.status === activeStatus;
    const matchesSearch =
      !searchQuery ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.requirement?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusBadges = {
    NEW: "bg-emerald-50 text-emerald-700 border-emerald-300",
    CONTACTED: "bg-blue-50 text-blue-700 border-blue-300",
    QUALIFIED: "bg-purple-50 text-purple-700 border-purple-300",
    CLOSED: "bg-zinc-100 text-zinc-600 border-zinc-300",
  };

  const statusCounts = {
    ALL: contacts.length,
    NEW: contacts.filter((c) => c.status === "NEW").length,
    CONTACTED: contacts.filter((c) => c.status === "CONTACTED").length,
    QUALIFIED: contacts.filter((c) => c.status === "QUALIFIED").length,
    CLOSED: contacts.filter((c) => c.status === "CLOSED").length,
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F2922] text-[#AFEB63] font-semibold px-4 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2 text-[13.5px] animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#AFEB63]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E8D8]">
        <div>
          <h1 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#1F2922] tracking-tight">
            Leads &amp; Inquiries CRM
          </h1>
          <p className="text-[14px] text-[#5C6051] font-sans mt-0.5">
            Real-time management of customer inquiries and site visit requests
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchContacts}
            className="p-2.5 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#1F2922] border border-[#E5E8D8] transition-colors shadow-xs cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] text-[#1F2922] font-semibold text-[13.5px] px-4 py-2.5 rounded-xl transition-all border border-[#E5E8D8] shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#B3482B]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"].map((status) => {
            const isActive = activeStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveStatus(status)}
                className={`px-3.5 py-1.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#AFEB63] text-[#1F2922] shadow-xs"
                    : "bg-white text-[#5C6051] hover:text-[#1F2922] hover:bg-[#FAF9F5] border border-[#E5E8D8]"
                }`}
              >
                <span>{status === "ALL" ? "All Leads" : status}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    isActive ? "bg-[#1F2922] text-[#AFEB63]" : "bg-[#FAF9F5] text-[#5C6051]"
                  }`}
                >
                  {statusCounts[status] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C6051]/60" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E8D8] focus:border-[#AFEB63] focus:ring-1 focus:ring-[#AFEB63] rounded-xl text-[#1F2922] placeholder-[#5C6051]/50 text-[13.5px] outline-none transition-colors shadow-xs"
          />
        </div>

      </div>

      {/* Leads Table Container */}
      <div className="bg-white border border-[#E5E8D8] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-[#E5E8D8] bg-[#F3F5ED] text-[#5C6051] uppercase text-[11.5px] tracking-wider font-semibold">
                <th className="py-3.5 px-5">Lead / Contact</th>
                <th className="py-3.5 px-5">Requirement</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Date Received</th>
                <th className="py-3.5 px-5 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8D8]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5C6051]">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#1F2922] border-t-transparent rounded-full animate-spin" />
                      <span>Loading leads data...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredContacts.length > 0 ? (
                filteredContacts.map((lead) => {
                  const sanitizedPhone = (lead.phone || "").replace(/\D/g, "");
                  const whatsappUrl = `https://wa.me/${sanitizedPhone.startsWith("91") ? sanitizedPhone : `91${sanitizedPhone}`}?text=${encodeURIComponent(
                    `Hello ${lead.name}, thank you for inquiring about Nirvaana Hills Farmland Community. How can we assist you today?`
                  )}`;

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#FAF9F5] transition-colors"
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-[#1F2922] text-[14.5px]">
                          {lead.name}
                        </div>
                        <div className="text-[12.5px] text-[#5C6051] flex items-center gap-3 mt-1">
                          <a
                            href={`tel:${lead.phone}`}
                            className="hover:text-[#1F2922] flex items-center gap-1 transition-colors font-medium"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#B3482B]" />
                            <span>{lead.phone}</span>
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-[#1F2922] flex items-center gap-1 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#5C6051]/60" />
                              <span className="truncate max-w-[150px]">{lead.email}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Requirement & Message */}
                      <td className="py-4 px-5 max-w-[280px]">
                        <div className="text-[#1F2922] font-semibold truncate">
                          {lead.requirement || "Farmland Inquiry"}
                        </div>
                        {lead.message && (
                          <div
                            onClick={() => setSelectedContact(lead)}
                            className="text-[12px] text-[#5C6051] truncate mt-0.5 cursor-pointer hover:text-[#1F2922] transition-colors"
                            title="Click to view full message"
                          >
                            &ldquo;{lead.message}&rdquo;
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-5">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-[12px] font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer bg-white transition-all ${
                            statusBadges[lead.status] || "border-[#E5E8D8] text-[#1F2922]"
                          }`}
                        >
                          <option value="NEW" className="text-emerald-700">
                            NEW
                          </option>
                          <option value="CONTACTED" className="text-blue-700">
                            CONTACTED
                          </option>
                          <option value="QUALIFIED" className="text-purple-700">
                            QUALIFIED
                          </option>
                          <option value="CLOSED" className="text-zinc-600">
                            CLOSED
                          </option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-[#5C6051] text-[12.5px] font-mono">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* WhatsApp Direct */}
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Phone Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F3F5ED] text-[#1F2922] border border-[#E5E8D8] transition-colors cursor-pointer"
                            title="Call Lead"
                          >
                            <Phone className="w-4 h-4 text-[#B3482B]" />
                          </a>

                          {/* Delete Lead */}
                          <button
                            type="button"
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#5C6051]">
                    No leads found matching current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-[#E5E8D8] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E8D8]">
              <h3 className="font-serif text-[22px] text-[#1F2922] font-normal">
                Inquiry from {selectedContact.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="p-1 rounded-lg text-[#5C6051] hover:text-[#1F2922]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-[13.5px] text-[#5C6051] space-y-1.5 mb-5">
              <div>Phone: <span className="text-[#1F2922] font-semibold font-mono">{selectedContact.phone}</span></div>
              {selectedContact.email && <div>Email: <span className="text-[#1F2922] font-medium">{selectedContact.email}</span></div>}
              <div>Requirement: <span className="text-[#B3482B] font-semibold">{selectedContact.requirement}</span></div>
              <div>Date: <span className="text-[#1F2922] font-mono">{new Date(selectedContact.createdAt).toLocaleString()}</span></div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E8D8] mb-6">
              <label className="block text-[11px] font-semibold text-[#5C6051] uppercase tracking-wider mb-2">
                Customer Message
              </label>
              <p className="text-[14px] text-[#1F2922] leading-relaxed whitespace-pre-wrap">
                {selectedContact.message || "No specific message provided."}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F3F5ED] text-[#1F2922] border border-[#E5E8D8] text-[13.5px] font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
