'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import styles from './Chatbot.module.css';

const COMMANDS = {
  help: '**Available commands:**\n• `list customers` — Show all customers\n• `add customer` — Go to add customer\n• `invoices` — Open invoice module\n• `help` — Show this menu',
  'list customers': null, // handled dynamically
  'add customer': '__navigate__/dashboard/customers?action=add',
  'invoices': '__navigate__/dashboard/invoice',
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I\'m your CRM assistant. Type `help` to see commands.' }
  ]);
  const [input, setInput] = useState('');
  const router = useRouter();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    setMessages(m => [...m, { from: 'user', text: input }]);
    setInput('');

    if (cmd === 'list customers') {
      try {
        const { data } = await api.get('/customers');
        const list = data.slice(0, 5).map(c => `• ${c.name} (${c.status})`).join('\n');
        setMessages(m => [...m, { from: 'bot', text: `**Recent customers:**\n${list}${data.length > 5 ? `\n...and ${data.length - 5} more` : ''}` }]);
      } catch {
        setMessages(m => [...m, { from: 'bot', text: 'Could not fetch customers.' }]);
      }
      return;
    }

    const response = COMMANDS[cmd];
    if (!response) {
      setMessages(m => [...m, { from: 'bot', text: `Unknown command. Type \`help\` for options.` }]);
      return;
    }
    if (response.startsWith('__navigate__')) {
      const path = response.replace('__navigate__', '');
      setMessages(m => [...m, { from: 'bot', text: `Navigating to ${path.split('/').pop()}...` }]);
      setTimeout(() => router.push(path), 600);
      return;
    }
    setMessages(m => [...m, { from: 'bot', text: response }]);
  };

  return (
    <>
      <button className={styles.fab} onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '◎'}
      </button>
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>CRM Assistant</div>
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${styles[m.from]}`}>
                <span dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>').replace(/\n/g, '<br/>') }} />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className={styles.inputRow}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a command..." />
            <button onClick={send} className={styles.sendBtn}>→</button>
          </div>
        </div>
      )}
    </>
  );
}