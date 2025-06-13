"use server";

import { signIn, signOut } from "@/auth";
import HttpRequest from "@/lib/network/HttpRequest";

import { redirect } from "next/navigation";

import {
  POST_ADMIN_ADD_REQUEST_TYPE,
  CommonResponse,
  POST_ADMIN_PASSWORD_CHANGE_REQUEST_TYPE,
} from "@/lib/network/types";

export async function handleLogout() {
  await signOut({ redirectTo: "/login" });
}

export async function handleLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      id: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log(response, "로그인 응답");
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function handleAdminAdd(formData: FormData) {
  try {
    const id = formData.get("id")?.toString() || "";
    const identification = formData.get("identification")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const team = formData.get("team")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    const response = await HttpRequest.set<
      CommonResponse,
      POST_ADMIN_ADD_REQUEST_TYPE
    >(
      "POST",
      "/api/admin/add", // TODO. 수정 예정
      {
        id,
        identification,
        name,
        team,
        email,
      },
      {
        "Content-Type": "application/json",
      }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
  redirect("/");
}

export async function handlePasswordChange(formData: FormData) {
  try {
    const pw = formData.get("pw")?.toString() || "";
    const newPw = formData.get("newPw")?.toString() || "";
    const newPwCheck = formData.get("newPwCheck")?.toString() || "";

    const response = await HttpRequest.set<
      CommonResponse,
      POST_ADMIN_PASSWORD_CHANGE_REQUEST_TYPE
    >(
      "POST",
      "/api/admin/password", // TODO. 수정 예정
      {
        pw,
        newPw,
        newPwCheck,
      },
      {
        "Content-Type": "application/json",
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }

  redirect("/login");
}
