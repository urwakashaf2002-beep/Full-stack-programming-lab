import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'NexCRM — Customer Intelligence Platform',
  description: 'Professional CRM System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f1623',
              color: '#e8dcc8',
              border: '1px solid #2a3347',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#d4a843', secondary: '#0f1623' } },
            error: { iconTheme: { primary: '#e05c5c', secondary: '#0f1623' } },
          }}
        />
        {children}
      </body>
    </html>
  );
}