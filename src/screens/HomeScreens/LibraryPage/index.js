import { Flex, VStack } from "native-base";
import GlobalHeader from "../../../global/globalHeader";
import MyFooter from "../../../routes/FooterRoute/MyFooter";
import LibraryBrowser from "./LibraryBrowser";

const LibraryPage = () => {
  return (
    <>
      <GlobalHeader />
      <VStack flex={1}>
        <Flex flex={1}>
          <LibraryBrowser />
        </Flex>
        <Flex bg={"white"} marginTop={2} shadow={2}>
          <MyFooter />
        </Flex>
      </VStack>
    </>
  );
};

export default LibraryPage;
