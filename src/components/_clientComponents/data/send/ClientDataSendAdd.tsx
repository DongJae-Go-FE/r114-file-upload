"use client";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";

import { CommonDataNameSelect } from "@/components/Select/commonSelect/CommonDataNameSelect";
import { CommonAddCycleSelect } from "@/components/Select/commonSelect/CommonAddCycleSelect";

import { Checkbox } from "@/components/Checkbox";
import { Label } from "@/components/Label";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/Form";

import { POST_DATA_SEND_SCHEMA } from "@/schema/data/schema";

export default function ClientDataSendAdd() {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof POST_DATA_SEND_SCHEMA>>({
    resolver: zodResolver(POST_DATA_SEND_SCHEMA),
    defaultValues: {
      dataName: "",
      addCycle: "",
      service: [],
      fileList: [],
    },
  });

  const handleSave = async () => {};

  const handleCancel = () => {
    push("/data/send");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="sub-title">1.데이터 정보 입력</h4>
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
                            <CommonDataNameSelect
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
                      name="addCycle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ul className="flex gap-x-2 items-center">
                              <li className="flex gap-x-1 items-center">
                                <Checkbox {...field} />
                                <Label htmlFor="">RIS</Label>
                              </li>
                              <li className="flex gap-x-1 items-center">
                                <Checkbox {...field} />
                                <Label htmlFor="">REPS</Label>
                              </li>
                              <li className="flex gap-x-1 items-center">
                                <Checkbox {...field} />
                                <Label htmlFor="">RCS</Label>
                              </li>
                              <li className="flex gap-x-1 items-center">
                                <Checkbox {...field} />
                                <Label htmlFor="">RCS FC</Label>
                              </li>
                              <li className="flex gap-x-1 items-center">
                                <Checkbox {...field} />
                                <Label htmlFor="">R114 홈페이지</Label>
                              </li>
                              <li className="flex gap-x-1 items-center">
                                <Checkbox />
                                <Label htmlFor="">직접입력</Label>
                              </li>
                            </ul>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </DescriptionTable>
          </div>
          <div>
            <h4 className="sub-title">2.파일 등록</h4>
            <h4 className="sub-title">첨부파일 목록</h4>
          </div>
          <div>
            <h4 className="sub-title">3.개발서버 적용</h4>
          </div>
          <div>
            <h4 className="sub-title">4.운영서버 적용</h4>
          </div>
          <div className="btn-area">
            <Button type="button" color="white" onClick={handleCancel}>
              취소
            </Button>
            <Button type="button" onClick={handleSave}>
              확인
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
