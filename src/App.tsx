import Game from "./components/Game";
import Header from "./components/Header";
import Rules from "./components/Rules";

function App() {
  return (
    <div className="full-page">
      <Header />
      <section className="main-section">
        <Rules />
        <Game />
      </section>
    </div>
  );
}

export default App;
