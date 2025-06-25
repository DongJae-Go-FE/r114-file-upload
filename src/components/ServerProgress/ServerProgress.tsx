"use client";

import { useReducer, useEffect, Fragment } from "react";
import { Progress } from "../Progress";
import Spinner from "../Spinner";

type State = {
  progress: number;
  isLoading: boolean;
  isComplete: boolean;
};

type Action =
  | { type: "START" }
  | { type: "SET_PROGRESS"; payload: number }
  | { type: "COMPLETE" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, isLoading: true, progress: 0 };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "COMPLETE":
      return { ...state, isLoading: false, isComplete: true, progress: 100 };
    case "RESET":
      return { progress: 0, isLoading: false, isComplete: false };
    default:
      return state;
  }
}

type ServerProgressProps = {
  isComplete?: boolean;
  isReset?: boolean;
};

export default function ServerProgress({
  isComplete,
  isReset,
}: ServerProgressProps) {
  const [state, dispatch] = useReducer(reducer, {
    progress: 0,
    isLoading: false,
    isComplete: false,
  });

  useEffect(() => {
    if (isComplete === true) {
      dispatch({ type: "START" });

      const start = Date.now();
      const duration = 100;

      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.min((elapsed / duration) * 100, 100);
        dispatch({ type: "SET_PROGRESS", payload: percent });

        if (percent >= 100) {
          clearInterval(interval);
          dispatch({ type: "COMPLETE" });
        }
      }, 5);

      return () => clearInterval(interval);
    }

    if (isComplete === false) {
      dispatch({ type: "RESET" });
    }
  }, [isComplete]);

  useEffect(() => {
    if (isReset) {
      dispatch({ type: "RESET" });
    }
  }, [isReset]);

  const { progress, isLoading: loading, isComplete: complete } = state;

  return (
    <div className="flex items-center gap-x-4 w-full border border-gray-200 p-3 rounded-md">
      <div className="border border-gray-200 w-15 h-15 rounded-sm relative flex justify-center items-center">
        {loading ? (
          <Spinner className="w-8 h-8" />
        ) : complete ? (
          renderCompleteFileIcon()
        ) : (
          renderReadyFileIcon()
        )}
      </div>
      <div className="w-[calc(100%-96px)]">
        <h4 className="body01b mb-2">
          {loading ? (
            <Fragment>
              서버 적용 진행률 <span>({Math.round(progress)}%)</span>
            </Fragment>
          ) : complete ? (
            "서버 적용 완료"
          ) : (
            "서버 적용 준비 중"
          )}
        </h4>
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
}

const renderReadyFileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="41"
    viewBox="0 0 44 41"
    className="w-7 h-7"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.04195 1.59209C5.23517 0.664653 6.05256 0 6.99991 0H36.9999C37.9473 0 38.7647 0.664653 38.9579 1.59209L43.9579 25.5921C44.1832 26.6734 43.4892 27.7327 42.4078 27.958C41.3265 28.1832 40.2672 27.4893 40.042 26.4079L35.3736 4H8.62619L3.95788 26.4079C3.73259 27.4893 2.67336 28.1832 1.59201 27.958C0.510654 27.7327 -0.183328 26.6734 0.0419533 25.5921L5.04195 1.59209Z"
      fill="#111111"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 26C0 24.8954 0.89543 24 2 24H12.9091C13.7903 24 14.5676 24.5767 14.8231 25.42L16.211 30H27.789L29.1769 25.42C29.4324 24.5767 30.2097 24 31.0909 24H42C43.1046 24 44 24.8954 44 26V39C44 40.1046 43.1046 41 42 41H2C0.89543 41 0 40.1046 0 39V26ZM4 28V37H40V28H32.5747L31.1868 32.58C30.9312 33.4233 30.1539 34 29.2727 34H14.7273C13.8461 34 13.0688 33.4233 12.8132 32.58L11.4253 28H4Z"
      fill="#111111"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5858 17.4142C15.3668 18.1953 16.6332 18.1953 17.4142 17.4142L22 12.8284L26.5858 17.4142C27.3668 18.1953 28.6332 18.1953 29.4142 17.4142C30.1953 16.6332 30.1953 15.3668 29.4142 14.5858L23.4142 8.58579C22.6332 7.80474 21.3668 7.80474 20.5858 8.58579L14.5858 14.5858C13.8047 15.3668 13.8047 16.6332 14.5858 17.4142Z"
      fill="#111111"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 8C23.1046 8 24 8.89543 24 10V22C24 23.1046 23.1046 24 22 24C20.8954 24 20 23.1046 20 22V10C20 8.89543 20.8954 8 22 8Z"
      fill="#111111"
    />
  </svg>
);

const renderCompleteFileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="41"
    viewBox="0 0 44 41"
    className="w-7 h-7"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.04195 1.59209C5.23517 0.664653 6.05256 0 6.99991 0H36.9999C37.9473 0 38.7647 0.664653 38.9579 1.59209L43.9579 25.5921C44.1832 26.6734 43.4892 27.7327 42.4078 27.958C41.3265 28.1832 40.2672 27.4893 40.042 26.4079L35.3736 4H8.62619L3.95788 26.4079C3.73259 27.4893 2.67336 28.1832 1.59201 27.958C0.510654 27.7327 -0.183328 26.6734 0.0419533 25.5921L5.04195 1.59209Z"
      fill="#34c759"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 26C0 24.8954 0.89543 24 2 24H12.9091C13.7903 24 14.5676 24.5767 14.8231 25.42L16.211 30H27.789L29.1769 25.42C29.4324 24.5767 30.2097 24 31.0909 24H42C43.1046 24 44 24.8954 44 26V39C44 40.1046 43.1046 41 42 41H2C0.89543 41 0 40.1046 0 39V26ZM4 28V37H40V28H32.5747L31.1868 32.58C30.9312 33.4233 30.1539 34 29.2727 34H14.7273C13.8461 34 13.0688 33.4233 12.8132 32.58L11.4253 28H4Z"
      fill="#34c759"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.4143 10.5858C31.1953 11.3668 31.1953 12.6332 30.4143 13.4142L22.4143 21.4142C22.0173 21.8112 21.4717 22.023 20.9109 21.998C20.35 21.973 19.8255 21.7134 19.4655 21.2826L15.4655 16.4969C14.7571 15.6494 14.8699 14.3881 15.7174 13.6797C16.5649 12.9713 17.8262 13.0841 18.5346 13.9317L21.1322 17.0395L27.5858 10.5858C28.3669 9.80474 29.6332 9.80474 30.4143 10.5858Z"
      fill="#34c759"
    />
  </svg>
);
