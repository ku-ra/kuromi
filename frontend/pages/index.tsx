import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar'
import Header from '../components/header';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Kuromi';
  }, []);

  return (
    <>
      <Header></Header>
      <div className="min-h-full max-w-full mx-auto grid grid-cols-12">
        <div className="col-span-2 h-screen hidden md:block"></div>
        <div className="col-span-3 h-screen mt-14 hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-4 h-screen text-center mt-14">
          <div className="flex h-screen">
            <div className="m-auto">
              <Timeline/>
            </div>
          </div>
        </div>
        <div className="col-span-3 h-screen"></div>
      </div>
    </>
  )
}