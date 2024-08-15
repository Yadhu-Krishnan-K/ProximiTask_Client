import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function showErrorPopup(message) {
  console.log('showerroror ===--- workkig')
  toast.error(message, {
    position: "top-right", 
    autoClose: 3000,
  });
}

export default showErrorPopup;
