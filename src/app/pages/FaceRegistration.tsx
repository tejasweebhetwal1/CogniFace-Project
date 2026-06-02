import { useState } from 'react';

export default function FaceRegistration() {
  const [step, setStep] = useState(1);
  const [capturing, setCapturing] = useState(false);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-10"
      style={{ background: 'var(--bg-base)' }}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { num: 1, label: 'Instructions' },
            { num: 2, label: 'Capture' },
            { num: 3, label: 'Verify' },
            { num: 4, label: 'Complete' }
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s.num ? 'text-white' : ''
                }`}
                  style={{ 
                    background: step >= s.num ? 'var(--primary)' : 'var(--bg-raised)',
                    color: step >= s.num ? '#fff' : 'var(--text-tertiary)',
                    border: `2px solid ${step >= s.num ? 'var(--primary)' : 'var(--border)'}`,
                    boxShadow: step === s.num ? 'var(--shadow-md)' : 'none'
                  }}>
                  {s.num}
                </div>
                <span className="text-xs font-semibold whitespace-nowrap"
                  style={{ color: step >= s.num ? 'var(--primary)' : 'var(--text-tertiary)' }}>
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <div className="w-16 h-0.5 mt-[-20px]"
                  style={{ background: step > s.num ? 'var(--primary)' : 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ 
            background: 'var(--bg-surface)', 
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow-xl)'
          }}>
          
          {step === 1 && (
            <div className="p-10">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">📷</div>
                <h2 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Face Registration
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Register your face for automated attendance recognition
                </p>
              </div>

              <div className="p-6 rounded-xl mb-6"
                style={{ background: 'var(--info-bg)', border: `1px solid var(--info-border)` }}>
                <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--info)' }}>
                  <span>ℹ️</span>
                  Before you begin
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--info)' }}>•</span>
                    <span>Ensure you're in a well-lit environment with good lighting on your face</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--info)' }}>•</span>
                    <span>Remove any accessories that may obstruct your face (hats, sunglasses, masks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--info)' }}>•</span>
                    <span>Position yourself directly in front of the camera with a neutral background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--info)' }}>•</span>
                    <span>Look directly at the camera and maintain a neutral expression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: 'var(--info)' }}>•</span>
                    <span>We'll capture multiple angles for accuracy (front, left, right)</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl mb-6"
                style={{ background: 'var(--success-bg)', border: `1px solid var(--success-border)` }}>
                <h3 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--success)' }}>
                  <span>🔒</span>
                  Privacy & Security
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Your facial data is encrypted before storage and used exclusively for attendance verification. 
                  We comply with GDPR and institutional data protection policies.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                  onClick={() => setStep(2)}>
                  Continue to Capture →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-10">
              <div className="text-center mb-6">
                <h2 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Capture Your Face
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Position your face within the frame and follow the instructions
                </p>
              </div>

              {/* Camera Feed */}
              <div className="relative rounded-xl overflow-hidden border mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                  borderColor: 'var(--border)',
                  aspectRatio: '4/3'
                }}>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px),
                                     linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />

                {/* Face detection frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative rounded-full border-4 transition-all"
                    style={{ 
                      width: '280px',
                      height: '350px',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      borderColor: capturing ? 'var(--success)' : 'var(--primary)',
                      boxShadow: capturing ? '0 0 30px rgba(5, 150, 105, 0.4)' : '0 0 30px rgba(30, 58, 138, 0.3)',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(2px)'
                    }}>
                    {/* Corner markers */}
                    {['top-0 left-8', 'top-0 right-8', 'bottom-0 left-8', 'bottom-0 right-8'].map((pos, i) => (
                      <div key={i} className={`absolute w-6 h-6 ${pos}`}
                        style={{ 
                          borderColor: capturing ? 'var(--success)' : 'var(--primary)',
                          borderWidth: '3px'
                        }} />
                    ))}

                    {/* Status indicator */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full font-semibold whitespace-nowrap"
                      style={{ 
                        background: capturing ? 'var(--success)' : 'var(--primary)',
                        color: '#fff',
                        boxShadow: 'var(--shadow-md)'
                      }}>
                      {capturing ? '✓ Face Detected' : '👤 Position Your Face'}
                    </div>
                  </div>
                </div>

                {/* Scan line animation */}
                {capturing && (
                  <div className="absolute left-0 right-0 h-1"
                    style={{
                      background: 'linear-gradient(90deg, transparent, var(--success), transparent)',
                      animation: 'scan 2s linear infinite'
                    }} />
                )}
              </div>

              {/* Capture Progress */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Front View', status: 'completed', icon: '✓' },
                  { label: 'Left Profile', status: 'current', icon: '📷' },
                  { label: 'Right Profile', status: 'pending', icon: '⏳' }
                ].map((view, i) => (
                  <div key={i} className="p-4 rounded-lg border text-center"
                    style={{ 
                      background: view.status === 'completed' ? 'var(--success-bg)' : 
                                  view.status === 'current' ? 'var(--primary-lighter)' : 'var(--bg-raised)',
                      borderColor: view.status === 'completed' ? 'var(--success-border)' : 
                                   view.status === 'current' ? 'var(--primary)' : 'var(--border)'
                    }}>
                    <div className="text-2xl mb-2">{view.icon}</div>
                    <div className="text-sm font-semibold"
                      style={{ 
                        color: view.status === 'completed' ? 'var(--success)' : 
                               view.status === 'current' ? 'var(--primary)' : 'var(--text-tertiary)'
                      }}>
                      {view.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                  onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="flex-1 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                  onClick={() => {
                    setCapturing(true);
                    setTimeout(() => setStep(3), 2000);
                  }}>
                  {capturing ? 'Capturing...' : 'Capture Photo'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-10">
              <div className="text-center mb-8">
                <h2 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Verify Your Captures
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Review the captured images before finalizing
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5 mb-8">
                {['Front View', 'Left Profile', 'Right Profile'].map((label, i) => (
                  <div key={i} className="rounded-xl border overflow-hidden"
                    style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}>
                    <div className="aspect-[3/4] flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)' }}>
                      <div className="text-6xl opacity-50">👤</div>
                    </div>
                    <div className="p-3 text-center border-t" style={{ borderColor: 'var(--border)' }}>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {label}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--success)' }}>
                        ✓ Quality: Excellent
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl mb-6"
                style={{ background: 'var(--success-bg)', border: `1px solid var(--success-border)` }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: 'var(--success)' }}>
                      All captures verified successfully
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Image quality and face detection scores meet requirements. Ready to proceed.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3.5 rounded-lg font-semibold border transition-all"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                  onClick={() => setStep(2)}>
                  ← Retake
                </button>
                <button className="flex-1 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
                  style={{ background: 'var(--primary)', color: '#fff' }}
                  onClick={() => setStep(4)}>
                  Confirm & Register →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-10 text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                style={{ background: 'var(--success-bg)' }}>
                ✓
              </div>
              <h2 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Registration Complete!
              </h2>
              <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
                Your face has been successfully registered. You can now use automated attendance.
              </p>

              <div className="p-6 rounded-xl mb-8"
                style={{ background: 'var(--bg-raised)', border: `1px solid var(--border)` }}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      Student ID
                    </div>
                    <div className="font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      S001
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      Registration Date
                    </div>
                    <div className="font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      05 Mar 2026
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      Confidence Score
                    </div>
                    <div className="font-bold" style={{ color: 'var(--success)' }}>
                      98.7%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      Status
                    </div>
                    <div className="inline-flex px-3 py-1 rounded-full text-sm font-semibold"
                      style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                      Active
                    </div>
                  </div>
                </div>
              </div>

              <button className="px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
                style={{ background: 'var(--primary)', color: '#fff' }}>
                Go to Dashboard →
              </button>
              
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          from { top: 0; }
          to { top: 100%; }
        }
      `}</style>
    </div>
  );
}
