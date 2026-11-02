import React from 'react';

export default function GalleryPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Media Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <img src="/IMG_20241115_190011777 1.jpg" alt="Gallery Image 1" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <img src="/IMG_9960.jpg" alt="Gallery Image 2" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <video src="/IMG_5419.MOV" controls style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <video src="/IMG_5507.MOV" controls style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
        </div>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <video src="/IMG_5515 (1).MOV" controls style={{ width: '100%', height: '300px', objectFit: 'contain' }} />
        </div>
      </div>
    </div>
  );
}
