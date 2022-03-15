import Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_KEY;


export function verifyToken(jwtToken) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    return null;
  }
}

export function getAppCookies(req) {
  const parsedItems = {};
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split('; ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}

export function absoluteUrl(req, setLocalhost) {
  var protocol = 'https:';
  var host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
    url: req,
  };
}

export function setLogout(e) {
  e.preventDefault();
  Cookies.remove('token');
  Router.push('/');
}

export function checkCookiesForToken() {
  return Cookies.get('token')
}