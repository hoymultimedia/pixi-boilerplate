import './style.css';
import App from './app/App';

window.onload = () => {
  const app = document.getElementById('app');
  setTimeout(() => {
    App.instance.init(app);
  }, 500);
};
