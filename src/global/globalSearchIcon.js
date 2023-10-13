import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
  const { getProjectInfo, getUserList } = useDefaultAPI();
  const { currentProject, currentCategory } = useContext(StateContext);

  const [globalFilterModal, setGlobalFilterModal] = useState(false);
  const [location, setLocation] = useState([]);
  const [works, setWorks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentProject.project) {
      Promise.all([getUserList(), getProjectInfo()])
        .then(([userResponse, projectInfoResponse]) => {
          const results = userResponse.data.results;
          const projectInfo = projectInfoResponse.data.project_info.filter(
            (info) => info.category_id === currentCategory.id
          );

          const users = results.map((r) => ({
            id: r.user_id,
            item: r.user_detail.full_name,
          }));
          const location = _.uniqBy(mapData(projectInfo, "location"), "value");
          const works = _.uniqBy(mapData(projectInfo, "work"), "value");

          setUsers(users);
          setLocation(location);
          setWorks(works);
        })
        .catch((error) => console.log("error", error.message))
        .finally(() => setIsLoading(false));
    }
  }, [currentProject, currentCategory]);

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
        open={globalFilterModal && !isLoading}
        handleCloseModal={() => {
          setGlobalFilterModal(false);
        }}
        queryData={{ location, works, users }}
      />
    </>
  );
};

export default memo(GlobalSearchIcon);
