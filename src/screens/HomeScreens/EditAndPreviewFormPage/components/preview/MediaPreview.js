import {Controller} from "react-hook-form";
import {AspectRatio, Text, Center, HStack, Image, Pressable, ScrollView, Spinner, VStack, Box} from "native-base";
import {useEffect, useState} from "react";
import useDefaultAPI from "../../../../../hocks/useDefaultAPI";
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

const ImageRender = ({path, name}) => {
  const [loading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [storagePath, setStoragePath] = useState('')

  const {getFileFromPath, getFileFromId} = useDefaultAPI();

  const get_media_agent = () => path.includes(".") ? getFileFromPath(path) : getFileFromId(path)
  const mediaHandler = () => {
    setIsLoading(true)
    get_media_agent()
      .then(response => setStoragePath(response.data.path))
      .finally(() => setIsLoading(false))
  }

  const onPressHandler = () => setModalVisible(true)

  useEffect(() => {
    if (!!path.length)
      mediaHandler()
  }, [path]);

  return (<>
    {loading ? <Center w={120} h={120}><Spinner size={'lg'} color={"baseColor.200"}/></Center> :
      <Pressable onPress={onPressHandler}><AspectRatio ratio={{base: 1}} height={{base: 120}}>
        <Image rounded={"xl"} source={{uri: storagePath}} alt={name} resizeMode="cover"/>
      </AspectRatio></Pressable>}

    <Modal visible={modalVisible} transparent={true} style={{flex: 1}}>
      <Pressable onPress={() => setModalVisible(false)} bg={"black"}
                 flex={1} p={3} justifyContent={"center"} alignItems={"center"}>
        <>
          <Pressable w={"100%"} onPress={() => setModalVisible(false)}>
            <FontAwesomeIcon icon={["fas", "xmark"]} color={"gray"} size={24}/>
          </Pressable>
          <Box w={"100%"} h={"60%"}>
            <ImageViewer imageUrls={[{url: storagePath}]}
                         renderIndicator={() => null}
                         loadingRender={() => <Spinner/>}
            />
          </Box>
        </>
      </Pressable>

    </Modal>
  </>)
}

const MediaPreview = ({detail, control}) => {

  return (
    <Controller name={detail.key}
                control={control}
                render={
                  ({field: {onChange, onBlur, value}}) => (
                    <>
                      {!!value.length ? <ScrollView horizontal><HStack space={2} pt={2}>
                          {value.map((item, index) => <ImageRender key={index} path={item}
                                                                   name={`${detail.key}_${index}`}/>)}
                        </HStack></ScrollView>
                        : <Text color={"baseColor.500"} bold px={2}>No Data</Text>}
                    </>
                  )}
    />
  )
}

export default MediaPreview;