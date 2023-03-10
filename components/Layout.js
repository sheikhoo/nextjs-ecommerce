import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title : 'فروشگاه من'}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white text-black flex min-h-screen flex-col justify-between font-yekan">
        <header>
          <nav className="flex items-center px-4 h-12 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              فروشگاه من
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                سبد خرید
                {cart.cartItems.length > 0 && (
                  <span className="mr-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="p-2">
                ورود
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          footer
        </footer>
      </div>
    </>
  );
}
