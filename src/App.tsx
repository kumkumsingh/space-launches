import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { Layout, Spin } from 'antd';
import { GlobalProvider } from './context/globalContext';
import AppHeader from './components/Header/Header';

const { Content } = Layout;

// Lazy-loaded components for code-splitting
const SearchAndFilter = lazy(() => import('./components/SearchAndFilter/SearchAndFilter'));
const LaunchList = lazy(() => import('./components/LaunchList/LaunchList'));

const App = () => {

    return (
        <GlobalProvider>
            <Router>
                <Layout>
                    <AppHeader />
                    <Content style={{ padding: '20px' }}>
                        <Suspense fallback={<Spin size="large" style={spinStyle} />}>
                            <Routes>
                                <Route 
                                    path="/" 
                                    element={<><SearchAndFilter /><LaunchList isFavoritesRoute={false} /></>} 
                                />
                                <Route 
                                    path="/favorites" 
                                    element={<LaunchList isFavoritesRoute={true} />} 
                                />
                            </Routes>
                        </Suspense>
                    </Content>
                </Layout>
            </Router>
        </GlobalProvider>
    );
};
const spinStyle = {
    display: 'block',
    margin: 'auto' 
}
export default App;
