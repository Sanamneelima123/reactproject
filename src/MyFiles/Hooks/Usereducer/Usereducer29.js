import React, { useEffect, useReducer, useState } from "react";
import Header from "../../../Components/Header";
import Footer from "../../../Components/Footer";
import Loader from "../../../images/Loading-img.gif"; // Ensure this path is correct



const Usereducer29 = () => {

    const reducer = (state, action) => {
        if (action.type === "FETCH_API") {
            return {
                ...state,
                Mydata: action.payLoad
            };
        }
    
        if (action.type === "LOADING") {
            return {
                ...state,
                isLoading: action.payLoad
            };
        }
    
        if (action.type === "DELETE") {
            const deleteData = state.Mydata.filter(eachData => eachData.id !== action.payload);
            return {
                ...state,
                Mydata: deleteData
            };
        }
    
        if (action.type === "ONCLICK_EDIT") {
            return {
                ...state,
                isEditing: action.payLoad
            };
        }
    
        if (action.type === "UPDATE") {
            const updatedData = state.Mydata.map((eachData)=>{
                if(eachData.id === action.payLoad.id){
                    return {
                        id:action.payLoad.id,
                        name:action.payLoad.name,
                        email:action.payLoad.email,
                        website:action.payLoad.website
                    }
                }else{
                    return eachData
                }
            })
            return {
                ...state,
                Mydata:updatedData
                }
            
        }
    
        return state;
    };
    
    const fetchApi = async (apiUrl, dispatch) => {
        dispatch({ type: 'LOADING', payLoad: true });
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            dispatch({ type: 'FETCH_API', payLoad: data });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    
    const handleDelete = async (id, dispatch) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to Delete User');
            }
            dispatch({ type: 'DELETE', payload: id });
        } catch (error) {
            console.log('Error Message Delete:', error);
        }
    };
    
    const initialState = {
        Mydata: [],
        isLoading: false,
        isEditing: { status: false, id: '', name: '', email: '', website: '' }
    };

    const URL = "https://jsonplaceholder.typicode.com/users";

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchApi(URL, dispatch);
    }, []);

    const updateData = (id, name, email, website) => {
        dispatch({ type: 'UPDATE', payLoad: { id, name, email, website } });
        dispatch({type:'ONCLICK_EDIT', payLoad:{status:false, id:'', name:'', email:'', website:''}})
    };

    return (
        <div>
            <Header />
            <div className="container">
                {state.isLoading &&
                    <h3 className="text-center mt-5">
                        <img src={Loader} alt="Loading..." />
                    </h3>
                }

                {state.isEditing.status && (
                    <EditForm
                        id={state.isEditing.id}
                        comingName={state.isEditing.name}
                        comingEmail={state.isEditing.email}
                        comingWebsite={state.isEditing.website}
                        updateData={updateData}
                    />
                )}

                <div className="row mt-3 mb-3">
                    {state.Mydata.length > 0 ? (
                        state.Mydata.map(eachData => {
                            const { id, name, email, website } = eachData;
                            return (
                                <div key={id} className="col-4 col-xs-12">
                                    <div className="shadow p-3 mb-2">
                                        <p>{name}</p>
                                        <p>{email}</p>
                                        <p>{website}</p>
                                        <div className="d-grid gap-0 d-md-flex justify-content-md-end">
                                            <button
                                                className="btn btn-danger rounded-0"
                                                onClick={() => handleDelete(id, dispatch)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-info rounded-0"
                                                onClick={() => dispatch({ type: 'ONCLICK_EDIT', payLoad: { status: true, id:id, name:name, email, website } })}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

const EditForm = ({ id, comingName, comingEmail, comingWebsite, updateData }) => {
    const [name, setName] = useState(comingName || '');
    const [email, setEmail] = useState(comingEmail || '');
    const [website, setWebsite] = useState(comingWebsite || '');

    useEffect(() => {
        setName(comingName);
        setEmail(comingEmail);
        setWebsite(comingWebsite);
    }, [comingName, comingEmail, comingWebsite]);

    const submitData = () => {
        if (!name || !email || !website) {
            alert('Please fill all the fields');
            return;
        }
        updateData(id, name, email, website);
    };

    return (
        <div className="shadow p-3">
            <input
                type="text"
                className="form-control mb-2"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                className="form-control mb-2"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                className="form-control mb-2"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={submitData}
            >
                Update
            </button>
        </div>
    );
};

export default Usereducer29;
