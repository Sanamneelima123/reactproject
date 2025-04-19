import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  width: "75%",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
};

const useState8 = () => {
  const URL = "https://jsonplaceholder.typicode.com/photos";

  const [userData, setUserData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const fetchApi = async (apiUrl) => {
      setIsLoading(true);
    try {
      const responsive = await fetch(apiUrl);
      const data = await responsive.json();
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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

  const handleEdit = (id, title,url) => {
    setEditingId(id);
    setEditedTitle(title);
    setEditedUrl(url);
    setIsModalOpen(true);
  };

  const handleUpdate = (id) => {
    const updatedData = userData.map((eachUser) => {
      if (eachUser.id === id) {
        return { ...eachUser, title: editedTitle , url:editedUrl};
      }
      return eachUser;
    });

    // Optionally, clear the form fields after submission
    setUserData(updatedData);
    setEditingId(null);
    setEditedTitle('');
    setEditedUrl('');
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

   if(isLoading){
    return <h4 className="text-center mt-5">Loading...</h4>
   }

  return (
    <div>
      <Header />
      <section className="container">
           { !isLoading &&
        <div className="row mt-5">
           
          {userData.map((eachUser) => {
            const { id, title, url, thumbnailUrl } = eachUser;
            return (
              <div key={id} className="col-4">
                <div className="shadow p-3 mb-3">
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
              </div>
            );
          })}
        </div>
           }
      </section>

      {isModalOpen && (
        <div className="p-4" style={modalOverlayStyle}>
            <div className="w-75" style={modalStyle}>
            <label>Title:</label>&nbsp;
            <input
                className="col-4"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
            />&nbsp;&nbsp;
            <label>Url:</label>&nbsp;
            <input
                type="text"
                className="col-4"
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
            />&nbsp;&nbsp;
            <button
                className="btn btn-primary"
                onClick={() => handleUpdate(editingId)}
            >
                Update
            </button>
            <button
                className="btn btn-secondary"
                onClick={handleCloseModal}
            >
                Cancel
            </button>
            </div>
        </div>
        )}

      <Footer />
    </div>
  );
};

export default useState8;
