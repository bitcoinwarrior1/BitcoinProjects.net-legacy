import React from "react";
import {mount} from "react-mounter";
import MainLayout from "./components/main_layout.jsx";
import DappLayout from "/client/modules/dapps/containers/dapp_layout";
export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<DappLayout />)
      });
    }
  });
}
