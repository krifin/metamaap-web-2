import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {

    //_self means to open in the same page
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/galaxy2">
          Metamaap  
        </Link>
      </span>
      {user ? (
        <ul className="list">
          
          <li className="listItem" style={{marginRight: "20",
  fontWeight: 500}}>
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <Link className="link" to="/dashboard" style={{textDecoration: "none"}}>
          <li className="listItem">{user.displayName}</li>
          </Link>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;