import * as FileSystem from "expo-file-system";
import { Center, Text } from "native-base";
import { memo, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import uuid from "react-native-uuid";
import LoadingComponent from "../../../../../../components/common/LoadingComponent";
import AddSignature from "./AddSignature";
import DefaultSignatureOption from "./DefaultSignatureOption";
import LocalSignaturePreview from "./LocalSignaturePreview";
import SignatureModal from "./SignatureModal";

const imageType = "png";

const UserSignature = ({ control, detail }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [path, setPath] = useState(null);
  const [defaultSignature, setDefaultSignature] = useState(false);

  return (
    <Controller
      name={detail.key}
      control={control}
      render={({ field: { onChange, value = [] } }) => {
        useEffect(() => {
          if (value.length === 0) return;
          //setPath and relevant details
        }, [value]);

        const handlePreviewSignature = async (signature) => {
          setLoading(true);
          setOpen(false);
          const path = `${FileSystem.cacheDirectory}${uuid.v4()}.${imageType}`;
          FileSystem.writeAsStringAsync(
            path,
            signature.replace(`data:image/${imageType};base64,`, ""),
            { encoding: FileSystem.EncodingType.Base64 }
          )
            .then((res) => {
              setLoading(false);
              setPath(path);
              onChange(path);
            })
            .catch((err) => {
              setError(err.message);
            });
        };

        const handleClearSignature = () => {
          FileSystem.deleteAsync(path).then(() => {
            setPath(null);
          });
        };

        return (
          <>
            {defaultSignature ? (
              <></>
            ) : loading ? (
              <Center h={60}>
                <LoadingComponent />
              </Center>
            ) : error ? (
              <Text fontSize={12} color="red.400">
                {error}
              </Text>
            ) : path ? (
              <LocalSignaturePreview
                uri={path}
                onPress={handleClearSignature}
                disabled={!!detail.disabled}
              />
            ) : (
              <AddSignature
                disabled={!!detail.disabled}
                onPress={() => setOpen(true)}
              />
            )}

            {!detail.disabled && (
              <DefaultSignatureOption
                onChange={(isSelected) => setDefaultSignature(isSelected)}
                defaultSignature={defaultSignature}
              />
            )}

            <SignatureModal
              callback={handlePreviewSignature}
              open={open}
              closeSignature={() => setOpen(false)}
              label={detail.session}
            />
          </>
        );
      }}
    />
  );
};

export default memo(UserSignature);
