const BASE_URL = 'https://contact-api.dicoding.dev/v1';

// buat fungsi getAccessToken yang akan mengambil access token dari localStorage
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// buat fungsi putAccessToken yang akan menyimpan access token ke localStorage
function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

// buat fungsi fetchWithToken yang akan melakukan fetch dengan menambahkan access token ke header Authorization
async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

// buat fungsi login yang akan melakukan login ke API dan menyimpan access token ke localStorage
async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// buat fungsi register yang akan melakukan registrasi ke API
async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

// buat fungsi getUserLogged yang akan mengambil data user yang sedang login
async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// buat fungsi addContact yang akan menambahkan kontak baru ke API
async function addContact({ name, tag }) {
  const response = await fetchWithToken(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, tag }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

// buat fungsi getContacts yang akan mengambil daftar kontak dari API
async function getContacts() {
  const response = await fetchWithToken(`${BASE_URL}/contacts`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}

// buat fungsi deleteContact yang akan menghapus kontak dari API
async function deleteContact(id) {
  const response = await fetchWithToken(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

export { getAccessToken, putAccessToken, login, register, getUserLogged, addContact, getContacts, deleteContact };
