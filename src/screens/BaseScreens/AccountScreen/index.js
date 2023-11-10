import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable } from "react-native";
import LoadingComponent from "../../../components/common/LoadingComponent";
import { AuthContext } from "../../../context/authContext";
import { StateContext } from "../../../context/stateContext";
import GlobalHeader from "../../../global/globalHeader";
import UserAvatar from "../../../global/userAvatar";
import useDefaultAPI from "../../../hocks/useDefaultAPI";

const Header = ({ user_title, email, full_name }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  return (
    <HStack bg={"baseColor.500"} alignItems={"center"} py={6}>
      <VStack alignItems={"center"} px={12} space={3}>
        <UserAvatar
          full_name={full_name ? full_name : ""}
          size={windowWidth * 0.16}
          fontSize={windowWidth * 0.08}
        />
        <Pressable onPress={() => navigation.navigate("Edit")}>
          <Text>Edit</Text>
        </Pressable>
      </VStack>
      <VStack>
        <Text fontSize={"xl"} bold>
          {full_name}
        </Text>
        <Text pb={2}>{user_title}</Text>
        <Text>{email}</Text>
      </VStack>
    </HStack>
  );
};

const FoldText = ({ project }) => {
  const [display, setDisplay] = useState(false);
  const onPressHandler = () => {
    setDisplay(!display);
  };

  return (
    <Pressable onPress={() => onPressHandler()}>
      <HStack
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
        pb={2}
      >
        <Text color={"baseColor.500"} bold fontSize={"lg"} py={1}>
          {project.project.title}
        </Text>
        <Icon
          size={6}
          as={Entypo}
          name={`chevron-${display ? "up" : "down"}`}
          color={"gray.500"}
        />
      </HStack>
      {display && <ProjectDetailList id={project.project.id} />}
    </Pressable>
  );
};

const ProjectDetailList = ({ id }) => {
  const { getProjectDetails } = useDefaultAPI();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProjectDetails({ project: id, no_page: 1 })
      .then((response) => {
        setList(response.data);
        setLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, []);

  if (loading)
    return (
      <Center pt={2}>
        <LoadingComponent spinnerSize="sm" textFontSize="sm" />
      </Center>
    );

  if (!!err)
    return (
      <Center pt={2}>
        <Text color="baseColor.200">{err}</Text>
      </Center>
    );

  return list.map((item, i) => (
    <VStack px={4} pb={2} key={i}>
      <Text color={"baseColor"} textTransform={"capitalize"}>
        {`${item.category.inspection.name} Inspection - ${item.category.team.name} (${item.category.division.name})`}
      </Text>
      <Text color={"baseColor"} textTransform={"capitalize"}>
        {`(${item.permission.description})`}
      </Text>
    </VStack>
  ));
};

const ProjectList = ({ projectList }) => {
  const [searchItem, setSearchItem] = useState("");
  const filteredProjectList = projectList.filter((p) =>
    p.project.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <VStack px={4} space={2}>
      <VStack space={0}>
        <Text color={"baseColor.500"} fontSize={14} bold>
          Project
        </Text>
        <Input
          variant="underlined"
          placeholder="Search Project"
          onChangeText={(text) => setSearchItem(text)}
          mb={4}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="search" />}
              size={5}
              m="1"
              color="muted.900"
            />
          }
          color={"baseColor.500"}
          size={"md"}
          selectionColor={"gray.500"}
          _focus={{ borderColor: "gray.400" }}
        />
      </VStack>
      <ScrollView h={"60%"} showsVerticalScrollIndicator={false}>
        {filteredProjectList.length > 0 ? (
          filteredProjectList.map((item, i) => (
            <FoldText project={item} key={i} />
          ))
        ) : (
          <Text color="gray.500">No project found</Text>
        )}
      </ScrollView>
    </VStack>
  );
};

const Content = () => {
  const { email, full_name, user_title } = useContext(AuthContext);

  const { projectList } = useContext(StateContext);

  return (
    <VStack space={2}>
      <Header user_title={user_title} email={email} full_name={full_name} />
      <ProjectList projectList={projectList} />
    </VStack>
  );
};
const AccountScreen = () => {
  return (
    <>
      <GlobalHeader />
      <Content />
    </>
  );
};

export default AccountScreen;
