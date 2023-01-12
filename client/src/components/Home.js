import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let result = await axios.get('http://localhost:5000/books/');
        setFormData(result.data)
    }

    const handleEdit = (id) => {
        navigate(`/books/${id}`)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/books/${id}`);
        getData()
    }

    const handleSearch = async(e) =>{
        let key = e.target.value
        let result = await axios.get(`http://localhost:5000/books/search/${key}`);
        console.log(result.data);
        setFormData(result.data)
    }

    return (
        <>
            <main>
            <input type="text" className="form-control" placeholder="Search book" style={{ width: "900px", margin:"25px 0" }} onChange={handleSearch}/>
                <table className="table" style={{ width: "900px" }}>
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Title </th>
                            <th scope="col">Author</th>
                            <th scope="col">Date of Publication</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData && formData.map((item, index) => {
                            return <tr className="table-secondary">
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.dop}</td>
                                <td colSpan={5}><button className="btn btn-primary btn-sm" style={{ width: "100px" }} onClick={() => handleEdit(item._id)}>Edit</button><button className="btn btn-danger btn-sm" style={{ width: "100px", marginLeft:"5px" }} onClick={() => handleDelete(item._id)}>Delete</button></td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </main>
        </>
    )
}