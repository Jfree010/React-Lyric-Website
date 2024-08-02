import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    // const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    // const toSignup = () => {
    //     navigate('/signup')
    // }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value = {email}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value = {password}
            />
            <button disabled={isLoading}>Login</button>
            <p>No account? Click to <Link to="/signup" className="globalLink log_sign">signup here.</Link></p>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login