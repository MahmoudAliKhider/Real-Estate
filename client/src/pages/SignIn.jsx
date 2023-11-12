import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handelSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message)
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handelChange}></input>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handelChange}></input>

        <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
           {
            loading ? "loading.." :"sign In"
           }
           </button>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
