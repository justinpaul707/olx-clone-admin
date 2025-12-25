import { ToastContainer } from 'react-toastify'
import './App.css'
import { Provider } from 'react-redux'
import MetaList from './meta/Meta'
import {store}  from '@app/app/store/store';
import ApiDebugPanel from './components/debug/ApiDebugPanel';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Provider store={store}>
          <MetaList />
          <ApiDebugPanel />
      </Provider>
    </>
  );
}

export default App
