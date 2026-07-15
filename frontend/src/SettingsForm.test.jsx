import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsForm from './SettingsForm';
import { expect, test, vi } from 'vitest';

test('renders correctly and validates inputs', async () => {
  const onSubmitSuccess = vi.fn();
  render(<SettingsForm onSubmitSuccess={onSubmitSuccess} />);

  // Check form rendering
  expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /save settings/i });

  // Trigger validation by submitting empty
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  // Fill in valid data
  fireEvent.change(nameInput, { target: { value: 'John' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(onSubmitSuccess).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      notifications: false,
    });
  });
});
