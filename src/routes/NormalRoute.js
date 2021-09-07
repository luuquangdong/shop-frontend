import AboutPage from "pages/AboutPage";
import CartPage from "pages/CartPage";
import LoginPage from "pages/LoginPage";
import NormalLayout from "pages/NormalLayout";
import NotFoundPage from "pages/NotFoundPage";
import PaymentPage from "pages/PaymentPage";
import ProductDetailPage from "pages/ProductDetailPage";
import ProductDiscountPage from "pages/ProductDiscountPage";
import ProductPage from "pages/ProductPage";
import SignupPage from "pages/SignupPage";
import { Route, Switch } from "react-router-dom";

function NormalRoute(props) {
  return (
    <NormalLayout>
      <Switch>
        <Route path="/product/detail/:id" component={ProductDetailPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/discount" component={ProductDiscountPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </NormalLayout>
  );
}

export default NormalRoute;
