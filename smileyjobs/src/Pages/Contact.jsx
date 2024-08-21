import React from 'react';

const WebView = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://it-sb.github.io/SJ_interface/contact.html"
        style={{ border: 'none', width: '100%', height: '100%' }}
        title="About Page"
      />
    </div>
  );
};

export default WebView;
