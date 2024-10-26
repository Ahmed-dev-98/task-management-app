import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./app/router/router.tsx";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
    >
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </KindeProvider>{" "}
  </Provider>
);
