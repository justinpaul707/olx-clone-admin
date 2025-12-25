import React, { useState, useEffect } from 'react';
import { apiDebugger } from '@app/utils/apiDebugger';

const chipColor = (status: string) => {
  if (status === 'success') return '#4caf50';
  if (status === 'error') return '#f44336';
  return '#bdbdbd';
};

const ApiDebugPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [calls, setCalls] = useState(apiDebugger.getCalls());

  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(apiDebugger.getCalls());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: 400,
        fontFamily: 'sans-serif',
      }}
    >
      <button
        style={{
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '6px 12px',
          fontSize: 14,
          cursor: 'pointer',
          marginBottom: 8,
        }}
        onClick={() => setOpen(!open)}
      >
        API Calls ({calls.length}) {open ? '▼' : '▲'}
      </button>

      <div
        style={{
          transition: 'max-height 0.3s',
          overflow: 'hidden',
          maxHeight: open ? 500 : 0,
        }}
      >
        <div
          style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            padding: 16,
            maxHeight: 400,
            overflow: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 18 }}>API Debug Panel</span>
            <button
              style={{
                background: '#eee',
                color: '#333',
                border: 'none',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 12,
                cursor: 'pointer',
              }}
              onClick={() => {
                apiDebugger.clearCalls();
                setCalls([]);
              }}
            >
              Clear
            </button>
          </div>

          {calls.length === 0 ? (
            <div style={{ color: '#888', fontSize: 14 }}>No API calls yet</div>
          ) : (
            calls.map((call) => (
              <div
                key={call.id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 6,
                  padding: 8,
                  marginBottom: 8,
                  fontSize: 13,
                  background: '#fafafa',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{call.method}</span>
                  <span
                    style={{
                      background: chipColor(call.status),
                      color: '#fff',
                      borderRadius: 12,
                      padding: '2px 10px',
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    {call.status}
                  </span>
                  <span style={{ fontSize: 11, color: '#888' }}>
                    {new Date(call.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <details>
                  <summary style={{ cursor: 'pointer', marginBottom: 4, fontSize: 12 }}>
                    Request Data
                  </summary>
                  <pre
                    style={{
                      fontSize: 10,
                      background: '#f5f5f5',
                      padding: 4,
                      borderRadius: 4,
                      overflow: 'auto',
                      maxHeight: 100,
                    }}
                  >
                    {JSON.stringify(call.data, null, 2)}
                  </pre>
                </details>

                {call.response && (
                  <details>
                    <summary
                      style={{
                        cursor: 'pointer',
                        marginBottom: 4,
                        fontSize: 12,
                        color: '#388e3c',
                      }}
                    >
                      Response
                    </summary>
                    <pre
                      style={{
                        fontSize: 10,
                        background: '#e8f5e8',
                        padding: 4,
                        borderRadius: 4,
                        overflow: 'auto',
                        maxHeight: 100,
                      }}
                    >
                      {JSON.stringify(call.response, null, 2)}
                    </pre>
                  </details>
                )}

                {call.error && (
                  <details>
                    <summary
                      style={{
                        cursor: 'pointer',
                        marginBottom: 4,
                        fontSize: 12,
                        color: '#d32f2f',
                      }}
                    >
                      Error
                    </summary>
                    <pre
                      style={{
                        fontSize: 10,
                        background: '#ffeaea',
                        padding: 4,
                        borderRadius: 4,
                        overflow: 'auto',
                        maxHeight: 100,
                      }}
                    >
                      {JSON.stringify(call.error, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDebugPanel;
