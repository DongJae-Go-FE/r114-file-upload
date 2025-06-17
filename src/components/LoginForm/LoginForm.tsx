"use client";

import { ComponentPropsWithoutRef, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Checkbox } from "@/components/Checkbox";
import Spinner from "../Spinner";

import {
  POST_LOGIN_SCHEMA,
  POST_LOGIN_MEMBER_ADD_SCHEMA,
} from "@/schema/login/schema";

import { handleLogin, handleAdminAdd } from "@/severActions/serverActions";

type LoginFormData = z.infer<typeof POST_LOGIN_SCHEMA>;
type LoginMemberAddFormData = z.infer<typeof POST_LOGIN_MEMBER_ADD_SCHEMA>;

export default function LoginForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const [state, setState] = useState(0);

  const {
    register: loginRegister,
    handleSubmit: handleHookFormLoginSubmit,
    formState: { errors: errorsLogin, isLoading: isLoginLoading },
  } = useForm<LoginFormData>({
    resolver: zodResolver(POST_LOGIN_SCHEMA),
  });

  const {
    register: AddRegister,
    handleSubmit: handleHookFormAddSubmit,
    formState: { errors: errorsAdd, isLoading: isAddLoading },
    reset: addReset,
  } = useForm<LoginMemberAddFormData>({
    resolver: zodResolver(POST_LOGIN_MEMBER_ADD_SCHEMA),
  });

  const handleLoginSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login Data:", data);

      const formData = new FormData();

      formData.append("id", data.id);
      formData.append("password", data.password);
      formData.append("isIdSave", String(data.isIdSave));

      await handleLogin(formData);
    } catch (e) {
      alert(e);
    }
  };

  const handleAddSubmit = async (data: LoginMemberAddFormData) => {
    if (confirm("관리자 등록을 신청 하시겠습니까?")) {
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("identification", data.identification);
        formData.append("id", data.id);
        formData.append("team", data.team);
        formData.append("email", data.email);

        await handleAdminAdd(formData);
        addReset();
        alert(
          "등록 신청이 완료 되었습니다. 신청서 검토후 심사 여부를 안내해드리겠습니다."
        );
        setState(0);
      } catch (e) {
        alert(e);
      }
    }
  };

  const renderForm = () => {
    switch (state) {
      case 0: {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">로그인</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHookFormLoginSubmit(handleLoginSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id">아이디</Label>
                    <Input
                      id="id"
                      type="text"
                      placeholder="아이디를 입력해주세요."
                      disabled={isLoginLoading}
                      {...loginRegister("id")}
                    />
                    {errorsLogin.id && (
                      <p className="body03m text-red-500">
                        {errorsLogin.id.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      disabled={isLoginLoading}
                      {...loginRegister("password")}
                    />
                    {errorsLogin.password && (
                      <p className="body03m text-red-500">
                        {errorsLogin.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex  gap-x-2 items-center">
                    <Checkbox
                      id="isIdSave"
                      className=""
                      {...loginRegister("isIdSave")}
                    />
                    <Label htmlFor="isIdSave">아이디 저장</Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      "로그인"
                    )}
                  </Button>
                </div>
                <div className="mt-5 text-center body02r text-gray-600">
                  아이디/비밀번호 분실시 관리자에게 문의바랍니다.
                </div>

                <button
                  type="button"
                  className="block body02b m-auto mt-2 underline underline-offset-4"
                  onClick={() => {
                    setState(1);
                  }}
                >
                  계정 발급 신청
                </button>
              </form>
            </CardContent>
          </Card>
        );
      }
      case 1: {
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                데이터 관리자 등록 신청서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHookFormAddSubmit(handleAddSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id">이름</Label>
                    <Input
                      id="id"
                      type="text"
                      placeholder="성함을 기재해주세요"
                      disabled={isAddLoading}
                      {...AddRegister("name")}
                    />
                    {errorsAdd.name && (
                      <p className="body03m text-red-500">
                        {errorsAdd.name.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="identification">사번</Label>
                    <Input
                      id="identification"
                      type="text"
                      placeholder="사번을 기재해주세요"
                      disabled={isAddLoading}
                      {...AddRegister("identification")}
                    />
                    {errorsAdd.identification && (
                      <p className="body03m text-red-500">
                        {errorsAdd.identification.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="team">소속된 팀/부서</Label>
                    <Input
                      id="team"
                      type="text"
                      placeholder="소속된 팀/부서명을 기재해주세요."
                      disabled={isAddLoading}
                      {...AddRegister("team")}
                    />
                    {errorsAdd.team && (
                      <p className="body03m text-red-500">
                        {errorsAdd.team.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">이메일 주소</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="회사 이메일 주소를 기재해주세요"
                      disabled={isAddLoading}
                      {...AddRegister("email")}
                    />
                    {errorsAdd.email && (
                      <p className="body03m text-red-500">
                        {errorsAdd.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isAddLoading}
                    >
                      {isAddLoading ? (
                        <Spinner className="w-4 h-4" />
                      ) : (
                        "데이터 등록 시작"
                      )}
                    </Button>
                    <Button
                      type="button"
                      className="w-full"
                      size="lg"
                      color="white"
                      disabled={isAddLoading}
                      onClick={() => {
                        setState(0);
                        addReset();
                      }}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {renderForm()}
    </div>
  );
}
