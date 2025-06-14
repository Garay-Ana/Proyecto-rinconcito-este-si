import React from 'react';
import Navigation from './Navigation';

const AppLayout = ({ header, children }) => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rinconcito</title>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          {header && (
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {header}
              </div>
            </header>
          )}
          <main>{children}</main>
        </div>
      </body>
    </>
  );
};

export default AppLayout;
