import { useState } from 'react';

export default function SettingsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);

  const saveSettings = () => {
    alert('Settings saved: ' + name + ' ' + email);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Settings</h2>
      <div>
        <span>Name:</span>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <br />
      <div>
        <span>Email:</span>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <br />
      <div>
        <span>Notifications:</span>
        <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
      </div>
      <br />
      <button onClick={saveSettings}>Save</button>
    </div>
  );
}
