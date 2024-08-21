import React from 'react';

const WebView = () => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden', margin: 0 }}>
      <iframe
        src="https://it-sb.github.io/SJ_interface/about.html"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'block'
        }}
        title="About Page"
      />
    </div>
  );
};

export default WebView;
