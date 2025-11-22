import Banner from "./Banner";
import News from "./News";
import Recommened from "./Recommened";
import TopSeller from "./TopSeller";

function Home() {
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