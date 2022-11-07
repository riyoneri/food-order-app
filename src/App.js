import { Fragment, useState } from 'react';

import Header from './component/Layout/Header'
import Meals from './component/Meals/Meals';
import Cart from './component/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals /> 
      </main>
    </Fragment>
  );
}

export default App;