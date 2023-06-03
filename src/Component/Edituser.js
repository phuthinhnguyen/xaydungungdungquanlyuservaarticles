function Edituser(){

    function handleChange(e){
        setValueinput({...valueinput,[e.target.name]:e.target.value})
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
export default Edituser;