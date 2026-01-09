import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
