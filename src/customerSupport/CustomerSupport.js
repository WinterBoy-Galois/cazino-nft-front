'use strict';

module.exports = function chatWidget() {
  // if (!window) {
  //   throw new Error('DOM is unavailable');
  // }
  // window.Tawk_API = window.Tawk_API || {};
  // window.Tawk_LoadStart = new Date();
  //
  // const s1 = document.createElement('script'),
  //   s0 = document.getElementsByTagName('script')[0];
  // s1.async = true;
  // s1.src = 'https://embed.tawk.to/5e584490a89cda5a1888563d/default';
  // s1.charset = 'UTF-8';
  // s1.setAttribute('crossorigin', '*');
  // s0.parentNode.insertBefore(s1, s0);
  // const script = document.createElement('script');
  // script.async = true;
  // script.src = '//code.tidio.co/u3nbfk3adkesvh9vn0udm940uvfq0lh3.js';
  // document.body.appendChild(script);
  // return () => {
  //   document.body.removeChild(script);
  // };
  const s1 = document.createElement('script'),
    s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = '//code.tidio.co/u3nbfk3adkesvh9vn0udm940uvfq0lh3.js';
  s1.charset = 'UTF-8';
  s0.parentNode.insertBefore(s1, s0);
};
