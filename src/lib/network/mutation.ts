import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_BOARD_NOTICE_REQUEST,
  POST_BOARD_NOTICE_REQUEST,
  PUT_BOARD_NOTICE_REQUEST,
  DELETE_ADVERTISEMENT_AD_REQUEST,
  POST_ADVERTISEMENT_AD_REQUEST,
  PUT_ADVERTISEMENT_AD_REQUEST,
  PATCH_ADVERTISEMENT_AD_REQUEST,
} from "./api";
import { z } from "zod";

import {
  POST_ADVERTISEMENT_AD_SCHEMA,
  PUT_ADVERTISEMENT_AD_SCHEMA,
} from "@/schema/advertisement/ad/schema";

import {
  POST_BOARD_NOTICE_SCHEMA,
  PUT_BOARD_NOTICE_SCHEMA,
} from "@/schema/board/notice/schema";

export function useBoardDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postNo: string) => DELETE_BOARD_NOTICE_REQUEST({ postNo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOARD_NOTICE_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useBoardPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof POST_BOARD_NOTICE_SCHEMA>) =>
      POST_BOARD_NOTICE_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOARD_NOTICE_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useBoardEditMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      postNo,
    }: {
      values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>;
      postNo: string;
    }) => PUT_BOARD_NOTICE_REQUEST({ values, postNo }),
    onSuccess: (_, variables) => {
      const { postNo } = variables;
      queryClient.invalidateQueries({
        queryKey: ["BOARD_NOTICE_REQUEST", postNo],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (advtNo: string) => DELETE_ADVERTISEMENT_AD_REQUEST({ advtNo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADVERTISEMENT_AD_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>) =>
      POST_ADVERTISEMENT_AD_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADVERTISEMENT_AD_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdEditMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      advtNo,
    }: {
      values: z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>;
      advtNo: string;
    }) => PUT_ADVERTISEMENT_AD_REQUEST({ values, advtNo }),
    onSuccess: (_, variables) => {
      const { advtNo } = variables;
      queryClient.invalidateQueries({
        queryKey: ["BOARD_NOTICE_REQUEST", advtNo],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PATCH_ADVERTISEMENT_AD_REQUEST(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["BOARD_NOTICE_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}
