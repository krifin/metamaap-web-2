import Card from "./Card";
import {posts} from "./data"

const AuthorizedPage = () => {
    return (
        <div className="auth_page">
            {posts.map(post=>(
                <Card key={post.id} post={post}/>
            ))}
        </div>
    );
}
 
export default AuthorizedPage;