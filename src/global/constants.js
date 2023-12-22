export const systemVersion = "2.0.2";
export const appName = "inspection";
// const apiServer = "http://127.0.0.1:8000"
// const apiServer = "http://192.168.0.193:8000"

// export const apiServer = "http://10.88.88.111:8000"
// export const apiServer = "https://inspection.cerebrohk.com"
// export const apiServer = "http://10.88.88.151:8001"
// export const apiServer = "http://10.17.30.125:8000";
export const apiServer = "http://10.17.30.109:8000";

// export const apiServer = "https://inspection.cerebrohk.com"
// const apiServer = "https://inspectiondev.cerebrohk.com"
// const apiServer = "https://inspectiondev-dot-cerebrohk.df.r.appspot.com"
// const apiServer = "https://inspection-dot-cerebrohk.df.r.appspot.com"

export const API_login = apiServer + "/api/auth/login";
export const API_load_user = apiServer + `/api/auth/profile/loaduser`;

export const API_switch_project = (project_id) =>
  apiServer + `/api/inspection/v1/project/${project_id}/switch`;
export const API_project_info = (project_id) =>
  apiServer + `/api/inspection/v1/project/${project_id}/info`;
export const API_project_list = apiServer + `/api/inspection/v1/project`;
export const API_user_list = apiServer + `/api/inspection/v1/group`;
export const API_userinfo_info = apiServer + `/api/inspection/v1/userinfo`;
export const API_get_template_list =
  apiServer + `/api/inspection/v1/formtemplate`;
export const API_get_formdata_list = apiServer + `/api/inspection/v1/formdata`;
export const API_get_mytask_list =
  apiServer + `/api/inspection/v1/formdata/my-task`;
export const API_library_list = apiServer + `/api/inspection/v1/listlibrary`;
export const API_statistics = apiServer + `/api/inspection/v1/statistics`;
export const API_get_file_from_path =
  apiServer + `/api/inspection/v1/file/from-path`;
export const API_get_file_from_id = (from_id) =>
  apiServer + `/api/inspection/v1/file/${from_id}`;

// Login Related
// export const API_login = apiServer + "/api-token-auth/"
// export const fcmTokenAPI = apiServer + "/api/push_token"
// export const releaseAPI = apiServer + "/api/release"
//
// export const API_QRCodeLogin = "not yet implement"
//
// // Get Form Detail
// export const formTemplateAPI = apiServer + "/api/formtemplate"
export const API_formdata = apiServer + "/api/formdata";
//
// // Get Required Info
// export const projectListAPI = apiServer + "/api/project"
// export const projectInfoAPI = apiServer + "/api/project_info"
// export const tradeAPI = apiServer + "/api/trade"
// export const groupAPI = apiServer + "/api/group"
//
// // Get User Info
// export const userInfoAPI = apiServer + "/api/userinfo"
// export const userCategoryAPI = apiServer + "/api/usercategory"
// export const statisticAPI = apiServer + "/api/statistics"
//
// // Functional Api
export const API_upload_file = apiServer + "/api/file/s/pre-upload";
// export const listLibraryAPI = apiServer + "/api/listlibrary"
// export const attachmentAPI = apiServer + "/api/attachment_template"
export const API_upload_signature = apiServer + "/api/uploadSignature";
//
export const API_accounts = apiServer + "/accounts/register";
export const API_change_password =
  apiServer + `/api/auth/profile/change-password`;
