import { Link } from "react-router-dom";

const Home = ()=> {
    return (
      <div>
        <h1>This is Home Page.</h1>
        <Link to='/tetris'>
          <button>Play Game</button>
        </Link>
      </div>
    );
}

export default Home;