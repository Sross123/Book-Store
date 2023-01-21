import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditBook() {
    const [apiData, setApiData] = useState({})
    const params = useParams();
    const navigate = useNavigate()

    const getSingleData = async() =>{
        let result = await axios.get(`http://localhost:5000/books/${params.id}`);
        console.log(result.data);
        setApiData(result.data)
    }

    useEffect(()=>{
        getSingleData()
    }, [])

    

    const handleChange = (data) =>{
        setApiData({
            ...apiData,
            ...data
        })
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        let result = await axios.put(`http://localhost:5000/books/${params.id}`, apiData);
        console.log(result);
        // console.log(apiData);
        if(result.status=="200"){
            navigate('/')
        }

    }

    return (
        <>
            <section>
                <form className='mt-5' >
                    <div className="mb-3">
                        <label for="title" className="form-label">Enter Title</label>
                        <input type="text" name="title" 
                        value={apiData?.title} 
                         className="form-control" id="title" onChange={(e)=>handleChange({title: e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label for="author" className="form-label">Enter Author</label>
                        <input type="text" name="author" 
                        value={apiData?.author}
                          className="form-control" id="author"  onChange={(e)=>handleChange({author: e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label for="dop" className="form-label">Enter Date of Publication</label>
                        <input type="date" name="dop" 
                        value={apiData?.dop}
                          className="form-control" id="dop"  onChange={(e)=>handleChange({dop: e.target.value})}/>
                    </div>

                    <button className="btn btn-success" onClick={handleSubmit}>Update</button>
                </form>
            </section>
        </>
    )
}