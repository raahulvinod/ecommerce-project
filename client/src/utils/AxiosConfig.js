// export const base_url = 'http://localhost:5000/api/';

// export const base_url =
//   process.env.NODE_ENV === 'production'
//     ? 'api/'
//     : process.env.REACT_APP_BASE_URL;

export const base_url = process.env.REACT_APP_BASE_URL;

const getTokenFromLocalStorage = localStorage.getItem('customer')
  ? JSON.parse(localStorage.getItem('customer'))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
    }`,
    Accept: 'application/json',
  },
};
