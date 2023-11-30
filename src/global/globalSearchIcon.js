import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { Icon, IconButton } from "native-base";
import React, { memo, useContext, useEffect, useState } from "react";
import { StateContext } from "../context/stateContext";
import useDefaultAPI from "../hocks/useDefaultAPI";
import GlobalFilter from "./globalFilter";

const mapData = (data, key) => {
  if (data.length === 0) return [];
  return _.sortBy(_.flattenDeep(data.map((p) => p[key])), "title").map(
    (l, index) => ({
      id: index,
      label: l.title,
      value: l.title,
    })
  );
};

const GlobalSearchIcon = () => {
  const { useUserListQuery, useProjectInfoQuery } = useDefaultAPI();
  const { currentCategory } = useContext(StateContext);

  const [globalFilterModal, setGlobalFilterModal] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useUserListQuery();

  const {
    data: projectData,
    isLoading: projectLoading,
    error: projectError,
  } = useProjectInfoQuery();

  if (userLoading || projectLoading) return;

  const users = userData.map((r) => ({
    id: r.user_id,
    item: r.user_detail?.full_name,
  }));
  const projectInfo = projectData.filter(
    (info) => info.category_id === currentCategory.id
  );
  const location = _.uniqBy(mapData(projectInfo, "location"), "value");
  const works = _.uniqBy(mapData(projectInfo, "work"), "value");

  return (
    <>
      <IconButton
        onPress={() => {
          setGlobalFilterModal(true);
        }}
        _icon={{
          as: <Icon as={FontAwesomeIcon} icon={faMagnifyingGlass} />,
          color: "white",
          name: "global-search",
        }}
      />
      <GlobalFilter
        open={globalFilterModal}
        handleCloseModal={() => {
          setGlobalFilterModal(false);
        }}
        queryData={{ location, works, users }}
      />
    </>
  );
};

export default memo(GlobalSearchIcon);
