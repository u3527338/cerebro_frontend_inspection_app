import { useContext, useEffect, useState, useTransition } from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import useDefaultAPI from "../../../hocks/useDefaultAPI";
import ProjectCard from "./components/ProjectCard";
import { AuthContext } from "../../../context/authContext";

const ProjectScreen = () => {
  const navigation = useNavigation();

  const { currentProject, projectList, setCurrentProject, resetProfile } =
    useContext(StateContext);
  const { default_project } = useContext(AuthContext);
  const { useSwitchProjectMutation } = useDefaultAPI();
  const { mutate, isPending: isLoading } = useSwitchProjectMutation();

  const [filter, setFilter] = useState("");
  const [filteredProjectList, setFilteredProjectList] = useState([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => setFilteredProjectList(projectList));
  }, [projectList]);

  const onPressHandler = (detail) => {
    resetProfile();
    mutate(detail.project.id, {
      onSuccess: () => {
        setCurrentProject(detail);
        navigation.navigate("HomeStack");
      },
    });
  };

  const handleChange = (text) => {
    setFilter(text);
    startTransition(() => {
      if (text === "") {
        setFilteredProjectList(projectList);
      } else {
        setFilteredProjectList(
          projectList.filter(
            (item) =>
              item.project.project_code.includes(text) |
              item.project.title.includes(text)
          )
        );
      }
    });
  };

  return (
    <>
      <GlobalHeader />
      <VStack flex={1} px={2} pb={12} space={2}>
        <Box px={4} pt={4}>
          <Input
            color={"baseColor.500"}
            size={"xl"}
            py={3}
            px={1}
            value={filter}
            onChangeText={handleChange}
            fontSize="14"
            InputRightElement={
              <Pressable onPress={() => handleChange("")}>
                <Icon m={2} size={4} as={<FontAwesome name={"times"} />} />
              </Pressable>
            }
            InputLeftElement={
              <Icon m={2} size={4} as={<FontAwesome name={"search"} />} />
            }
          />
        </Box>
        {isLoading ? (
          <Center flex={1}>
            <LoadingComponent />
          </Center>
        ) : (
          <ScrollView padding={4}>
            {isPending ? (
              <Spinner size="lg" />
            ) : filteredProjectList.length > 0 ? (
              <VStack space={5}>
                {filteredProjectList.map((item, index) => (
                  <ProjectCard
                    detail={item}
                    key={index}
                    callback={onPressHandler}
                    is_default_project={
                      currentProject?.project?.id === item.project.id
                      // || default_project?.project?.id === item.project.id
                    }
                  />
                ))}
                <Box h={10} />
              </VStack>
            ) : (
              <Text color={"baseColor.500"}>No Result</Text>
            )}
          </ScrollView>
        )}
      </VStack>
    </>
  );
};

export default ProjectScreen;
