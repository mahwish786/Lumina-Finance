// frontend/app/dashboard/page.js

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Navbar from "../../components/Navbar";
import StatCards from "../../components/dashboard/StatCards";
import TransactionForm from "../../components/dashboard/TransactionForm";
import CashFlowChart from "../../components/dashboard/CashFlowChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import DeleteModal from "../../components/dashboard/DeleteModal";

// The Main Dashboard Controller
// This file manages all the data (state) and functions (fetching, adding, deleting).
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netIncome: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: "",
    receipt: null,
  });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  // Get Today's date to stop users from picking future dates in the form
  const today = new Date().toISOString().split("T")[0];

  // -- Function: Fetch Data from Backend --
  const fetchData = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // Redirect to login if no token is found
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // Call API with the current filter (e.g., ?category=Food)
      const res = await axios.get(
        `http://localhost:5000/api/transactions?category=${filter}`,
        // `/api/transactions?category=${filter}`, // Use this line for production with a Next.js API route
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Sort results by ID (descending) so newest shows first
      const sortedTransactions = res.data.data.transactions.sort((a, b) => {
        return b._id.localeCompare(a._id);
      });

      setTransactions(sortedTransactions);
      setSummary({
        totalIncome: res.data.data.totalIncome,
        totalExpense: res.data.data.totalExpense,
        netIncome: res.data.data.netIncome,
      });
    } catch (err) {
      // If token is invalid (401), logout the user
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  // Re-fetch data whenever the 'filter' changes
  useEffect(() => {
    fetchData();
  }, [filter]);

  // Handle form text changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle file input changes
  const handleFileChange = (e) =>
    setForm({ ...form, receipt: e.target.files[0] });

  // -- Function: Generate PDF Report --
  const downloadReport = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("Lumina Finance Report", 14, 22);

      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      doc.text(`Net Balance: $${summary.netIncome}`, 14, 36);

      const tableColumn = [
        "Date",
        "Description",
        "Category",
        "Type",
        "Amount",
      ];
      const tableRows = transactions.map((t) => [
        new Date(t.date).toLocaleDateString(),
        t.description,
        t.category,
        t.type.toUpperCase(),
        `$${t.amount}`,
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 45,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 3, overflow: "linebreak" },
        headStyles: { fillColor: [59, 130, 246] },
        columnStyles: {
          1: { cellWidth: 60 },
        },
      });

      doc.save("Lumina_Report.pdf");
      toast.success("PDF Downloaded successfully!");
    } catch (err) {
      console.error("PDF Error:", err);
      alert("PDF Error: " + err.message);
    }
  };

  // -- Function: Submit Form (Add or Edit) --
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Use FormData because we might be uploading a receipt file
      const formData = new FormData();
      formData.append("description", form.description);
      formData.append("amount", Math.abs(form.amount));
      formData.append("type", form.type);
      formData.append("category", form.category);
      formData.append("date", form.date);
      if (form.receipt) formData.append("receipt", form.receipt);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEditing) {
        // UPDATE existing transaction
        await axios.put(
          `http://localhost:5000/api/transactions/${editId}`,
          // `/api/transactions/${editId}`, // Use this line for production with a Next.js API route
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Transaction Updated");
        setIsEditing(false);
        setEditId(null);
      } else {
        // CREATE new transaction
        await axios.post(
          "http://localhost:5000/api/transactions",
          // "/api/transactions", // Use this line for production with a Next.js API route
          formData,
          config
        );
        toast.success("Transaction Added");
      }

      // Reset form
      setForm({
        description: "",
        amount: "",
        type: "expense",
        category: "Food",
        date: "",
        receipt: null,
      });
      const fileInput = document.getElementById("receiptInput");
      if (fileInput) fileInput.value = "";

      await fetchData(); // Refresh data
    } catch (error) {
      toast.error("Error saving transaction.");
    }
    setLoading(false);
  };

  // -- Delete Handlers --
  const initiateDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true); // Open the modal
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5000/api/transactions/${deleteId}`,
        // `/api/transactions/${deleteId}`, // Use this line for production with a Next.js API route
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Deleted");
      await fetchData();
    } catch (err) {
      toast.error("Failed to delete.");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // -- Edit Handlers --
  const handleEdit = (t) => {
    // Populate form with the transaction data
    setForm({
      description: t.description,
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: t.date.split("T")[0], // Format date for input
      receipt: null,
    });
    setEditId(t._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top to see form
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setForm({
      description: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: "",
      receipt: null,
    });
  };

  return (
    <div
      className="min-vh-100 pb-5"
      style={{ background: "var(--bg-main)" }}
    >
      <Navbar />

      {/* Modal is outside the main layout, handled by AnimatePresence for fade effects */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            confirmDelete={confirmDelete}
            cancelDelete={() => setShowDeleteModal(false)}
          />
        )}
      </AnimatePresence>

      <div className="container mt-4">
        
        {/* Top Cards (Total Income, Expense, Net) */}
        <StatCards summary={summary} />

        <div className="row g-4">
          <div className="col-lg-4">

            {/* Left Column: Form and Chart */}
            <TransactionForm
              form={form}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              cancelEdit={cancelEdit}
              loading={loading}
              today={today}
            />
            <CashFlowChart transactions={transactions} />
          </div>

          <div className="col-lg-8">

            {/* Right Column: List of Transactions */}
            <RecentActivity
              transactions={transactions}
              filter={filter}
              setFilter={setFilter}
              downloadReport={downloadReport}
              handleEdit={handleEdit}
              initiateDelete={initiateDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}