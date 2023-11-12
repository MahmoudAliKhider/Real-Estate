import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {signInSuccess} from '../redux/user/userSlice';

export const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },

                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
       
            })
            const data = await res.json()
                dispatch(signInSuccess(data))
                navigate('/')
        }
        catch (error) {
            console.log("Could not sign in with Google", error)
        }
    }
    return (
        <button type="button" onClick={handelGoogleClick} className="bg-red-800 text-white p-3 rounded-lg uppercase hover:opacity-95">
            continue with google</button>
    )
}
