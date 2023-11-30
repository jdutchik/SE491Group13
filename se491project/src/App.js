import './App.css';
import SignAndLogin from './components/SignAndLogin/SignAndLogin';

const App = () => {
  const projName = "Artificial Intelligence Allergy Detection";

  return (
    <div className="App">
      <h1>{projName}</h1>
      <SignAndLogin />
    </div>
  );
}

export default App;
