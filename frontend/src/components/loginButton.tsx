// LoginButton.jsx
import {  useCallback, useEffect, useRef, useState } from 'react';
import {type UserInfo} from '../../types' 
const LoginButton = () => {
const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  
  // Use a ref to track if we've already processed a message
  const hasProcessedMessage = useRef(false);

  const messageHandler = useCallback(async (event: MessageEvent) => {

    console.log("message received", event.data);
    
    // Check origin
    if (event.origin !== 'http://localhost:5173') return;

    // IMPORTANT: Prevent processing duplicate messages
    if (hasProcessedMessage.current) {
      console.log("Already processed a message, ignoring duplicate");
      return;
    }

    if (event.data.type === 'AUTH_CODE_RECEIVED') {
      // Mark as processed immediately to prevent duplicate handling
      hasProcessedMessage.current = true;
      
      console.log("Processing auth code:", event.data.code);
      
      try {
        const userInfo = await fetch(`http://localhost:3000/auth/callback?code=${event.data.code}`);
        const userData = await userInfo.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert('Failed to get user info. Please try again.');
      } finally {
        setIsLoading(false);
      }

    } else if (event.data.type === 'AUTH_ERROR') {
      hasProcessedMessage.current = true;
      setIsLoading(false);
      alert('Login failed. Please try again.');
    }

    // Clean up event listener
    window.removeEventListener('message', messageHandler);
  }, []);

  // Reset the ref when component unmounts or when user logs out
  useEffect(() => {
    return () => {
      hasProcessedMessage.current = false;
    };
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Reset the processed flag for new login attempt
    hasProcessedMessage.current = false;
    
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const popup = window.open(
      'http://localhost:3000/auth/signin',
      'Google Sign-In',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    window.addEventListener('message', messageHandler);

    if (!popup || popup.closed) {
      alert('Popup was blocked. Please allow popups for this site.');
      setIsLoading(false);
      window.removeEventListener('message', messageHandler);
      return;
    }

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', messageHandler);
        setIsLoading(false);
        // Reset the processed flag if popup closed without completing
        hasProcessedMessage.current = false;
      }
    }, 500);
  };

  
  

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      {user ? (
        // Logged in state
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
         
          <h2>Welcome, {user.name}!</h2>
          <p style={{ color: '#666' }}>Email: {user.email}</p>
         
        </div>
      ) : (
        // Logged out state - show login button
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: isLoading ? '#ccc' : '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {isLoading ? (
            'Opening...'
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default LoginButton;