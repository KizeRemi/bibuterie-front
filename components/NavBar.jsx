import React, { useState } from 'react';
import Link from 'next/link'
import { FacebookOption, Google } from 'grommet-icons';

export const NavBar = ({ loading, user = {}, onClickFacebook, onClickGoogle, onSignOut }) => {
  const [displayNav, setDisplayNav] = useState(false);
  const [displayNavProfile, setDisplayProfileNav] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);

  const showMenu = (key) => () => {
    if (currentMenu === key) { return setCurrentMenu(null) };

    return setCurrentMenu(key);
  };

  return (
    <>
      <nav className="flex tracking-wider items-center justify-between h-16 px-6 flex-wrap border-b border-gray-300 bg-white-300">
        <button
          onClick={() => {
            setDisplayNav(!displayNav);
            setDisplayProfileNav(false);
          }}
          className="block lg:hidden flex items-center"
          type="button"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
        <div class="mx-0 md:mx-6 flex-1 md:flex-none flex justify-center items-center flex-shrink-0 text-gray-700">
          <Link href="/"><a class="text-xl font-bold">La bibuterie</a></Link>
        </div>
        <>
          <div class="hidden lg:flex w-full h-full flex-grow relative lg:w-auto">
            <div class="block lg:hidden h-auto">
              <button class="flex items-center px-3 py-2 border rounded text-gray-900 border-teal-400">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">Menu<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
              </button>
            </div>
            <div class="flex-col relative text-sm items-center lg:flex-grow h-full">
              <Link href="/dog-classifieds-listing">
                <button
                  className={`h-full block hover:bg-gray-200 tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900 px-4 mr-4`}
                  >
                  Annonces
                </button>
              </Link>
              <button
                onClick={showMenu('breed-menu')}
                className={`h-full hover:bg-gray-200 tracking-normal ${currentMenu === 'breed-menu' ? 'border-b-2 border-pink-900' : ''} font-semibold lg:inline-block lg:mt-0 text-gray-900 px-4 mr-4`}
              >
                Races de chiens
              </button>
              <div className={`py-2 z-10 ${currentMenu === 'breed-menu' ? 'block' : 'hidden'} bg-white absolute shadow-xl`}>
                <Link href="/dog-breeds">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Découvrir les races</a>
                </Link>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Quelle race pour mon quotidien ?</a>
              </div>
              <Link href="/app-walking">
                <button class="h-full font-semibold tracking-normal overflow-hidden block px-4 lg:inline-block lg:mt-0 text-gray-900 mr-4">
                  Balades
                </button>
              </Link>
            </div>
          </div>
          {user && user.attributes ? (
            <>
              <div className="hidden lg:block w-full block lg:flex relative lg:w-auto">
                <Link href="/add-classified">
                  <a class="gradient inline-block text-white text-xs flex items-center px-4 py-2 mr-4 leading-none rounded-full font-bold uppercase mt-4 lg:mt-0">
                    Publier une annonce
                  </a>
                </Link>
              </div>
              {user.attributes.picture && (
                <div className="relative h-full text-sm">
                  <div className="h-full flex items-center" onClick={() => {
                    setDisplayNav(false);
                    setDisplayProfileNav(!displayNavProfile);
                  }}>
                    <img
                      className="block w-8 h-8 rounded-full mx-0 lg:mx-1"
                      src={user.attributes.picture}
                      alt={`Avatar de ${user.attributes.name}`}
                    />
                    <svg transform={`${displayNavProfile ? 'rotate(180)' : ''}`} className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                  <div className={`hidden ${displayNavProfile ? 'lg:block' : 'hidden'} py-2 px-4 z-10 w-64 right-0 bg-white absolute shadow-xl`}>
                    <a
                      href="#"
                      className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
                    >
                      Mon profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
                    >
                      Ma messagerie
                    </a>
                    <a
                      href="#"
                      className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
                    >
                      Mes annonces favorites
                    </a>
                    <Link href="/add-farm">
                      <a class="bg-gray-800 inline-block text-white text-xs flex items-center mt-4 mb-2 px-4 py-2 leading-none rounded-full font-bold uppercase">
                        Je suis un professionel
                      </a>
                    </Link>
                    <button
                      className="inline-block mt-4 text-red-600 border-t border-gray-400 text-left w-full text-sm py-3 leading-none text-black border-black"
                      onClick={onSignOut}
                    >
                      Me déconnecter
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="block lg:flex relative lg:w-auto">
              <button
                onClick={onClickGoogle}
                class="inline-block text-sm px-1 py-1 mx-1 mr-2 leading-none rounded-full text-white bg-red-600 lg:mt-0"
              >
                <Google size="medium" color="#ffffff" />
              </button>
              <button
                onClick={onClickFacebook}
                class="inline-block text-sm px-1 py-1 leading-none rounded-full text-white bg-blue-600 lg:mt-0"
              >
                <FacebookOption size="medium" color="#ffffff" />
              </button>
            </div>
          )}
        </>
      </nav>
      {displayNav && (
        <nav className="block lg:hidden flex items-center justify-between px-6 flex-wrap border-b border-gray-300 bg-white-300">
          <Link href="/dog-classifieds-listing">
            <a className="flex items-center h-12 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900">
              Annonces
            </a>
          </Link>
          <button
            onClick={showMenu('breed-menu')}
            className={`flex w-full items-center h-12 tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900`}
          >
            <span>Races de chiens</span>
            <svg transform={`${currentMenu === 'breed-menu' ? 'rotate(180)' : ''}`} className="fill-current ml-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </button>
          <div className={`${currentMenu === 'breed-menu' ? 'block' : 'hidden'}`}>
            <Link href="/dog-breeds">
              <a href="#" class="block px-4 py-2 text-gray-800">Découvrir les races</a>
            </Link>
            <a href="#" class="block px-4 py-2 text-gray-800">Quelle race pour mon quotidien ?</a>
          </div>
          <Link href="/app-walking">
            <a className="flex items-center h-12 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900">
              Balades
            </a>
          </Link>
        </nav>
      )}
      {displayNavProfile && (
        <nav className="block lg:hidden flex items-center justify-between px-6 flex-wrap border-b border-gray-300 bg-white-300">
          <a
            href="#"
            className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
          >
            Mon profile
          </a>
          <a
            href="#"
            className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
          >
            Ma messagerie
          </a>
          <a
            href="#"
            className="flex items-center py-2 block w-full tracking-normal font-semibold lg:inline-block lg:mt-0 text-gray-900"
          >
            Mes annonces favorites
          </a>
          <Link href="/add-farm">
            <a class="bg-gray-800 inline-block text-white text-xs flex items-center mt-4 mb-2 px-4 py-2 leading-none rounded-full font-bold uppercase">
              Je suis un professionel
            </a>
          </Link>
          <button
            className="inline-block text-red-600 border-t border-gray-400 text-left w-full text-sm py-3 mt-4 leading-none text-black border-black lg:mt-0"
            onClick={onSignOut}
          >
            Me déconnecter
          </button>
        </nav>
      )}
    </>
  )
};

export default NavBar;