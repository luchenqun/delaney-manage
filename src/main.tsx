import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import { WagmiProvider } from 'wagmi';
import { config } from './utils/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const store = createStore(rootReducer);
const queryClient = new QueryClient();

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  useEffect(() => {
    if (!checkLogin() && window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={getArcoLocale()}
          componentConfig={{
            Card: {
              bordered: false,
            },
            List: {
              bordered: false,
            },
            Table: {
              border: false,
            },
          }}
        >
          <BrowserRouter>
            <Provider store={store}>
              <GlobalContext.Provider value={contextValue}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/" component={PageLayout} />
                </Switch>
              </GlobalContext.Provider>
            </Provider>
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Index />);
