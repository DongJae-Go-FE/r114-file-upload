"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";

import { CommonDataNameSelect } from "@/components/Select/commonSelect/CommonDataNameSelect";
import { CommonAddCycleSelect } from "@/components/Select/commonSelect/CommonAddCycleSelect";

import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";
import { FileUpload } from "@/components/FileUpload";
import { FileList } from "@/components/FileList";

import { Input } from "@/components/Input";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/Form";

import { ServerProgress } from "@/components/ServerProgress";

import DataSendModal from "./modal/DataSendModal";

import { X } from "lucide-react";

import { POST_DATA_SEND_SCHEMA } from "@/schema/data/schema";

import { TXT_MAX_LENGTH, INPUT_MIN_LENGTH } from "@/const/const";

const services = [
  { id: "ris", label: "RIS" },
  { id: "reps", label: "REPS" },
  { id: "rcs", label: "RCS" },
  { id: "fc", label: "RCS FC" },
  { id: "r114", label: "R114 홈페이지" },
];

export default function ClientDataSendAdd() {
  const { push } = useRouter();

  const [fileList, setFileList] = useState<
    { id: string; name: string; isSuccess: boolean }[]
  >([]);

  const [value, setValue] = useState("");
  const [step, setStep] = useState(1);

  const [isModal, setIsModal] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [deployState, setDeployState] = useState({
    devComplete: false,
    resetDev: false,
    serviceComplete: false,
    resetService: false,
  });

  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const form = useForm<z.infer<typeof POST_DATA_SEND_SCHEMA>>({
    resolver: zodResolver(POST_DATA_SEND_SCHEMA),
    defaultValues: {
      dataName: "",
      addCycle: "",
      service: [],
      fileList: [],
    },
  });

  const dataName = form.watch("dataName");
  const addCycle = form.watch("addCycle");
  const service = form.watch("service");

  const isDisabled = !dataName || !addCycle || service.length === 0;

  const handleUpload = async (files: File[]) => {
    setIsUploadLoading(true);
    const newFiles = files.filter(
      (file) => !fileList.some((f) => f.name === file.name)
    );

    const results = await Promise.all(
      newFiles.map(async (file) => {
        const id = crypto.randomUUID();
        try {
          await fakeUpload(file);
          return { id, name: file.name, isSuccess: true };
        } catch (e) {
          console.error("파일 업로드 실패:", e);
          return { id, name: file.name, isSuccess: false };
        }
      })
    );

    setFileList((prev) => [...prev, ...results]);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploadLoading(false);
  };

  const handleDeleteFile = async (id: string) => {
    setFileList((prev) => {
      const newFileList = prev.filter((file) => file.id !== id);

      if (newFileList.length === 0) {
        setStep(1);
      }

      return newFileList;
    });
  };

  const handleRegister = async () => {
    if (confirm("등록하시겠습니까?")) {
      setIsUploadLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStep(2);

        setDeployState((prev) => ({
          ...prev,
          devComplete: false,
          serviceComplete: false,
          resetDev: true,
          resetService: true,
        }));

        setTimeout(() => {
          setDeployState((prev) => ({
            ...prev,
            resetDev: false,
            resetService: false,
          }));
        }, 0);
      } catch (e) {
        alert(e);
      } finally {
        setIsUploadLoading(false);
      }
    }
  };

  const handleDevDeploy = async () => {
    if (confirm("개발 서버에 적용하시겠습니까?")) {
      setDeployState((prev) => ({ ...prev, devComplete: true }));
      setIsBtnLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStep(3);
        setIsBtnLoading(false);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleServiceDeploy = async () => {
    if (confirm("운영 서버에 적용하시겠습니까?")) {
      setDeployState((prev) => ({ ...prev, serviceComplete: true }));
      setIsBtnLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStep(4);
        setIsBtnLoading(false);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleSave = async () => {
    try {
      alert("저장되었습니다.");
      push("/data/send");
    } catch (e) {
      alert(e);
    }
  };

  const handleCancel = () => {
    push("/data/send");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="sub-title relative">
              1. 데이터 정보 입력{" "}
              {isModal && (
                <div className="absolute right-0 w-80 p-3 bg-white border border-gray-200">
                  <h5 className="body01b mb-1 flex justify-between items-center">
                    데이터 등록 안내{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsModal(false);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </h5>
                  <ul className="flex flex-col gap-y-1 body03m">
                    <li>- 데이터 명을 검색하여 선택할 수 있습니다.</li>
                    <li>- 건축물대장은 총 7개의 개별 파일을 등록해야합니다.</li>
                    <li>
                      - 파일 첨부 &gt; 개발서버 적용 &gt; 운영서버 적용까지
                      완료해야 <br />
                      &nbsp;&nbsp; 등록이 완료됩니다.
                    </li>
                  </ul>
                </div>
              )}
            </h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th colSpan={1}>데이터 명</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="dataName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex gap-x-1 items-center">
                              <CommonDataNameSelect
                                {...field}
                                className="w-[400px] bg-white mb-0"
                                placeholder="전체"
                              />
                              <DataSendModal />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>등록 주기</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="addCycle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonAddCycleSelect
                              {...field}
                              className="w-[400px] bg-white mb-0"
                              placeholder="전체"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>반영 서비스</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => {
                        const handleToggle = (serviceId: string) => {
                          if (field.value.includes(serviceId)) {
                            field.onChange(
                              field.value.filter((v: string) => v !== serviceId)
                            );
                          } else {
                            field.onChange([...field.value, serviceId]);
                          }
                        };

                        return (
                          <FormItem>
                            <FormControl>
                              <ul className="flex gap-x-2 items-center">
                                {services.map(({ id, label }) => (
                                  <li
                                    key={id}
                                    className="flex gap-x-1 items-center"
                                  >
                                    <Checkbox
                                      id={id}
                                      checked={field.value.includes(id)}
                                      onCheckedChange={() => handleToggle(id)}
                                    />
                                    <Label
                                      htmlFor={id}
                                      className="cursor-pointer"
                                    >
                                      {label}
                                    </Label>
                                  </li>
                                ))}

                                <li className="flex gap-x-1 items-center">
                                  <Checkbox
                                    id="self"
                                    checked={isOpen}
                                    onCheckedChange={() => {
                                      setIsOpen(!isOpen);
                                      if (!isOpen) setValue("");
                                    }}
                                  />
                                  <Label
                                    htmlFor="self"
                                    className="cursor-pointer"
                                  >
                                    직접입력
                                  </Label>
                                </li>
                              </ul>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </td>
                </tr>
                {isOpen && (
                  <tr>
                    <th colSpan={1}>반영 서비스 직접입력</th>
                    <td colSpan={5}>
                      <Input
                        type="text"
                        className="w-100"
                        value={value}
                        minLength={INPUT_MIN_LENGTH}
                        maxLength={TXT_MAX_LENGTH}
                        placeholder="반영 서비스명을 입력해주세요."
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </DescriptionTable>
          </div>
          <div>
            <h4 className="sub-title">
              2. 파일 등록
              <span className="attention">
                * 파일을 등록하기 위해서는 먼저 데이터 정보를 입력해야 합니다.
              </span>
            </h4>
            <div className="flex gap-x-4">
              <div className="w-1/2">
                <FileUpload
                  dragAreaPlaceholder="아래 버튼을 클릭하거나 파일을 드롭하세요"
                  multiple
                  upload={handleUpload}
                  limit={3}
                  disabled={isDisabled || isBtnLoading}
                  isLoading={isUploadLoading}
                  accept=".csv,.xlsx,.xls"
                  onLimitOver={() =>
                    alert("3개 이상의 파일은 업로드할 수 없습니다.")
                  }
                />
              </div>
              <div className="w-1/2">
                <FileList
                  items={fileList}
                  onDelete={handleDeleteFile}
                  isLoading={isUploadLoading || isBtnLoading}
                />
              </div>
            </div>
            <div className="btn-area mt-4">
              <Button
                type="button"
                onClick={handleRegister}
                disabled={
                  isUploadLoading ||
                  isDisabled ||
                  fileList.length === 0 ||
                  isBtnLoading
                }
              >
                등록
              </Button>
            </div>
          </div>
          <div>
            <h4 className="sub-title">
              3. 개발서버 적용
              <span className="attention">
                * 개발 서버에 적용하기 위해서는 먼저 파일을 업로드해야 합니다.
              </span>
            </h4>
            <div>
              <ServerProgress
                isComplete={deployState.devComplete}
                isReset={deployState.resetDev}
              />
            </div>
            <div className="btn-area mt-4">
              <Button
                type="button"
                onClick={handleDevDeploy}
                disabled={
                  deployState.devComplete || fileList.length === 0 || step !== 2
                }
              >
                개발서버 적용
              </Button>
            </div>
          </div>
          <div>
            <h4 className="sub-title">
              4. 운영서버 적용
              <span className="attention">
                * 운영 서버에 적용하기 위해서는 먼저 개발 서버에 적용해야
                합니다.
              </span>
            </h4>
            <div>
              <ServerProgress
                isComplete={deployState.serviceComplete}
                isReset={deployState.resetService}
              />
            </div>
            <div className="btn-area mt-4">
              <Button
                type="button"
                color="red"
                onClick={handleServiceDeploy}
                disabled={deployState.serviceComplete || step !== 3}
              >
                운영서버 적용
              </Button>
            </div>
          </div>
          <div className="btn-area">
            <Button type="button" color="white" onClick={handleCancel}>
              취소
            </Button>
            <Button type="button" onClick={handleSave} disabled={step !== 4}>
              확인
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

const fakeUpload = (file: File) =>
  new Promise<void>((resolve) => {
    console.log("파일 업로드 중:", file.name);
    setTimeout(() => resolve(), 500);
  });
