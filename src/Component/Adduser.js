import axios from "axios";
import { useState } from "react";
function Adduser(){
    const [checkadduser,setCheckadduser] = useState(false);
    const [userinfo, setUserinfo] = useState();
    const [valueinput,setValueinput] = useState({name:"",article:""})
    function adduser(e){
        e.preventDefault();
        axios.post("https://647aa603d2e5b6101db0781e.mockapi.io/users",{
            name:valueinput.name
        })
        .then(res=>setUserinfo(res.data))
        setCheckadduser(true)
    }

    function addarticle(e){
        e.preventDefault();
        console.log(valueinput.name)
        axios.post(`https://647aa603d2e5b6101db0781e.mockapi.io/users/${userinfo.id}/articles`,{
            article:valueinput.article
        })
    }

    function handleChange(e){
        setValueinput({...valueinput,[e.target.name]:e.target.value})
    }
    return(
        <>
            <div className="row">
                <h2 className="col-6">User Detail</h2>
                <a className="col-6" href="/">Back to Home</a>
            </div>
            <form onSubmit={(e)=>adduser(e)}>
                <label>Name</label><br></br>
                <input onChange={(e)=>handleChange(e)} name="name" value={valueinput.name}></input>
                <button className="btn btn-success" type="submit">{checkadduser ? "Update" : "Add"}</button>
            </form>
            {checkadduser ? 
                <form onSubmit={(e)=>addarticle(e)}>
                    <label>Article</label><br></br>
                    <input onChange={(e)=>handleChange(e)} name="article" value={valueinput.article}></input>
                    <button className="btn btn-success" type="submit">Add</button>
                </form>
            : null}
        </>
    )
}
export default Adduser;