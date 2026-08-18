import React from "react";

export default function ConfirmModal({
  open,
  title = "Delete project?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.icon}>!</div>

        <h2 style={styles.title}>{title}</h2>

        <p style={styles.message}>{message}</p>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={styles.cancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            style={styles.delete}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(8px)",
  },

  modal: {
    width: "100%",
    maxWidth: "430px",
    padding: "30px",
    border: "1px solid #292929",
    borderRadius: "18px",
    background: "#101010",
    color: "#fff",
    boxShadow: "0 30px 100px rgba(0,0,0,.6)",
  },

  icon: {
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    borderRadius: "50%",
    background: "rgba(255, 70, 70, .12)",
    color: "#ff7070",
    fontWeight: "800",
  },

  title: {
    margin: 0,
    fontSize: "22px",
  },

  message: {
    margin: "10px 0 25px",
    color: "#888",
    fontSize: "14px",
    lineHeight: 1.6,
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancel: {
    border: "1px solid #333",
    background: "#151515",
    color: "#fff",
    padding: "11px 17px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  delete: {
    border: "none",
    background: "#e5484d",
    color: "#fff",
    padding: "11px 17px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
};