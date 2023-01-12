import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {
    const navigate = useNavigate();
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        dop: ""
    })
    const handleChange = (data) => {
        setBookData({
            ...bookData,
            ...data
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await axios.post('http://localhost:5000/books/', bookData);
        setBookData({
            title: "",
            author: "",
            dop: ""
        })
        if(result.status == "200"){
            navigate('/')
        }
    }
    return (
        <>
            <h4 className='mt-3 '>Add Book Form</h4>
            <section>
                <form className='mt-5' >
                    <div className="mb-3">
                        <label for="title" className="form-label">Enter Title</label>
                        <input type="text" name="title" value={bookData.title} className="form-control" id="title" onChange={(e) => handleChange({ title: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label for="author" className="form-label">Enter Author</label>
                        <input type="text" name="author" value={bookData.author} className="form-control" id="author" onChange={(e) => handleChange({ author: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label for="dop" className="form-label">Enter Date of Publication</label>
                        <input type="date" name="dop" value={bookData.dop} className="form-control" id="dop" onChange={(e) => handleChange({ dop: e.target.value })} />
                    </div>

                    <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
                </form>
            </section>
        </>
    )
}