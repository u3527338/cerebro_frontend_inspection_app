import React, { useEffect, useState } from "react";
import { Select, CheckIcon, Text, VStack } from "native-base";

const PickerArea = ({ detail, reset }) => {
  const [service, setService] = useState("");
  const [nextLevel, setNextLevel] = useState(null);
  const [_reset, setReset] = useState(false);

  // const onChangeHandler = (itemValue, remove = true) => {
  //   setReset(!_reset)
  //   setService(itemValue)

  //   if (remove) {
  //     props.values[detail.key] = itemValue

  //     const rootKey = detail.key.split("_")[0]
  //     const level = detail.key.split("_")[1]
  //     const relatedKey = Object.keys(props.values).filter(key => key.includes(rootKey + "_"))
  //     relatedKey.filter(key => key.split("_")[1] > level).map(key => delete props.values[key])
  //   }

  //   if (detail.hasOwnProperty('item')) {
  //     const nextProps = detail.item.filter(i => i.default === itemValue)[0]
  //     setNextLevel({...props, ...nextProps})
  //   }
  // }

  // useEffect(() => {
  //   // console.log(detail.key, props.values[detail.key])
  //   if (props.values[detail.key]) onChangeHandler(props.values[detail.key], false)
  // }, [])

  // useEffect(() => {
  //   if (!props.values.hasOwnProperty(detail.key)) setService("")
  // }, [reset])

  return (
    <>
      {detail.hasOwnProperty("item") ? (
        <Select
          selectedValue={service}
          minWidth="200"
          accessibilityLabel={detail.key}
          placeholder={detail.session ? detail.session : "Select One"}
          _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
          mt={1}
          size="md"
          py={4}
          isDisabled={detail.disabled}
          color={detail.disabled ? "muted.400" : "gray.500"}
          borderColor={"gray.300"}
          // onValueChange={onChangeHandler}
        >
          {detail.item.map((item) => (
            <Select.Item label={item.default} value={item.default} />
          ))}
        </Select>
      ) : null}
      {nextLevel && props.values[detail.key] ? (
        <PickerArea detail={nextLevel} reset={_reset} />
      ) : null}
    </>
  );
};

export default function NestedDropDown({ detail }) {
  const [service, setService] = useState("");
  const [nextLevel, setNextLevel] = useState(null);
  const [_reset, setReset] = useState(false);

  const onChangeHandler = (itemValue, remove = true) => {
    setReset(!_reset);
    setService(itemValue);

    if (remove) {
      props.values[detail.key] = itemValue;

      const rootKey = detail.key.split("_")[0];
      const relatedKey = Object.keys(props.values).filter((key) =>
        key.includes(rootKey + "_")
      );
      relatedKey.map((key) => delete props.values[key]);
    }

    if (detail.hasOwnProperty("item")) {
      const nextProps = detail.item.filter((i) => i.default === itemValue)[0];
      setNextLevel({ ...props, ...nextProps });
    }
  };

  useEffect(() => {
    onChangeHandler(props.values[detail.key], false);
  }, []);
  console.log(detail.item);
  return (
    <VStack mb={2} space={1}>
      {/* {detail.session ? (
        <Text color={"baseColor.500"} bold fontSize={"lg"} py={0}>
          {detail.session}
        </Text>
      ) : null} */}
      <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel={detail.key}
        placeholder={detail.default ? detail.default : "Select One"}
        _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" /> }}
        mt={1}
        size="md"
        py={4}
        isDisabled={detail.disabled}
        color={detail.disabled ? "muted.400" : "gray.500"}
        borderColor={"gray.300"}
        // onValueChange={onChangeHandler}
      >
        {detail.item.map((item) => (
          <Select.Item label={item.default} value={item.default} />
        ))}
      </Select>
      {nextLevel ? <PickerArea detail={nextLevel} reset={_reset} /> : null}
    </VStack>
  );
}
