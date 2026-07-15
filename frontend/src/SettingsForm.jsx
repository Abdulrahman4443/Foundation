 round-two-precise
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  notifications: z.boolean().default(false),
});

export default function SettingsForm({ onSubmitSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      notifications: false,
    },
  });

  const onSubmit = async (data) => {
   
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    } else {
      console.log('Settings saved:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="form-heading" noValidate className="settings-form">
      <h2 id="form-heading">Settings</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="error-message" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="error-message" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group checkbox-group">
        <label htmlFor="notifications">
          <input
            id="notifications"
            type="checkbox"
            {...register('notifications')}
          />
          Enable Notifications
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Settings'}
      </button>
    </form>

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
 main
  );
}
