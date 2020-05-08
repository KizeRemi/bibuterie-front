import React, { useState } from 'react';
import Link from 'next/link'

export const NavBar = ({ loading, user = {}, onClickFacebook, onClickGoogle, onSignOut }) => {
  const [currentMenu, setCurrentMenu] = useState(null);

  const showMenu = (key) => () => {
    if (currentMenu === key) { return setCurrentMenu(null) };

    return setCurrentMenu(key);
  };

  return (
    <nav className="flex tracking-wider items-center justify-between h-16 px-6 flex-wrap border-b border-gray-300 bg-white-300">
      <div class="flex items-center flex-shrink-0 text-gray-700 ml-6 mr-6">
        <Link href="/"><a class="text-xl font-bold">La bibuterie</a></Link>
      </div>
      {loading ? 'loading...' : (
        <>
          <div class="block lg:hidden h-auto">
            <button class="flex items-center px-3 py-2 border rounded text-gray-900 border-teal-400">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">Menu<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div class="w-full h-full block lg:flex flex-grow relative lg:w-auto">
            <div class="flex-col relative text-sm items-center lg:flex-grow h-full">
              <button
                onClick={showMenu('breed-menu')}
                className={`h-full hover:bg-gray-200 tracking-normal ${currentMenu === 'breed-menu' ? 'border-b-2 border-gray-600' : ''} font-semibold lg:inline-block lg:mt-0 text-gray-900 px-4 mr-4`}
              >
                Races de chiens
              </button>
              <div className={`py-2 z-10 ${currentMenu === 'breed-menu' ? 'block' : 'hidden'} bg-white absolute shadow-xl`}>
                <Link href="/dog-breeds">
                  <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Découvrir les races</a>
                </Link>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Quelle race pour mon quotidien ?</a>
              </div>
              <button class="h-full font-semibold tracking-normal overflow-hidden block px-4 lg:inline-block lg:mt-0 text-gray-900 mr-4">
                Balades
              </button>
            </div>
          </div>
          <div className="w-full block lg:flex relative lg:w-auto">
            {user && user.attributes ? (
              <>
                <Link href="/add-farm">
                  <a class="inline-block text-xs px-4 py-2 mr-4 leading-none rounded-full font-bold uppercase border-2 border-gray-300 mt-4 lg:mt-0">
                    Je possède un élevage
                  </a>
                </Link>
                {user.attributes.picture && (
                  <img class="w-10 h-10 rounded-full mr-4" src={user.attributes.picture} alt={`Avatar de ${user.attributes.name}`} />
                )}
                <button
                  className="inline-block text-sm px-4 leading-none border rounded text-black border-black lg:mt-0"
                  onClick={onSignOut}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClickGoogle}
                  class="inline-block text-sm px-4 py-2 mr-4 leading-none rounded-full font-bold text-white bg-red-600 mt-4 lg:mt-0"
                >
                  Google
                </button>
                <button
                  onClick={onClickFacebook}
                  class="inline-block text-sm px-4 py-2 leading-none rounded-full text-white bg-blue-600 mt-4 lg:mt-0"
                >
                  Facebook
                </button>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  )
};

export default NavBar;