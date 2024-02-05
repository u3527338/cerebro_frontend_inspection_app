import * as FileSystem from "expo-file-system";
import _ from "lodash";
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
  // const disabled = detail.disabled;
  const disabled = false;
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
          const path = `${
            FileSystem.cacheDirectory
          }${uuid.v4()}signature.${imageType}`;
          FileSystem.writeAsStringAsync(
            path,
            signature.replace(`data:image/${imageType};base64,`, ""),
            { encoding: FileSystem.EncodingType.Base64 }
          )
            .then((res) => {
              setLoading(false);
              setPath(path);
              onChange({ uploadRequired: true, data: path });
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

        if (disabled) return null;

        return (
          <>
            <Text color={"baseColor.300"} fontSize={"xs"}>
              {_.startCase(detail.session)}
            </Text>
            {defaultSignature ? (
              <></>
            ) : loading ? (
              <Center h={60}>
                <LoadingComponent />
              </Center>
            ) : error ? (
              <Text p={2} fontSize={12} color="red.400">
                {error}
              </Text>
            ) : path ? (
              <LocalSignaturePreview
                uri={path}
                onPress={handleClearSignature}
                disabled={!!disabled}
              />
            ) : (
              <AddSignature
                disabled={!!disabled}
                onPress={() => setOpen(true)}
              />
            )}

            {!disabled && (
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
              imageType={imageType}
            />
          </>
        );
      }}
    />
  );
};

export default memo(UserSignature);
