import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    api: {
      readHosts: () => Promise<string>;
      writeHosts: (content: string) => Promise<string>;
    };
  }
}

const App: React.FC = () => {
  const [hostsContent, setHostsContent] = useState<string>("");
  const [newEntry, setNewEntry] = useState<string>("");

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const content = await window.api.readHosts();
        setHostsContent(content);
      } catch (err) {
        console.error("Failed to read hosts file:", err);
      }
    };

    fetchHosts();
  }, []);

  const handleAddEntry = async () => {
    const updatedContent = `${hostsContent}\n${newEntry}`;
    try {
      console.log(updatedContent);
      await window.api.writeHosts(updatedContent);
      setHostsContent(updatedContent);
      setNewEntry("");
    } catch (err) {
      console.error("Failed to write to hosts file:", err);
    }
  };

  const handleDeleteEntry = async (entry: string) => {
    const updatedContent = hostsContent
      .split("\n")
      .filter((line) => line !== entry)
      .join("\n");
    try {
      await window.api.writeHosts(updatedContent);
      setHostsContent(updatedContent);
    } catch (err) {
      console.error("Failed to write to hosts file:", err);
    }
  };

  return (
    <div>
      <h1>Hosts File Manager</h1>
      <textarea
        value={hostsContent}
        onChange={(e) => setHostsContent(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Add new entry"
      />
      <button onClick={handleAddEntry}>Add Entry</button>
      <ul>
        {hostsContent.split("\n").map((line, index) => (
          <li key={index}>
            {line}
            <button onClick={() => handleDeleteEntry(line)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
