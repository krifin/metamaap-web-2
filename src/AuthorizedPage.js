// import Card from "./Card";
// import {posts} from "./data"


const AuthorizedPage = () => {
    let [nm, setNm] = useState()
    return (
        <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="nm">Name:</label>
        <input
          type="text"
          id="nm"
          name="nm"
          value={nm}
          onChange={setNm(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="">--Select--</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="bannerImg">Banner Image:</label>
        <input
          type="file"
          id="bannerImg"
          name="bannerImg"
          onChange={handleBannerImgChange}
        />
      </div>
      <div>
        <label htmlFor="portfolioImg">Portfolio Image:</label>
        <input
          type="file"
          id="portfolioImg"
          name="portfolioImg"
          onChange={handlePortfolioImgChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    );
}
 
export default AuthorizedPage;