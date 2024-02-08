import _ from "lodash";
import { Box, Divider, Text } from "native-base";
import AutoComplete from "./edit/AutoComplete";
import CustomItem from "./edit/CustomItem";
import MyCheckBox from "./edit/CheckBox";
import DateTimePicker from "./edit/DateTimePicker";
import MediaPicker from "./edit/MediaPicker";
import MyMultiSelect from "./edit/MyMultiSelect";
import NestedDropDown from "./edit/NestedDropDown";
import RadioButtonGroup from "./edit/RadioButtonGroup";
import SimpleDropDown from "./edit/SimpleDropDown";
import TextInput from "./edit/TextInput";
import UserSignature from "./edit/UserSignature";
import DateTimePreview from "./preview/DateTimePreview";
import DefaultPreview from "./preview/DefaultPreview";
import MediaPreview from "./preview/MediaPreview";
import SignaturePreview from "./preview/SignaturePreview";
import MyText from "./preview/Text";

const InputRender = ({ template, preview, disabled, form }) => {
  const { control } = form;
  switch (template.type) {
    case "text":
    case "textFold":
      return <MyText detail={template} />;

    case "input":
    case "inputBlock":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <TextInput control={control} detail={template} disabled={disabled} />
      );

    case "datetimepicker":
      return preview ? (
        <DateTimePreview control={control} detail={template} />
      ) : (
        <DateTimePicker
          control={control}
          detail={template}
          form={form}
          disabled={disabled}
        />
      );

    case "dropDown":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <SimpleDropDown
          control={control}
          detail={template}
          disabled={disabled}
        />
      );

    case "checkBox":
      return (
        <MyCheckBox
          control={control}
          detail={template}
          preview={preview}
          disabled={disabled}
        />
      );

    case "multiSelect":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <MyMultiSelect
          control={control}
          detail={template}
          disabled={disabled}
        />
      );

    case "nestedDropDown":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <NestedDropDown
          control={control}
          detail={template}
          disabled={disabled}
        />
      );

    case "radio":
    case "radioButtonGroup":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <RadioButtonGroup form={form} detail={template} disabled={disabled} />
      );

    case "autocomplete":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <DefaultPreview control={control} detail={template} />
        // <AutoComplete control={control} detail={template} />
      );

    case "imagePicker":
      return preview ? (
        <MediaPreview
          control={control}
          detail={template}
          browseLibrary={false}
        />
      ) : (
        <MediaPicker
          control={control}
          detail={template}
          browseLibrary={false}
          disabled={disabled}
        />
      );

    case "libraryPicker":
      return preview ? (
        <MediaPreview
          control={control}
          detail={template}
          browseLibrary={true}
        />
      ) : (
        <MediaPicker
          control={control}
          detail={template}
          browseLibrary={true}
          disabled={disabled}
        />
      );

    case "signature":
      return preview ? (
        <SignaturePreview control={control} detail={template} />
      ) : (
        <UserSignature
          control={control}
          detail={template}
          disabled={disabled}
        />
      );

    case "customItem":
      return <CustomItem form={form} detail={template} disabled={disabled} />;

    case "attachment_title":
      return <></>;

    default:
      return <DefaultPreview control={control} detail={template} />;
  }
};

export const ComponentRender = ({ template, preview, disabled, form }) => {
  const customSession = [
    "checkbox",
    "autocomplete",
    "imagePicker",
    "libraryPicker",
    "signature",
  ];

  const noRender = disabled && template.type === "signature";

  return (
    <>
      {!!template.divider && (
        <Box px={4}>
          <Divider bg={"baseColor.300"} rounded={"md"} />
        </Box>
      )}
      {!noRender && (
        <Box bgColor={template.bgColor} px={4} pt={2}>
          {!customSession.includes(template.type) && !!template.session && (
            <Text color={"baseColor.300"} fontSize={"xs"}>
              {_.startCase(template.session)}
            </Text>
          )}
          <InputRender
            template={template}
            preview={preview}
            disabled={disabled}
            form={form}
          />
          {template.caption && (
            <Text color={"gray.400"} sub px={2} pb={4}>
              {template.caption}
            </Text>
          )}
        </Box>
      )}
    </>
  );
};
