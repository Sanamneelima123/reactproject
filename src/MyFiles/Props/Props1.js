import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Props1 = () => {
  const URL = "https://jsonplaceholder.typicode.com/photos";

  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");

  const fetchApi = async (apiUrl) => {
    try {
      const responsive = await fetch(apiUrl);
      const data = await responsive.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi(URL);
  }, []);

  const handleDelete = (id) => {
    const newDelete = userData.filter((eachUser) => {
      return eachUser.id !== id;
    });
    setUserData(newDelete);
  };

  const handleEdit = (id, title, url) => {
    setEditingId(id);
    setEditedTitle(title);
    setEditedUrl(url);
  };

  const handleUpdate = (id) => {
    // Perform the update operation, you might want to send a request to your API here
    // For simplicity, I'll just update the local state
    const updatedData = userData.map((eachUser) => {
      if (eachUser.id === id) {
        return { ...eachUser, title: editedTitle, url: editedUrl };
      }
      return eachUser;
    });

    setUserData(updatedData);
    setEditingId(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  return (
    <div>
      <Header />
      <section className="container mt-3 mb-5">
        <div className="row">
          {userData.map((eachUser) => {
            const { id, title, url, thumbnailUrl } = eachUser;
            return (
              <div key={id} className="col-6">
                <div className="shadow p-3 mb-3">
                  {editingId === id ? (
                    <div className="p-4">
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                      />
                      <button
                        className="btn btn-primary btn-cr"
                        onClick={() => handleUpdate(id)}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p>{title}</p>
                      <p>{url}</p>
                      <p className="text-center">
                        <img src={thumbnailUrl} alt={thumbnailUrl} />
                      </p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          className="btn btn-danger btn-cr"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEdit(id, title, url)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Props1;
