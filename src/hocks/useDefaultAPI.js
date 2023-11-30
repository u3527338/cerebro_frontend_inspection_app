import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { baseFetch } from "../api/baseFetch";
import { AuthContext } from "../context/authContext";
import { StateContext } from "../context/stateContext";
import {
  API_change_password,
  API_get_file_from_id,
  API_get_file_from_path,
  API_get_formdata_list,
  API_get_mytask_list,
  API_get_template_list,
  API_library_list,
  API_load_user,
  API_login,
  API_project_info,
  API_statistics,
  API_switch_project,
  API_upload_file,
  API_upload_signature,
  API_userinfo_info,
  API_user_list,
} from "../global/constants";

const useDefaultAPI = () => {
  const { token, default_project } = useContext(AuthContext);
  const { currentProject, currentCategory, globalFilter } =
    useContext(StateContext);

  const execute_post = ({ url, params = {}, data }) => {
    // console.log("execute_post", url);
    let headers = { "Content-Type": "application/json" };
    if (!!token) headers["Authorization"] = `Token ${token}`;
    return axios.post(url, data, {
      headers: headers,
      params: params,
    });
  };

  const execute_patch = async ({ url, params, data }) => {
    // console.log("execute_patch", url);
    axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  const execute_get = async ({ url, params }) => {
    // console.log("execute_get", url);
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  const execute_delete = ({ url, params }) => {
    // console.log("execute_delete", url);
    return axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  // const [{}, execute_patch] = useAxios(
  //   {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //   },
  //   { manual: true }
  // );

  // const [{}, execute_get] = useAxios(
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Token ${token}`,
  //     },
  //   },
  //   { manual: true }
  // );

  const switchProject = async (project_id) => {
    const response = await execute_patch({
      url: API_switch_project(project_id),
    });
    return response;
  };

  const loadUser = async () => {
    const response = await execute_get({ url: API_load_user });
    return response.data;
  };

  const getFormTemplateList = async () => {
    const response = await execute_get({
      url: API_get_template_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        page_size: 100,
      },
    });
    return response.data;
  };

  const getFormTemplateById = async (id) => {
    const response = await execute_get({
      url: API_get_template_list + `/${id}`,
    });
    return response.data;
  };

  const getFormDataList = async (params) => {
    console.log("get form data");
    const response = await execute_get({
      url: API_get_formdata_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...params,
        ...globalFilter,
      },
    });
    return response;
  };

  const getFormData = async (id) => {
    const response = await execute_get({
      url: API_get_formdata_list + `/${id}`,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
      },
    });
    return response.data;
  };

  const getMyTaskList = async (params) => {
    console.log("get my task");
    const response = await execute_get({
      url: API_get_mytask_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...params,
        ...globalFilter,
      },
    });
    return response;
  };

  const getProjectInfo = async () => {
    const response = await execute_get({
      url: API_project_info(currentProject.project.id),
    });
    return response.data.project_info;
  };

  const getUserInfo = async () => {
    const response = await execute_get({
      url: API_userinfo_info,
      params: { project: currentProject.project.id },
    });
    return response.data;
  };

  const getUserList = async () => {
    const response = await execute_get({
      url: API_user_list,
      params: { project: currentProject.project.id, distinct_user: 1 },
    });
    return response.data.results;
  };

  const getProjectDetails = async (params) => {
    const response = await execute_get({
      url: API_user_list,
      params: params,
    });
    return response.data;
  };

  const getLibraryList = async (uri) => {
    const response = await execute_get({
      url: API_library_list,
      params: {
        project: currentProject.project.id,
        uri: uri,
      },
    });
    return response.data;
  };

  const getStatistics = async (filter = {}) => {
    const response = await execute_get({
      url: API_statistics,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...filter,
      },
    });
    return response.data;
  };

  const getFileFromPath = async (path) => {
    const response = await execute_get({
      url: API_get_file_from_path,
      params: { path },
    });
    return response.data;
  };

  const getFileFromId = async (from_id) => {
    return execute_get({ url: API_get_file_from_id(from_id) });
  };

  const uploadFile = async (data, params) => {
    return execute_post({
      url: API_upload_file,
      data: data,
      params: {
        ...params,
        project: currentProject.project.id,
      },
    });
  };

  const uploadSignature = async (data) => {
    return execute_post({
      url: API_upload_signature,
      data: data,
      // params: {},
    });
  };

  const changePassword = async (data) => {
    const response = await execute_post({
      url: API_change_password,
      data: data,
    });
    return response;
  };

  const getPreviewFile = async (params) => {
    const response = await execute_get({
      url: API_get_file_from_path,
      params: params,
    });
    return response.data;
  };

  const deleteFileById = async (fileId) => {
    return execute_delete({
      url: API_upload_file,
      params: {
        project: currentProject.project.id,
        file: fileId,
      },
    });
  };

  const login = async (data) => {
    const response = await execute_post({
      url: API_login,
      data: data,
    });
    return response;
  };

  const useUserInfoQuery = () =>
    useQuery({
      queryKey: ["get user info", currentProject],
      queryFn: () => getUserInfo(),
      enabled: !!currentProject.project,
    });

  const useUserListQuery = () =>
    useQuery({
      queryKey: ["get user list", currentProject],
      queryFn: () => getUserList(),
    });

  const useProjectInfoQuery = () =>
    useQuery({
      queryKey: ["get project info", currentProject],
      queryFn: () => getProjectInfo(),
    });

  const useProjectDetailsQuery = ({ params }) =>
    useQuery({
      queryKey: ["get project details"],
      queryFn: () => getProjectDetails(params),
    });

  const useFormDataQuery = (id) =>
    useQuery({
      queryKey: ["get form data", id],
      queryFn: () => getFormData(id),
    });

  const useFormDataListQuery = ({ params, enabled }) =>
    useQuery({
      queryKey: [
        "get form data list",
        currentProject,
        currentCategory,
        globalFilter,
      ],
      queryFn: () => getFormDataList(params),
      // enabled: currentProject.project?.id && currentCategory.id && enabled,
      enabled: enabled,
    });

  const useMyTaskListQuery = ({ params, enabled }) =>
    useQuery({
      queryKey: ["get my task", currentProject, currentCategory, globalFilter],
      queryFn: () => getMyTaskList(params),
      // enabled: currentProject.project?.id && currentCategory.id && enabled,
      enabled: currentCategory.id && enabled,
    });

  const useLoadUserQuery = () =>
    useQuery({
      queryKey: ["load user"],
      queryFn: () => loadUser(),
    });

  const useFormTemplateListQuery = (id) =>
    useQuery({
      queryKey: ["get form template list"],
      queryFn: () => getFormTemplateList(),
    });

  const useFormTemplateByIdQuery = (id) =>
    useQuery({
      queryKey: ["get form template by id", id],
      queryFn: () => getFormTemplateById(id),
    });

  const useLoginMutation = () =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: (data) => login(data),
    });

  const useChangePasswordMutation = () =>
    useMutation({
      mutationKey: ["change password"],
      mutationFn: (data) => changePassword(data),
    });

  const useSwitchProjectMutation = () =>
    useMutation({
      mutationKey: ["switch project"],
      mutationFn: (id) => switchProject(id),
    });

  const usePreviewFileQuery = (path) =>
    useQuery({
      queryKey: ["get preview file", path],
      queryFn: () => getPreviewFile({ path }),
      enabled: !!path,
    });

  const useLibraryListQuery = (uri) =>
    useQuery({
      queryKey: ["get library list", uri],
      queryFn: () => getLibraryList(uri),
    });

  const useStatisticsQuery = (filter) =>
    useQuery({
      queryKey: ["get statistics", filter, currentProject, currentCategory],
      queryFn: () => getStatistics(filter),
    });

  const useFileFromPathQuery = (path) =>
    useQuery({
      queryKey: ["get file from path", path],
      queryFn: () => getFileFromPath(path),
      enabled: path?.length > 3 && path.includes("/"),
    });

  return {
    changePassword, //
    switchProject, //
    getFormTemplateList, //
    getFormTemplateById, //
    getPreviewFile, //
    getProjectInfo, //
    getUserInfo, //
    getUserList, //
    getProjectDetails, //
    getFormDataList, //TBD
    getMyTaskList, //TBD
    getLibraryList, //
    getStatistics, //
    loadUser, //
    getFormData, //
    getFileFromPath, //
    getFileFromId,
    uploadFile,
    uploadSignature,
    deleteFileById,

    useUserInfoQuery,
    useUserListQuery,
    useProjectInfoQuery,
    useProjectDetailsQuery,
    useFormDataQuery,
    useFormDataListQuery,
    useMyTaskListQuery,
    useLoadUserQuery,
    useLoginMutation,
    useFormTemplateListQuery,
    useFormTemplateByIdQuery,
    useChangePasswordMutation,
    useSwitchProjectMutation,
    usePreviewFileQuery,
    useLibraryListQuery,
    useStatisticsQuery,
    useFileFromPathQuery,
  };
};

export default useDefaultAPI;
