import { useQuery } from "react-query";
import {
  getUserMates
} from "../queries/mates";

import { REFETCH_INTERVAL } from "../constants";

// Learn more about React Query hooks
// https://react-query-v3.tanstack.com/guides/queries  
export const useGetUserMates = () => {
  return useQuery("my-mates", () => getUserMates(), {
    onError: (err) => {
      console.error(err);
    },
    refetchInterval: REFETCH_INTERVAL
  });
};


