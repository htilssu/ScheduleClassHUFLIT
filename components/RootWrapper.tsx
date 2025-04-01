"use client";

import React, { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@/lib/state";
import { Box, MantineProvider, createTheme } from "@mantine/core";
import { Provider } from "react-redux";
import LoadingOverlayWrapper from "./LoadingOverlayWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider, useSession } from "next-auth/react";
import { fetchUserData } from "@/lib/actions/user";

export const queryClient = new QueryClient();

const theme = createTheme({
  primaryColor: "orange",
  colors: {
    orange: [
      "#fff4e6",
      "#ffe8cc",
      "#ffd8a8",
      "#ffc078",
      "#ffa94d",
      "#ff922b", // orange[5] - primary
      "#fd7e14",
      "#f76707",
      "#e8590c",
      "#d9480f",
    ],
  },
});

// Component để thực hiện fetch dữ liệu khi đã có session
const UserDataLoader = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Chỉ fetch khi đã đăng nhập
    if (status === "authenticated" && session) {
      fetchUserData();
    }
  }, [session, status]);

  return <>{children}</>;
};

const RootWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SessionProvider>
          <MantineProvider theme={theme}>
            <Box className="relative">
              <LoadingOverlayWrapper />
              <UserDataLoader>{children}</UserDataLoader>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Box>
          </MantineProvider>
        </SessionProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default RootWrapper;
