import React, { useState } from 'react'
import { useRouter } from 'next/router';
import {
  verifyToken,
  setLogout,
  checkCookiesForToken,
} from '../../middleware/utils';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const MainNavbar = () => {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const token = checkCookiesForToken();
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  function logoutHandler(e) {
    setLogout(e);
  }

  const handleHamburgerClick = () => {
    setMobileNavOpen(!mobileNavOpen);
  }

  return (
    <>
      <DesktopNavbar
        logoutHandler={logoutHandler}
        profile={profile}
        router={router}
      />
      <MobileNavbar
        logoutHandler={logoutHandler}
        profile={profile}
        router={router}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        handleHamburgerClick={handleHamburgerClick}
      />
    </>
  )
}

export default MainNavbar;