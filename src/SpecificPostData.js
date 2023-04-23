import { useLocation } from "react-router";
import { posts } from "./data";

const SpecificPostData = () => {
  //this location object has the pathname property indicating the actual path of the specific post
  const location = useLocation();
  // console.log(location);

  const path = location.pathname.split("/")[2];

  const post = posts.find((p) => p.id.toString() === path);

  
  return (
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
    </div>
  );
};

export default SpecificPostData;