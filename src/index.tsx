import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './stores/stores';
import axios from 'axios';
import { getAuthToken } from './services/TokenService';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
axios.defaults.baseURL = 'http://localhost:5000/api';
if(getAuthToken()) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getAuthToken()}`;
}
root.render(
    <Provider store={Store}>
    <App />
    </Provider>
);

