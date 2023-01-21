import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState()
    const [totalUsers, setTotalUsers] = useState()
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        getData()
    }, [activePage])

    const LIMIT = 5
    const totalPageNo = (total, limit) => {
        const pages = []
        for (let x = 1; x <= Math.ceil(parseInt(total) / limit); x++) {
            console.log(x);
            pages.push(x)
        }
        return pages
    }

    const getData = async () => {
        let result = await axios.get('http://localhost:5000/books/', {
            params: {
                page: activePage,
                size: LIMIT
            }
        });
        console.log(result.data);
        setFormData(result.data.books)
        setTotalUsers(result.data.total)
    }

    const handleEdit = (id) => {
        navigate(`/books/${id}`)
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/books/${id}`);
        getData()
    }

    const handleSearch = async (e) => {
        let key = e.target.value
        if (key) {
            let result = await axios.get(`http://localhost:5000/books/search/${key}`);
            console.log(result.data);
            if (result.data) {
                setFormData(result.data)
            }
        }
        else {
            getData()
        }

    }

    return (
        <>
            <main>
                <input type="text" className="form-control" placeholder="Search Book" style={{ width: "900px", margin: "25px 0" }} onChange={handleSearch} />
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
                                <td colSpan={5}><button className="btn btn-primary btn-sm" style={{ width: "100px" }} onClick={() => handleEdit(item._id)}>Edit</button><button className="btn btn-danger btn-sm" style={{ width: "100px", marginLeft: "5px" }} onClick={() => handleDelete(item._id)}>Delete</button></td>
                            </tr>
                        })}

                    </tbody>
                </table>
                <ul className="pagination">
                    {activePage !== 1 && <li className="page-item" onClick={() => setActivePage(activePage - 1)}><a className="page-link" href="#">Previous</a></li>}
                    {totalPageNo(totalUsers, LIMIT).map((pageNo) => <li className={`page-item ${pageNo === activePage ? 'active' : ''}`} key={pageNo} onClick={() => setActivePage(pageNo)}><a className="page-link" href="#">{pageNo}</a></li>
                    )}
                    {activePage !== Math.ceil(totalUsers / LIMIT) && <li className="page-item" onClick={() => setActivePage(activePage + 1)}><a className="page-link" href="#">Next</a></li>}
                </ul>
            </main>
        </>
    )
}