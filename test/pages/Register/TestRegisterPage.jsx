import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './RegisterPage'; // Adjust the import based on your file structure
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import { useAuth } from '../../hooks/useAuth'; // Mocking the custom hook

// Mock the custom hook 'useAuth'
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null, // Default to no user logged in for the tests
    register: jest.fn().mockResolvedValue({}), // Mocking register function
  }),
}));

// Wrapping the component with Router to handle routing
const Wrapper = ({ children }) => <Router>{children}</Router>;

describe('RegisterPage', () => {
  // Test if the RegisterPage renders correctly
  test('should render Register page with necessary elements', () => {
    render(<RegisterPage />, { wrapper: Wrapper });
    
    // Check if Title is rendered
    expect(screen.getByText('Register')).toBeInTheDocument();
    
    // Check if form fields are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    
    // Check if the register button is present
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  // Test form submission
  test('should call register function on form submit', async () => {
    render(<RegisterPage />, { wrapper: Wrapper });

    // Fill in the form with valid data
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '1234 Main St' } });

    fireEvent.click(screen.getByText('Register'));

    // Wait for async function to complete and check if the register function was called
    await waitFor(() => expect(useAuth().register).toHaveBeenCalledTimes(1));
  });

  // Test input validation - Email Validation
  test('should show an error message if email is invalid', async () => {
    render(<RegisterPage />, { wrapper: Wrapper });

    // Fill in the email with invalid value
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Check if the error message is displayed
    await waitFor(() => expect(screen.getByText('Email Is Not Valid')).toBeInTheDocument());
  });

  // Test password match validation
  test('should show an error if passwords do not match', async () => {
    render(<RegisterPage />, { wrapper: Wrapper });

    // Fill in password fields with different values
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });

    // Submit the form
    fireEvent.click(screen.getByText('Register'));

    // Check if the error message is displayed
    await waitFor(() => expect(screen.getByText('Passwords Do No Match')).toBeInTheDocument());
  });

  // Test if the navigation works after successful registration
  test('should redirect to home page or return URL if user is registered', async () => {
    const mockNavigate = jest.fn(); // Mock the navigate function
    render(<RegisterPage />, { wrapper: Wrapper });
    
    // Assuming user is registered successfully
    useAuth().user = { id: 1, name: 'John' };  // Mock user

    // Trigger the useEffect by submitting the form
    fireEvent.click(screen.getByText('Register'));
    
    // Wait for navigation to be called
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  });
});
