import React, { useEffect, useState } from 'react';
import './part2.css' ;

const CollaborativeEditorLanding = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start typing animation when component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);

    // Mouse move effect for particles
    const handleMouseMove = (e) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.02;
        const x = e.clientX * speed;
        const y = e.clientY * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe feature cards after component mounts
    setTimeout(() => {
      document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
      });
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const codeLines = [
    { number: 1, content: <span className="comment">// Real-time collaborative coding</span> },
    { 
      number: 2, 
      content: (
        <>
          <span className="keyword">import</span> {'{'}
          <span className="function">CollaborativeEditor</span>
          {'}'} <span className="keyword">from</span> <span className="string">'@codeflow/core'</span>;
        </>
      )
    },
    { number: 3, content: '' },
    { 
      number: 4, 
      content: (
        <>
          <span className="keyword">const</span> <span className="variable">editor</span> = 
          <span className="keyword">new</span> <span className="function">CollaborativeEditor</span>{'{'}
        </>
      )
    },
    { 
      number: 5, 
      content: (
        <>
          &nbsp;&nbsp;<span className="variable">roomId</span>: <span className="string">'team-project-2024'</span>,
        </>
      )
    },
    { 
      number: 6, 
      content: (
        <>
          &nbsp;&nbsp;<span className="variable">language</span>: <span className="string">'javascript'</span>,
        </>
      )
    },
    { 
      number: 7, 
      content: (
        <>
          &nbsp;&nbsp;<span className="variable">features</span>: [<span className="string">'live-cursors'</span>, 
          <span className="string">'voice-chat'</span>, <span className="string">'git-sync'</span>]
        </>
      )
    },
    { 
      number: 8, 
      content: (
        <>
          {'});'}<span className="cursor"></span>
        </>
      )
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Real-time Collaboration',
      description: 'See changes instantly as your teammates type. Live cursors, syntax highlighting, and conflict resolution keep everyone in sync.'
    },
    {
      icon: '🎯',
      title: 'Smart Code Completion',
      description: 'AI-powered autocomplete that learns from your team\'s coding patterns. Write code faster with intelligent suggestions.'
    },
    {
      icon: '🔗',
      title: 'Git Integration',
      description: 'Seamless version control with built-in Git support. Branch, merge, and deploy directly from the editor.'
    },
    {
      icon: '💬',
      title: 'Integrated Communication',
      description: 'Voice chat, video calls, and inline comments. Discuss code without leaving your development environment.'
    },
    {
      icon: '🚀',
      title: 'One-click Deployment',
      description: 'Deploy to production with a single click. Integrated CI/CD pipeline ensures your code goes live smoothly.'
    },
    {
      icon: '🛡️',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, SSO integration, and compliance with SOC 2, GDPR, and HIPAA standards.'
    }
  ];

  return (
    <div className="landing-page w-full">
     

      {/* Floating particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>


      

      <main>
        <section className="hero">
          <div className="container">
            <h1>Code Together,<br/>Create Together</h1>
            <p>The most intuitive collaborative code editor. Write, debug, and deploy with your team in real-time. Experience the future of collaborative development.</p>
            
            <div className="hero-buttons">
              <a href="#" className="btn-primary">Start Coding Now</a>
              <a href="#" className="btn-secondary">Watch Demo</a>
            </div>

            <div className="editor-demo">
              <div className="editor-window">
                <div className="editor-header">
                  <div className="editor-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <div className="editor-title">collaborative-app.js</div>
                  <div className="collaborators">
                    <div className="collaborator"></div>
                    <div className="collaborator"></div>
                    <div className="collaborator"></div>
                  </div>
                </div>
                <div className="editor-content">
                  {codeLines.map((line, index) => (
                    <div key={index} className="code-line">
                      <span className="line-number">{line.number}</span>
                      <span className="code-text">{line.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <h2>Powerful Features</h2>
            <p className="features-subtitle">Everything you need for seamless collaborative development, from real-time editing to integrated communication.</p>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CollaborativeEditorLanding;