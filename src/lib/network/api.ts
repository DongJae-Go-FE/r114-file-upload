// import HttpRequest from "./HttpRequest";

// import { z } from "zod";

// import {
//   POST_ADVERTISEMENT_AD_SCHEMA,
//   PUT_ADVERTISEMENT_AD_SCHEMA,
// } from "@/schema/advertisement/ad/schema";

// import {
//   POST_BOARD_NOTICE_SCHEMA,
//   PUT_BOARD_NOTICE_SCHEMA,
// } from "@/schema/board/notice/schema";

// import {
//   GET_USER_CORPORATION_REQUEST_TYPE,
//   GET_USER_MEMBER_REQUEST_TYPE,
//   GET_USER_CONTRACT_REQUEST_TYPE,
//   GET_USER_POWER_REQUEST_TYPE,
//   GET_BOARD_NOTICE_REQUEST_TYPE,
//   POST_BOARD_NOTICE_RESPONSE_TYPE,
//   POST_BOARD_NOTICE_REQUEST_TYPE,
//   PUT_BOARD_NOTICE_REQUEST_TYPE,
//   POST_BOARD_NOTICE_DETAIL_RESPONSE_TYPE,
//   GET_ADVERTISEMENT_AD_REQUEST_TYPE,
//   GET_SETTING_MANAGEMENT_REQUEST_TYPE,
// } from "./types";

// export enum QueryKey {
//   USER_CORPORATION_REQUEST,
//   USER_MEMBER_REQUEST,
//   USER_CONTRACT_REQUEST,
//   USER_POWER_REQUEST,
//   BOARD_NOTICE_REQUEST,
//   BOARD_NOTICE_DETAIL_REQUEST,
//   BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST,
//   ADVERTISEMENT_AD_REQUEST,
//   SETTING_MANAGEMENT_REQUEST,
// }

// export enum MutationKey {}

// /** 수정 예정 */
// export async function GET_USER_CORPORATION_REQUEST(
//   queryString: GET_USER_CORPORATION_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_USER_CORPORATION_REQUEST_TYPE>(
//     "/v1/api/추가예정",
//     queryString
//   );
// }

// /** 수정 예정 */
// export async function GET_USER_MEMBER_REQUEST(
//   queryString: GET_USER_MEMBER_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_USER_MEMBER_REQUEST_TYPE>(
//     "/v1/api/추가예정",
//     queryString
//   );
// }

// /** 수정 예정 */
// export async function GET_USER_CONTRACT_REQUEST(
//   queryString: GET_USER_CONTRACT_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_USER_CONTRACT_REQUEST_TYPE>(
//     "/v1/api/추가예정",
//     queryString
//   );
// }

// /** 수정 예정 */
// export async function GET_USER_POWER_REQUEST(
//   queryString: GET_USER_POWER_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_USER_POWER_REQUEST_TYPE>(
//     "/v1/api/추가예정",
//     queryString
//   );
// }

// /** 공지사항 목록 및 총 건수 조회 */
// export async function GET_BOARD_NOTICE_REQUEST(
//   queryString: GET_BOARD_NOTICE_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<
//     POST_BOARD_NOTICE_RESPONSE_TYPE,
//     GET_BOARD_NOTICE_REQUEST_TYPE
//   >("/v1/api/board/list", queryString);
// }

// /** 공지사항 삭제 */
// export async function DELETE_BOARD_NOTICE_REQUEST({
//   postNo,
// }: {
//   postNo: string;
// }) {
//   return await HttpRequest.set("DELETE", `/api/v1/board/${postNo}`, {
//     "Content-Type": "application/json",
//   });
// }

// /** 공지사항 등록 */
// export async function POST_BOARD_NOTICE_REQUEST({
//   values,
// }: {
//   values: z.infer<typeof POST_BOARD_NOTICE_SCHEMA>;
// }) {
//   return await HttpRequest.set<POST_BOARD_NOTICE_REQUEST_TYPE>(
//     "POST",
//     `/api/v1/board`,
//     JSON.stringify(values),
//     {
//       "Content-Type": "application/json",
//     }
//   );
// }

// /** 공지사항 수정 */
// export async function PUT_BOARD_NOTICE_REQUEST({
//   values,
//   postNo,
// }: {
//   values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>;
//   postNo: string;
// }) {
//   return await HttpRequest.set<PUT_BOARD_NOTICE_REQUEST_TYPE>(
//     "PUT",
//     `/api/v1/board/${postNo}`,
//     JSON.stringify(values),
//     {
//       "Content-Type": "application/json",
//     }
//   );
// }

// /** 공지사항 상세 조회 및 첨부파일 목록 조회 */
// export async function GET_BOARD_NOTICE_DETAIL_REQUEST({
//   postNo,
// }: {
//   postNo: string;
// }) {
//   return await HttpRequest.get<POST_BOARD_NOTICE_DETAIL_RESPONSE_TYPE>(
//     `/v1/api/board/${postNo}`
//   );
// }

// /** 공지사항 상세 조회 파일 다운로드 */
// export async function GET_BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST({
//   attachNo,
// }: {
//   attachNo: string;
// }) {
//   return await HttpRequest.get(`/v1/api/board/download/${attachNo}`);
// }

// /** 공지사항 상세 조회 파일 업로드 TODO.타입 수정헤야함 */
// export async function GET_BOARD_NOTICE_FILE_UPLOAD_REQUEST({
//   attachNo,
// }: {
//   attachNo: string;
// }) {
//   return await HttpRequest.get(`/v1/api/board/download/${attachNo}`);
// }

// /** 광고 목록 조회 및 총 건수 조회 TODO.타입 수정헤야함 */
// export async function GET_ADVERTISEMENT_AD_REQUEST(
//   queryString: GET_ADVERTISEMENT_AD_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_ADVERTISEMENT_AD_REQUEST_TYPE>(
//     "/v1/api/advertise/list",
//     queryString
//   );
// }

// /** 광고 상세 조회 TODO.타입 수정헤야함 */
// export async function GET_ADVERTISEMENT_AD_DETAIL_REQUEST({
//   advtNo,
// }: {
//   advtNo: string;
// }) {
//   return await HttpRequest.get<unknown>(`/v1/api/advertise/${advtNo}`);
// }

// /** 현재 노출중인 광고 목록 조회 TODO.타입 수정헤야함 */
// export async function GET_ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST({
//   comCd,
// }: {
//   comCd: string;
// }) {
//   return await HttpRequest.get<unknown>(`/v1/api/advertise/active/${comCd}`);
// }

// /** 광고 삭제 TODO.타입 수정헤야함 */
// export async function DELETE_ADVERTISEMENT_AD_REQUEST({
//   advtNo,
// }: {
//   advtNo: string;
// }) {
//   return await HttpRequest.set("DELETE", `/api/v1/advertise/${advtNo}`, {
//     "Content-Type": "application/json",
//   });
// }

// /** 광고 등록 TODO.타입 수정헤야함 */
// export async function POST_ADVERTISEMENT_AD_REQUEST({
//   values,
// }: {
//   values: z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>;
// }) {
//   return await HttpRequest.set<unknown>(
//     "POST",
//     `/api/v1/advertise`,
//     JSON.stringify(values),
//     {
//       "Content-Type": "application/json",
//     }
//   );
// }

// /** 공지사항 수정 TODO.타입 수정헤야함 */
// export async function PUT_ADVERTISEMENT_AD_REQUEST({
//   values,
//   advtNo,
// }: {
//   values: z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>;
//   advtNo: string;
// }) {
//   return await HttpRequest.set<unknown>(
//     "PUT",
//     `/api/v1/advertise/${advtNo}`,
//     JSON.stringify(values),
//     {
//       "Content-Type": "application/json",
//     }
//   );
// }

// /** 광고 순서 변경 TODO.타입 수정헤야함 */
// export async function PATCH_ADVERTISEMENT_AD_REQUEST() {
//   return await HttpRequest.set<unknown>(
//     "PATCH",
//     `/api/v1/advertise/changeDisOrdNo`,
//     {
//       "Content-Type": "application/json",
//     }
//   );
// }

// /** 수정 예정 */
// export async function GET_SETTING_MANAGEMENT_REQUEST(
//   queryString: GET_SETTING_MANAGEMENT_REQUEST_TYPE
// ) {
//   return await HttpRequest.get<unknown, GET_SETTING_MANAGEMENT_REQUEST_TYPE>(
//     "/v1/api/추가예정",
//     queryString
//   );
// }
