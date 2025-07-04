const res = await fetch('https://mxpertztestapi.onrender.com/api/sciencefiction');
const data = await res.json();

navigate(`/story/${item._id}`);

useEffect(() => {
  fetch(`https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`)
    .then(res => res.json())
    .then(setStory);
}, [id]);


const [activeTab, setActiveTab] = useState("story");

return (
  <div>
    <div className="tabs">
      <button onClick={() => setActiveTab("story")}>Story</button>
      <button onClick={() => setActiveTab("author")}>Author Info</button>
      <button onClick={() => setActiveTab("more")}>More</button>
    </div>

    <div className="tab-content">
      {activeTab === "story" && <div>{story?.content}</div>}
      {activeTab === "author" && <div>{story?.author}</div>}
      {activeTab === "more" && <div>{story?.additionalDetails}</div>}
    </div>
  </div>
);

