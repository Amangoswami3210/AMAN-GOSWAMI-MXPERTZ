import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://mxpertztestapi.onrender.com/api/sciencefiction";

function Tab({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        borderBottom: isActive ? "3px solid #0078d7" : "3px solid transparent",
        backgroundColor: "transparent",
        fontWeight: isActive ? "600" : "400",
        fontSize: 16,
        outline: "none",
      }}
    >
      {label}
    </button>
  );
}

export default function StoryDetail() {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch story");
        const data = await res.json();
        setStory(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <div>Loading story data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!story) return <div>No story data found.</div>;

  /*
  Design-2 Screenshot Details (interpreted):
    - Card with story image on the left (or top on mobile)
    - Title and author
    - Three tabs on top: "Overview", "Details", "Comments" (example tabs)
    - Active tab content below
  */
 
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <Link to="/" style={{ color: "#0078d7", textDecoration: "underline", marginBottom: 16, display: "inline-block" }}>
        &larr; Back to Stories
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <img
          src={`https://ik.imagekit.io/dev24/${story?.Image}`}
          alt={story.Title}
          style={{ width: 300, height: 300, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
          loading="lazy"
        />
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: "0 0 10px" }}>{story.Title}</h1>
          {story.Author && (
            <p style={{ fontWeight: "600", color: "#555", marginTop: 0 }}>
              By {story.Author}
            </p>
          )}
          {story.PublishDate && (
            <p style={{ color: "#888", fontSize: 14, marginTop: 4 }}>
              Published: {new Date(story.PublishDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #ddd", marginBottom: 20 }}>
        {["Overview", "Details", "Comments"].map((tab) => (
          <Tab
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      {/* Tab content */}
      <div style={{ minHeight: 150, fontSize: 16, lineHeight: 1.5, color: "#333" }}>
        {activeTab === "Overview" && (
          <>
            <h3>Synopsis</h3>
            <p>{story.Description || story.Story || "No overview available."}</p>
          </>
        )}

        {activeTab === "Details" && (
          <>
            <h3>Story Details</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {story.Genre && (
                  <tr>
                    <td style={{ padding: 8, fontWeight: "600", borderBottom: "1px solid #ccc" }}>
                      Genre:
                    </td>
                    <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                      {story.Genre}
                    </td>
                  </tr>
                )}
                {story.Author && (
                  <tr>
                    <td style={{ padding: 8, fontWeight: "600", borderBottom: "1px solid #ccc" }}>
                      Author:
                    </td>
                    <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                      {story.Author}
                    </td>
                  </tr>
                )}
                {story.PublishDate && (
                  <tr>
                    <td style={{ padding: 8, fontWeight: "600", borderBottom: "1px solid #ccc" }}>
                      Published On:
                    </td>
                    <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                      {new Date(story.PublishDate).toLocaleDateString()}
                    </td>
                  </tr>
                )}
                {story.Rating && (
                  <tr>
                    <td style={{ padding: 8, fontWeight: "600", borderBottom: "1px solid #ccc" }}>
                      Rating:
                    </td>
                    <td style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
                      {story.Rating} / 5
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "Comments" && (
          <>
            <h3>Comments</h3>
            {/* If comment data not available show placeholder */}
            {story.Comments && story.Comments.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {story.Comments.map((comment, idx) => (
                  <li key={idx} style={{ marginBottom: 12, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{comment.user}</p>
                    <p style={{ margin: 0 }}>{comment.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No comments available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}