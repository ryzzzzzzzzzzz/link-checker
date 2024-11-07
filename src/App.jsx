import {Provider} from "./contexts/index";
import Header from "./components/header/Header";
import Textarea from "./components/textarea/Textarea";
import Table from "./components/tables/Table";
import ParticlesComponent from "./components/particles/particles";

const App = () => {

    return (
        <div className='container'>
            <Header/>
            <main>
                <ParticlesComponent id="particles-js" className="hintergrund"/>
                <Provider>
                    <Textarea/>
                    <Table/>
                </Provider>
            </main>
        </div>
    )
}

export default App;
