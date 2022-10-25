// --- IMPORTS
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Store from './store/index'
import App from './App'

const Root = createRoot(document.getElementById('root'))

// --- RENDER
Root.render(
    <div>
        <Provider store={Store}>
            <App></App>
        </Provider>
    </div>
)
