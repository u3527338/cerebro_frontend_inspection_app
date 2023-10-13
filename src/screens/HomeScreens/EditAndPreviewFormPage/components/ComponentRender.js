import DefaultComponent from "./preview/DefaultComponent";
import TextInput from "./edit/TextInput";
import MyText from "./preview/Text";
import DateTimePreview from "./preview/DateTimePreview";
import MyDateTimePicker from "./edit/DateTimePicker";
import MySelect from "./edit/MySelect";
import RadioButtonGroup from "./edit/RadioButtonGroup";
import MediaPreview from "./preview/MediaPreview";
import SignaturePreview from "./preview/SignaturePreview";
import MyCheckBox from "./edit/CheckBox";
import MyMultiSelect from "./edit/MyMultiSelect";
import AutoComplete from "./edit/AutoComplete";
import { Box, Divider, Text, VStack } from "native-base";
import UserSignature from "./edit/UserSignature";
import ImagesPicker from "./edit/ImagesPicker";
import _ from "lodash";

const InputRender = ({ control, template, preview }) => {
  switch (template.type) {
    case "text":
    // return <RenderText items={template}/>
    case "textFold":
      return <MyText detail={template} />;

    case "input":
    case "inputBlock":
      return preview ? (
        <DefaultComponent control={control} detail={template} />
      ) : (
        <TextInput control={control} detail={template} />
      );

    case "datetimepicker":
      return preview ? (
        <DateTimePreview control={control} detail={template} />
      ) : (
        <MyDateTimePicker control={control} detail={template} />
      );

    case "dropDown":
      return preview ? (
        <DefaultComponent control={control} detail={template} />
      ) : (
        <MySelect control={control} detail={template} />
      );

    case "checkbox":
      return <MyCheckBox control={control} detail={template} />;

    case "multiSelect":
      return <MyMultiSelect control={control} detail={template} />;

    // case "nestedDropDown":
    //   return preview ? <RenderPreviewNestedDropDown template={template} data={formikProps.values}/> :
    //     <RenderNestedSelect items={template} props={formikProps}/>
    //
    // case "radio":
    //   return preview ? (
    //     <RenderPreviewRadio template={template} data={formikProps.values} />
    //   ) : (
    //     <RenderRadio control={control} deatil={template}  />
    //   );

    case "radio":
      return preview ? (
        <DefaultComponent control={control} detail={template} />
      ) : (
        <RadioButtonGroup control={control} detail={template} />
      );

    case "autocomplete":
      return <AutoComplete control={control} detail={template} />;

    case "imagePicker":
      //TODO: implement edit
      return preview ? (
        <MediaPreview control={control} detail={template} />
      ) : (
        // <MediaPreview control={control} detail={template} />
        <ImagesPicker control={control} detail={template} />
      );

    //
    // case "libraryPicker":
    //   return preview ? <RenderPreviewMediaPicker items={template} props={formikProps}/> :
    //     <RenderLibraryPicker items={template} props={formikProps} />
    //
    // case "checkBox":
    //   return preview ? <RenderDefault template={template} data={formikProps.values}/> :
    //     <RenderCheckBox items={template} props={formikProps}/>
    //

    case "signature":
      //TODO: implement edit
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
      return <Text>{template.type + ": " + template.session}</Text>;
  }
};

export const ComponentRender = ({ control, template, preview }) => {
  const customSession = [
    "input",
    "inputBlock",
    "checkbox",
    "datetimepicker",
    "multiSelect",
    "signature",
    "autocomplete",
  ];
  return (
    <>
      <Box bgColor={template.bgColor} px={2}>
        <Box p={2}>
          {!customSession.includes(template.type) && (
            <Text pb={2} bold underline color="baseColor.400">
              {_.startCase(template.session)}
            </Text>
          )}
          <InputRender
            control={control}
            template={template}
            preview={preview}
          />
          {template.caption && (
            <Text p={1} pt={3} color={"baseColor.800"} fontSize={10}>
              {template.caption}
            </Text>
          )}
        </Box>
        {!!template.divider && <Divider bg={"baseColor.300"} my={2} />}
      </Box>
    </>
  );
};
