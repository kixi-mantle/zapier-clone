


const OAuthCallback = () => {
 
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  
  if (code) {
    // 2. Send code to parent window via postMessage
    window.opener.postMessage({
      type: 'AUTH_CODE_RECEIVED',
      code: code
    }, 'http://localhost:5173'); // Parent origin
  
    setTimeout(() => window.close(), 1000);
  }

  return <div>Completing login, please wait...</div>;
};

export default OAuthCallback;