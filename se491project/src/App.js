import './App.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const App = () => {
  const projName = "Artificial Intelligence Allergy Detection";

  return (
    <div className="App">
      <h1>{projName}</h1>
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
