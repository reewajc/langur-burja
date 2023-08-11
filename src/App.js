import './App.css';
import DiceGrid from './components/DiceGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
    <h1>Nepali Dice</h1>
     {/* <Form/> */}
     {/* <ImageGrid/> */}
     <DiceGrid/>
     <Footer/>
  </div>
  );
}

export default App;
