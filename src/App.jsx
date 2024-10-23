import {Provider} from "./contexts/index";
import Header from "./components/header/Header";
import Textarea from "./components/textarea/Textarea";
import Table from "./components/tables/Table";

const App = () => {

    return (
        <div className='container'>
            <Header/>
            <main>
                <Provider>
                    <Textarea/>
                    <Table/>
                </Provider>
            </main>
        </div>
    )
}

export default App;
