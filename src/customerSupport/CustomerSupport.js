'use strict';

module.exports = function chatWidget(user_info) {
  if (user_info) {
    document.tidioIdentify = user_info;
  }
  const s1 = document.createElement('script'),
    s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = '//code.tidio.co/u3nbfk3adkesvh9vn0udm940uvfq0lh3.js';
  s1.charset = 'UTF-8';
  s0.parentNode.insertBefore(s1, s0);
};
