import Table from "../components/TableWithLazy";
import { useEffect, useState } from "react";
import axios from "axios";
import TableWithLazy from "../components/TableWithLazy";
import TableWithPagination from "../components/TableWithPagination";

function Dashboard() {

    const [postsList, setPostsList] = useState([])

    const getPosts = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => {
                setPostsList(response.data)
            })
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div>
            <TableWithLazy
                postsList={postsList}
            />
            <TableWithPagination
                postsList={postsList}
            />
        </div>
    );
}

export default Dashboard;
