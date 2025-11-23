"use client";

import { useState } from "react";
import { useEffect } from "react";



export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");

  const [links, setLinks] = useState([]);

const loadLinks = async () => {
  const res = await fetch("/api/links");
  const data = await res.json();
  setLinks(data);
};

useEffect(() => {
  loadLinks();
}, []);


 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ longUrl, customCode }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Error: " + data.error);
    return;
  }

  alert("Short link created! Code: " + data.link.code);
  setLongUrl("");
  setCustomCode("");
  loadLinks();
};


  return (
    <main className="p-6 font-sans max-w-3xl mx-auto">

      <h1>TinyLink Dashboard</h1>

     <form onSubmit={handleSubmit} className="space-y-4 bg-black shadow p-4 rounded-md">
  <div>
    <label className="block mb-1">Long URL:</label>
    <input
      type="text"
      value={longUrl}
      onChange={(e) => setLongUrl(e.target.value)}
      placeholder="Enter long URL"
      required
      className="w-full border p-2 rounded"
    />
  </div>

  <div>
    <label className="block mb-1">Custom Code (optional):</label>
    <input
      type="text"
      value={customCode}
      onChange={(e) => setCustomCode(e.target.value)}
      placeholder="Enter short code"
      className="w-full border p-2 rounded"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Create Short Link
  </button>
</form>

      

      <h2 style={{ marginTop: "2rem" }}>All Short Links</h2>
<table className="w-full mt- border-collapse">
  <thead>
    <tr className="bg-white-200">
      <th className="p-2 border">Code</th>
      <th className="p-2 border">URL</th>
      <th className="p-2 border">Clicks</th>
      <th className="p-2 border">Actions</th>
    </tr>
  </thead>
  <tbody>
  {links.map((link) => (
    <tr key={link.id} className="border text-center">

      {/* Code column → clicks to stats page */}
      <td className="p-2">
        <a href={`/code/${link.code}`} className="text-blue-600 underline">
          {link.code}
        </a>
      </td>

      {/* Long URL */}
      <td className="p-2 text-left truncate max-w-[200px]">
        {link.longUrl}
      </td>

      {/* Click count */}
      <td className="p-2">{link.clicks}</td>

      {/* Actions */}
      <td className="p-2 space-x-2">
        {/* Visit Short URL */}
        <a
          href={`/${link.code}`}
          target="_blank"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Visit
        </a>

        {/* Stats page */}
        <a
          href={`/code/${link.code}`}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Stats
        </a>

        {/* Delete button */}
        <button
          onClick={async () => {
            const res = await fetch(`${window.location.origin}/api/links/${link.code}`, {
              method: "DELETE",
            });
            if (res.ok) loadLinks();
            else {
              const data = await res.json();
              alert("Delete failed: " + (data.error || "unknown error"));
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </td>

    </tr>
  ))}
</tbody>

</table>


    </main>
  );
}
