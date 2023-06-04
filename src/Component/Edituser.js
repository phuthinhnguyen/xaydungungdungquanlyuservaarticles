import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Edituser(){
    const {state} = useLocation();
    const [valueinput,setValueinput] = useState(state);
    const [userArticle,setUserArticle] = useState([{article:""}]);
    const [idArticle,setIdArticle] = useState(null)
    
    useEffect(()=>{
        axios.get("https://647aa603d2e5b6101db0781e.mockapi.io/users/" + valueinput.id + "/articles")
        .then(res=>setUserArticle(res.data))
    },[])

    function handleChange(e){
        setValueinput({...valueinput,[e.target.name]:e.target.value})
    }

    function edituser(e){
        e.preventDefault();
        axios.put("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+valueinput.id,{
            name:valueinput.name,
        })
    }

    function addarticle(e){
        e.preventDefault();
        if (idArticle==null){
            axios.post("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+valueinput.id+"/articles",{
                article:valueinput.article
            })
            .then(res=>setUserArticle([...userArticle,res.data]))
            setValueinput({...valueinput,article:""})
        }
        else {
            axios.put("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+valueinput.id+"/articles/"+idArticle,{
                article:valueinput.article
            })
            const userArticleclone = [...userArticle];
            var index = userArticleclone.map(x => {
                return x.id;
              }).indexOf(idArticle);
            userArticleclone[index].article=valueinput.article;
            setUserArticle(userArticleclone)
            setValueinput({...valueinput,article:""})
            setIdArticle(null)
        }
        
    }

    function delarticle(id){
        axios.delete("https://647aa603d2e5b6101db0781e.mockapi.io/users/"+valueinput.id+"/articles/"+id)
        setUserArticle(userArticle.filter(item=>item.id!=id))
    }

    function editarticle(item){
        setValueinput({...valueinput,article:item.article})
        setIdArticle(item.id)
    }
    return(
        <>
            <div className="row">
                <h2 className="col-6">User Detail</h2>
                <a className="col-6" href="/">Back to Home</a>
            </div>
            <form onSubmit={(e)=>edituser(e)}>
                <label>Name</label><br></br>
                <input onChange={(e)=>handleChange(e)} name="name" value={valueinput.name}></input>
                <button className="btn btn-success" type="submit">Update</button>
            </form>
            <form onSubmit={(e)=>addarticle(e)}>
                <label>Article</label><br></br>
                <input onChange={(e)=>handleChange(e)} name="article" value={valueinput.article}></input>
                <button className="btn btn-success" type="submit">{idArticle?"Edit":"Add"}</button>
            </form>

            <table className="table table-striped">
                <thead>
                    <th>Articles</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {userArticle.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.article}</td>
                            <td><button className="btn btn-primary" onClick={()=>editarticle(item)}>Edit</button><button className="btn btn-danger" onClick={()=>delarticle(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Edituser;