import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 50%, #D54826 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1400px' }}>
        <div
          style={{
            width: '100%',
            borderRadius: '32px',
            overflow: 'hidden',
            background: '#ffffff',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: window.innerWidth < 900 ? 'column' : 'row',
            minHeight: window.innerWidth < 900 ? 'auto' : '600px',
          }}
        >
          {/* Left Side - Illustration */}
          <div
            style={{
              flex: window.innerWidth < 900 ? 'none' : '1 1 50%',
              background: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)',
              color: 'white',
              padding: window.innerWidth < 900 ? '32px' : '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* 404 Illustration */}
              <div
                style={{
                  marginBottom: '32px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: window.innerWidth < 900 ? '200px' : '250px',
                    height: window.innerWidth < 900 ? '150px' : '180px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '30%',
                      top: '30%',
                      fontSize: window.innerWidth < 900 ? '60px' : '80px',
                    }}
                  >
                    🔍
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      right: '20%',
                      bottom: '20%',
                      fontSize: window.innerWidth < 900 ? '40px' : '50px',
                    }}
                  >
                    📦
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      left: '10%',
                      top: '20%',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#FFD700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}
                  >
                    ❌
                  </span>
                </div>
              </div>
              <h1
                style={{
                  fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
                  letterSpacing: '0.5px',
                  fontSize: window.innerWidth < 600 ? '2rem' : window.innerWidth < 1200 ? '2.5rem' : '3rem',
                  marginBottom: '16px',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Oops! Page Lost
              </h1>
              <div
                style={{
                  opacity: 0.9,
                  fontFamily: 'Poppins, Arial, sans-serif',
                  fontSize: window.innerWidth < 900 ? '1rem' : '1.25rem',
                  marginBottom: '32px',
                  maxWidth: '400px',
                  color: 'white',
                }}
              >
                The page you're looking for seems to have wandered off
              </div>
            </div>
          </div>

          {/* Right Side - 404 Content */}
          <div
            style={{
              flex: window.innerWidth < 900 ? 'none' : '1 1 50%',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
            }}
          >
            <div
              style={{
                padding: window.innerWidth < 600 ? '32px' : window.innerWidth < 900 ? '40px' : window.innerWidth < 1200 ? '48px' : '64px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                minHeight: window.innerWidth < 900 ? 'auto' : '500px',
              }}
            >
              <div
                style={{
                  marginBottom: '32px',
                  padding: window.innerWidth < 900 ? '16px' : '24px',
                  textAlign: 'center',
                }}
              >
                {/* Large 404 */}
                <div
                  style={{
                    fontSize: window.innerWidth < 600 ? '4rem' : window.innerWidth < 900 ? '5rem' : '6rem',
                    fontWeight: 'bold',
                    color: '#FF6B35',
                    marginBottom: '16px',
                    fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
                  }}
                >
                  404
                </div>
                <h2
                  style={{
                    fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
                    color: '#333333',
                    letterSpacing: '0.2px',
                    fontSize: window.innerWidth < 600 ? '1.5rem' : window.innerWidth < 900 ? '1.75rem' : '2rem',
                    textAlign: 'center',
                    fontWeight: 600,
                    marginBottom: '8px',
                  }}
                >
                  Page Not Found
                </h2>
                <div
                  style={{
                    fontFamily: 'Poppins, Arial, sans-serif',
                    fontSize: window.innerWidth < 600 ? '0.875rem' : '1rem',
                    textAlign: 'center',
                    color: '#666666',
                    marginBottom: '32px',
                  }}
                >
                  The page you're looking for doesn't exist or has been moved
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  maxWidth: window.innerWidth < 600 ? '100%' : '400px',
                  margin: '0 auto',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 0',
                      borderRadius: '16px',
                      background: '#FF6B35',
                      color: '#fff',
                      fontFamily: 'Poppins, Arial, sans-serif',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#E55A2B')}
                    onMouseOut={e => (e.currentTarget.style.background = '#FF6B35')}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <svg width="24" height="24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                    </span>
                    Go to Homepage
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <div
                  style={{
                    fontFamily: 'Poppins, Arial, sans-serif',
                    fontSize: window.innerWidth < 600 ? '0.875rem' : '1rem',
                    color: '#666',
                    marginBottom: '8px',
                  }}
                >
                  Looking for something specific?
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '24px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    to="/categories"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontFamily: 'Poppins, Arial, sans-serif',
                      fontSize: '1rem',
                    }}
                  >
                    View Categories
                  </Link>
                  <span style={{ color: '#888' }}>•</span>
                  <Link
                    to="/help"
                    style={{
                      color: '#666',
                      textDecoration: 'none',
                      fontFamily: 'Poppins, Arial, sans-serif',
                      fontSize: '1rem',
                    }}
                  >
                    Get Help
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  background: '#f8f9fa',
                  padding: window.innerWidth < 600 ? '16px' : '24px',
                  textAlign: 'center',
                  borderTop: '1px solid #e9ecef',
                  marginTop: 'auto',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Poppins, Arial, sans-serif',
                    fontSize: window.innerWidth < 600 ? '0.75rem' : '0.875rem',
                    color: '#888',
                  }}
                >
                  Still can't find what you're looking for?{' '}
                  <Link
                    to="/contact"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                    }}
                  >
                    Contact Support
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;