"use client";
import { useState } from "react";
import { saveNoteAction } from "./actions";

export default function Notes({ initialNotes = [] }) {
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSaving(true);
    const result = await saveNoteAction(content);
    if (result && result.note) {
      setNotes([result.note, ...notes]);
      setContent("");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setNotes(notes.filter((note) => note.id !== id));
    } else {
      alert("Failed to delete note.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-2 mb-4 items-center"
      >
        <textarea
          className="w-full border border-black rounded p-2 mb-2"
          rows={6}
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="btn btn-sm btn-primary mb-6 mx-auto"
          type="submit"
          disabled={saving || !content.trim()}
          style={{ minWidth: "100px" }}
        >
          {saving ? "Saving..." : "Save Note"}
        </button>
      </form>
      <h2 className="text-lg font-semibold mb-2">Your Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3 border rounded bg-gray-50 flex flex-col gap-2"
          >
            <pre className="whitespace-pre-wrap break-words">
              {note.content}
            </pre>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString("en-GB", {
                  timeZone: "UTC",
                })}
              </div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <div>No notes yet.</div>}
      </div>
    </div>
  );
}
