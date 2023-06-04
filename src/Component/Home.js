import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home(){
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("https://647aa603d2e5b6101db0781e.mockapi.io/users")
        .then(res=>setUsers(res.data))
        .catch(err=>console.log(err))
    })

    function adduserbuttonclick(){
        navigate("/adduser");
    }

    function deluser(id){
        axios.delete("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+id)
        // axios.delete("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+id+"/articles")
    }

    function edituser(item){
        navigate("/edituser",{state:item});
    }
    return(
        <>
            <div className="row">
                <h2 className="col-6">Users</h2>
                <button className="btn btn-success col-2" onClick={adduserbuttonclick}>Add User</button>
            </div>
            <table className="table table-striped">
                <thead className="text-center">
                    <th>Name</th>
                    <th>Actions</th>
                </thead>
                <tbody className="text-center">
                    {users.map((item,index)=>
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td><button className="btn btn-primary" onClick={()=>edituser(item)}>Edit</button><button className="btn btn-danger" onClick={()=>deluser(item.id)}>Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
          
        </>
    )
}
export default Home;