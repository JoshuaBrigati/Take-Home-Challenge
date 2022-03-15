import Link from 'next/link';


const DesktopNavbar = ({logoutHandler, profile, router}) => {
  return (
    <header className='header'>
      <nav className='right-side'>
        <ul>
          {router.route !== '/' && (
            <li>
              <Link href='/'>Home</Link>
            </li>
          )}
          {!profile && router.route !== '/login' && (
            <li>
              <Link href='/login'>Login</Link>
            </li>
          )}
          {profile && router.route !== '/graph' && (
            <li>
              <Link href='/graph'>Graph</Link>
            </li>
          )}
          {profile && (
            <li>
              <button onClick={(e) => logoutHandler(e)}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default DesktopNavbar;
