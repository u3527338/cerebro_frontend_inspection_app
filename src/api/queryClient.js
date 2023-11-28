import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
      onError: async (error) => {
        console.log("query client queries", error);
      },
    },
    mutations: {
      onError: async (error) => {
        console.log("query client mutations", error);
      },
    },
  },
});
