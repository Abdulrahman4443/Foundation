import './App.css'
import SettingsForm from './SettingsForm'

function App() {
  return (
    <div className="app-container">
      <h1>User Dashboard</h1>
      <SettingsForm onSubmitSuccess={(data) => console.log('Saved:', data)} />
    </div>
  )
}

export default App
