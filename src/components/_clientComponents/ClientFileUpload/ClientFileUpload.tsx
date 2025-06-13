"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/Button";
import Upload from "@/components/Upload";
import Spinner from "@/components/Spinner";

export default function ClientFileUpload() {
  const [step, setStep] = useState(1);
  const [isDevelopPending, startDevelopTransition] = useTransition();
  const [isServicePending, startServiceTransition] = useTransition();

  const handleUpload = async (upload: File) => {
    try {
      //TODO. API 만들면 연동
      console.log(upload);
    } catch (e) {
      alert(e);
    }
  };

  const handleDevelopSave = async () => {
    if (confirm("개발 서버에 반영하겠습니까?")) {
      try {
        startDevelopTransition(() => {
          alert("개발 서버에 반영이 완료 되었습니다.");
          setStep(3);
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleServiceSave = async () => {
    if (confirm("서비스에 반영하겠습니다")) {
      try {
        startServiceTransition(() => {
          alert("서비스에 반영이 완료 되었습니다.");
          setStep(() => 4);
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <Upload
        onUpload={handleUpload}
        onEvent={(nextStep) => setStep(nextStep)}
        fileStep={step}
      />
      <ul className="flex w-full gap-x-2 justify-end">
        {step !== 1 && (
          <li>
            <Button
              size="xg"
              disabled={isDevelopPending || isServicePending}
              onClick={handleDevelopSave}
            >
              {isDevelopPending || isServicePending ? (
                <Spinner />
              ) : (
                "개발서버 적용"
              )}
            </Button>
          </li>
        )}
        {step === 3 && (
          <li>
            <Button
              size="xg"
              color="red"
              disabled={isDevelopPending || isServicePending}
              onClick={handleServiceSave}
            >
              {isDevelopPending || isServicePending ? (
                <Spinner />
              ) : (
                "서비스 적용"
              )}
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
}
