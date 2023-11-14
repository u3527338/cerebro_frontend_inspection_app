import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import useAxios from "axios-hooks";
import {
  API_change_password,
  API_get_file_from_id,
  API_get_file_from_path,
  API_get_formdata_list,
  API_get_mytask_list,
  API_get_template_list,
  API_library_list,
  API_load_user,
  API_project_info,
  API_statistics,
  API_switch_project,
  API_upload_file,
  API_upload_signature,
  API_userinfo_info,
  API_user_list,
} from "../global/constants";
import { StateContext } from "../context/stateContext";
import axios from "axios";

const useDefaultAPI = () => {
  const { token, default_project } = useContext(AuthContext);
  const { currentProject, currentCategory, globalFilter } =
    useContext(StateContext);

  const execute_post = ({ url, params = {}, data }) => {
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  const execute_patch = ({ url, params, data }) => {
    axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  const execute_get = ({ url, params }) => {
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      params: params,
    });
  };

  const execute_delete = ({ url, params }) => {
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
    return execute_patch({ url: API_switch_project(project_id) });
  };

  const loadUser = async () => {
    return execute_get({ url: API_load_user });
  };

  const getFormTemplateList = async () => {
    return execute_get({
      url: API_get_template_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        page_size: 100,
      },
    });
  };

  const getFormTemplateById = async (id) => {
    return execute_get({ url: API_get_template_list + `/${id}` });
  };

  const getFormDataList = async (filter = {}) => {
    return execute_get({
      url: API_get_formdata_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...filter,
        ...globalFilter,
      },
    });
  };

  const getFormData = async (id = {}) => {
    return execute_get({
      url: API_get_formdata_list + `/${id}`,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
      },
    });
  };

  const getMytaskList = async (filter = {}) => {
    return execute_get({
      url: API_get_mytask_list,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...filter,
        ...globalFilter,
      },
    });
  };

  const getProjectInfo = async () => {
    return execute_get({
      url: API_project_info(currentProject.project.id),
    });
  };

  const getUserInfo = async () => {
    return execute_get({
      url: API_userinfo_info,
      params: { project: currentProject.project.id },
    });
  };

  const getUserList = async () => {
    return execute_get({
      url: API_user_list,
      params: { project: currentProject.project.id, distinct_user: 1 },
    });
  };

  const getProjectDetails = async (params) => {
    return execute_get({
      url: API_user_list,
      params: params,
    });
  };

  const listLibrary = async (uri) => {
    return execute_get({
      url: API_library_list,
      params: {
        project: currentProject.project.id,
        uri: uri,
      },
    });
  };

  const getStatistics = (filter = {}) => {
    return execute_get({
      url: API_statistics,
      params: {
        project: currentProject.project.id,
        category: currentCategory.id,
        ...filter,
      },
    });
  };

  const getFileFromPath = async (path) => {
    return execute_get({ url: API_get_file_from_path, params: { path } });
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
    return execute_post({ url: API_change_password, data: data });
  };

  const getPreviewFile = async (params) => {
    return execute_get({ url: API_get_file_from_path, params: params });
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

  return {
    changePassword,
    switchProject,
    getFormTemplateList,
    getFormTemplateById,
    getPreviewFile,
    getProjectInfo,
    getUserInfo,
    getUserList,
    getProjectDetails,
    getFormDataList,
    getMytaskList,
    listLibrary,
    getStatistics,
    loadUser,
    getFormData,
    getFileFromPath,
    getFileFromId,
    uploadFile,
    uploadSignature,
    deleteFileById,
  };
};

export default useDefaultAPI;
