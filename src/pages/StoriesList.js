import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mxpertztestapi.onrender.com/api/sciencefiction2";

export default function StoriesList() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch stories");
        const data = await res.json();
        setStories(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <div>Loading stories...</div>;
  if (error) return <div>Error: {error}</div>;

  /*
    Design-1 Screenshot Details (interpreted):
    - Card container with image at top
    - Title below image
    - Small description snippet
    - Some metadata if available
    - Card hover effect
  */

  return (
    <div style={{ maxWidth: 1200, margin: "auto", padding: 20 }}>
      <h1>Science Fiction Stories</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 24,
        }}
      >
        {stories.map((story) => (
          <div
            key={story._id}
            onClick={() => navigate(`/story/${story._id}`)}
            style={{
              cursor: "pointer",
              boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
            
              src={`https://ik.imagekit.io/dev24/${story.Image}`}
              alt={story.Title}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
              loading="lazy"
            />
            <div style={{ padding: 16, flex: 1 }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: 8, color: "#222" }}>
                {story.Title}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {story.Description || story.Story || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}