import SceneCanvas from "./components/canvas/SceneCanvas";
import PlaneCanvas from "./components/canvas/PlaneCanvas";
import AugustoCanvas from "./components/canvas/AugustoCanvas";
import TheaterCanvas from "./components/canvas/TheaterCanvas";

function App() {
  return (
    <>
      <div>
        <div className="z-0 h-screen w-full mx-auto relative">
          {/* <SceneCanvas /> */}
          <AugustoCanvas />
          {/* <PlaneCanvas /> */}
          {/* <TheaterCanvas /> */}
        </div>
      </div>
    </>
  );
}

export default App;
