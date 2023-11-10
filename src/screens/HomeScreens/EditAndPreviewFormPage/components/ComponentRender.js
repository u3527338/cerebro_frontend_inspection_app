import _ from "lodash";
import { Box, Divider, Text } from "native-base";
import AutoComplete from "./edit/AutoComplete";
import MyCheckBox from "./edit/CheckBox";
import DateTimePicker from "./edit/DateTimePicker";
import ImagesPicker from "./edit/ImagesPicker";
import MyMultiSelect from "./edit/MyMultiSelect";
import MySelect from "./edit/MySelect";
import RadioButtonGroup from "./edit/RadioButtonGroup";
import TextInput from "./edit/TextInput";
import UserSignature from "./edit/UserSignature";
import DateTimePreview from "./preview/DateTimePreview";
import DefaultPreview from "./preview/DefaultPreview";
import SignaturePreview from "./preview/SignaturePreview";
import MyText from "./preview/Text";

const InputRender = ({ control, template, preview }) => {
  switch (template.type) {
    case "text":
    case "textFold":
      return <MyText detail={template} />;

    case "input":
    case "inputBlock":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <TextInput control={control} detail={template} />
      );

    case "datetimepicker":
      return preview ? (
        <DateTimePreview control={control} detail={template} />
      ) : (
        <DateTimePicker control={control} detail={template} />
      );

    case "dropDown":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <MySelect control={control} detail={template} />
      );

    case "checkbox":
      return (
        <MyCheckBox control={control} detail={template} preview={preview} />
      );

    case "multiSelect":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <MyMultiSelect control={control} detail={template} />
      );

    // case "nestedDropDown":
    //   return preview ? <RenderPreviewNestedDropDown template={template} data={formikProps.values}/> :
    //     <RenderNestedSelect items={template} props={formikProps}/>

    case "radio":
    case "radioButtonGroup":
      return preview ? (
        <TextInput control={control} detail={template} />
      ) : (
        <RadioButtonGroup control={control} detail={template} />
      );

    case "autocomplete":
      return preview ? (
        <DefaultPreview control={control} detail={template} />
      ) : (
        <AutoComplete control={control} detail={template} />
      );

    case "imagePicker":
      return preview ? (
        <Text color={"black"}>ImagesPicker Preview</Text>
      ) : (
        <ImagesPicker control={control} detail={template} />
      );

    // case "libraryPicker":
    //   return preview ? <RenderPreviewMediaPicker items={template} props={formikProps}/> :
    //     <RenderLibraryPicker items={template} props={formikProps} />
    //
    // case "checkBox":
    //   return preview ? <RenderDefault template={template} data={formikProps.values}/> :
    //     <RenderCheckBox items={template} props={formikProps}/>
    //

    case "signature":
      return preview ? (
        <SignaturePreview control={control} detail={template} />
      ) : (
        <UserSignature control={control} detail={template} />
      );

    //
    // case "customItem":
    //   return preview ? <RenderPreviewCustomItem template={template} data={formikProps}/> :
    //     <RenderCustomItem items={template} props={formikProps}/>

    // default:
    //   return <MyCheckBox control={control} detail={template} />;
    default:
      return <DefaultPreview control={control} detail={template} />;
  }
};

export const ComponentRender = ({ control, template, preview }) => {
  const customSession = ["checkbox", "datetimepicker", "autocomplete"];
  return (
    <Box bgColor={template.bgColor} px={4} pt={2}>
      {!customSession.includes(template.type) && !!template.session && (
        <Text color={"baseColor.300"} fontSize={"xs"}>
          {_.startCase(template.session)}
        </Text>
      )}
      <Box p={2}>
        <InputRender control={control} template={template} preview={preview} />
      </Box>
      {template.caption ? (
        <Text color={"gray.400"} sub px={2} pb={4}>
          {template.caption}
        </Text>
      ) : (
        <Box h={1} />
      )}
      {template.divider ? (
        <Divider my={1} bg={"baseColor.300"} rounded={"md"} />
      ) : null}
    </Box>
  );
};
