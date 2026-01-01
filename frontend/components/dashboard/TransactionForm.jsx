"use client";

// The form to Add OR Edit a transaction.
// It receives all its data and handler functions from the parent Dashboard page.
export default function TransactionForm({
  form,
  handleChange,
  handleFileChange,
  handleSubmit,
  isEditing,
  cancelEdit,
  loading,
  today,
}) {
  return (
    <div className="modern-card mb-4" id="transaction-form">
      {/* Dynamic Title based on whether we are adding or editing */}
      <h5 className="fw-bold mb-4" style={{ color: "var(--text-primary)" }}>
        {isEditing ? "Edit Transaction" : "New Entry"}
      </h5>
      <form onSubmit={handleSubmit}>
        {/* Description Field */}
        <div className="mb-3">
          <input
            name="description"
            value={form.description}
            placeholder="Description"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        {/* Amount & Type (Expense/Income) Row */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            <input
              name="amount"
              value={form.amount}
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              className="form-control"
              onChange={(e) => {
                if (e.target.value < 0) return;
                handleChange(e);
              }}
              required
            />
          </div>
          <div className="col-6">
            <select
              name="type"
              className="form-select"
              value={form.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Date & Category Row */}
        <div className="row g-2 mb-3">
          <div className="col-6">
            {/* Max date set to 'today' so users can't pick future dates */}
            <input
              name="date"
              type="date"
              max={today}
              value={form.date}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-6">
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Health">Health</option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        {/* File Upload for Receipt */}
        <div className="mb-3">
          <label className="form-label small text-secondary">
            Receipt (Optional)
          </label>
          <input
            type="file"
            id="receiptInput"
            className="form-control form-control-sm"
            onChange={handleFileChange}
            accept="image/*,.pdf"
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary-blue w-100" disabled={loading}>
          {loading
            ? "Processing..."
            : isEditing
            ? "Update Transaction"
            : "Add Record"}
        </button>

        {/* Cancel Button (Only visible when editing) */}
        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className="btn btn-outline-secondary w-100 mt-2"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
