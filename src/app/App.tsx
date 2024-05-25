import {Routes} from "./routes";
import {TarefasProvider} from "./shared/contexts";

export const App = () => {
    return (
        <TarefasProvider>
            <Routes/>
        </TarefasProvider>
    );
}