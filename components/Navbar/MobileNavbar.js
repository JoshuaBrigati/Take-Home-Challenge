import Link from 'next/link';

const MobileNavbar = ({logoutHandler, profile, router, mobileNavOpen, setMobileNavOpen, handleHamburgerClick}) => {
  return (
    <div className='mobile-header'>
      <div>
        <button
          aria-label='Menu'
          className={mobileNavOpen ? 'close-button' : 'hamburger-button'}
          onClick={
            () => handleHamburgerClick()
          }
        >
          <div className='ham-box'>
            <div className='ham-box-inner'></div>
          </div>
        </button>
        <aside aria-hidden='true' tabIndex='-1' className={mobileNavOpen ? 'side-bar-open' : 'side-bar'}>
          <nav className='right-side'>
            <ul>
              <li onClick={() => handleHamburgerClick()}>
                <Link href='/'>Home</Link>
              </li>
              {!profile && (
                <li onClick={() => handleHamburgerClick()} className='logout-wrapper'>
                  <button>
                    <Link href='/login'>Login</Link>
                  </button>
                </li>
              )}
              {profile && router.route !== '/graph' && (
                <li onClick={() => handleHamburgerClick()}>
                  <Link href='/graph'>Graph</Link>
                </li>
              )}
              {profile && (
                <li onClick={() => handleHamburgerClick()} className='logout-wrapper'>
                  <button onClick={(e) => logoutHandler(e)}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  )
}

export default MobileNavbar;