import { useCallback } from "react";
import Sidebar from "./components/partials/Sidebar";
import Index from "./containers/Index";
import useData from "./hooks/useData";

const App = () => {

  const [selectedMusicId, selectedMusicIdHandler] = useData('');

  return (
    <div className="w-full h-screen flex">
      <Sidebar selectedMusicId={selectedMusicId} selectedMusicIdHandler={selectedMusicIdHandler} />
      <Index selectedMusicId={selectedMusicId} selectedMusicIdHandler={selectedMusicIdHandler} />
    </div>
  );
}

export default App;