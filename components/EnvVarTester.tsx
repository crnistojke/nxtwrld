"use client"

import React from 'react';

export function EnvVarTester() {
  // Preberemo vrednost spremenljivke
  const pubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return (
    <div style={{ 
      backgroundColor: '#111', 
      color: 'white', 
      padding: '1rem', 
      textAlign: 'center', 
      position: 'fixed', 
      top: '0', 
      left: '0', 
      width: '100%', 
      zIndex: 9999,
      borderBottom: '2px solid #f00'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 'bold' }}>DIAGNOSTIC TESTER</h3>
      <p style={{ margin: 0, fontSize: '0.8rem' }}>
        Vrednost za NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY je:
      </p>
      <p style={{ 
        margin: '0.5rem 0 0 0', 
        fontSize: '0.9rem', 
        fontWeight: 'bold', 
        fontFamily: 'monospace',
        backgroundColor: '#333',
        padding: '0.5rem',
        borderRadius: '4px',
        wordBreak: 'break-all'
      }}>
        {pubKey ? pubKey : "NI BILA NAJDENA!"}
      </p>
    </div>
  );
}
