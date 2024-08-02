import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"

const ProfileHead = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const username = user ? user.email.split("@")[0] : "Profile Name"

    const handleLogout = () => {
        logout()
      }

    return (
        <div>
            <div className="profile_head">
                <span><img src="/assets/images/icon.jpg"  alt="profile pic"/> </span>
                <div className="profile_head_options">
                    <span><h1>{user ? <div>{username}</div> : 'Name'}</h1></span>
                    <span><button onClick={handleLogout}><h3>Logout</h3></button></span>
                </div>
            </div>
        </div>
    )
}

export default ProfileHead