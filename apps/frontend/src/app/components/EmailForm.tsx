// apps/frontend/src/components/EmailForm.tsx
import React, { useState, FormEvent } from 'react';

const EmailForm: React.FC = () => {
  const [to, setTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, body }),
      });
      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error: unknown) {
      alert('Error: ' + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>To:</label>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
