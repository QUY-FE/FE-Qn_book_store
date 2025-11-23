import Banner from "./Banner";
import News from "./News";
import Recommened from "./Recommened";
import TopSeller from "./TopSeller";

function Home() {
    const API = import.meta.env.VITE_API_KEY
    console.log({
        API
    })
    return ( 
        <div>
            <Banner/>
            <TopSeller />
            <Recommened />
            <News/>
        </div>
     );
}

export default Home;