import _ from "lodash";
import moment from "moment";

export const isImage = (uri) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  // const extension = uri.substring(uri.lastIndexOf(".")).toLowerCase();
  // return imageExtensions.includes(extension);
  return _.some(imageExtensions, (extension) => _.includes(uri, extension));
};

export const isSignature = (uri) => {
  return (
    typeof uri === "string" &&
    uri.substring(0, uri.lastIndexOf(".")).endsWith("signature")
  );
};

export const filesToBeUploaded = (data) => {
  return getFilesWithDotNotation("uploadRequired", data);
};

export const setDefaultValues = (template) =>
  _.fromPairs(
    template
      ?.filter((item) => !["text", "textfold"].includes(item.type))
      ?.map((item) => [item.key, item.preset || ""])
  );

export const dateConverter = (date, formatter = null) =>
  formatter
    ? moment(date).format(formatter)
    : moment(date).toDate().toISOString();

export const getFilesWithDotNotation = (
  targetKey,
  obj,
  prefix = "",
  result = []
) => {
  _.forOwn(obj, (value, key) => {
    if (key === targetKey && value === true) {
      result.push({
        key: prefix,
        file: obj.data,
      });
    } else if (_.isObject(value)) {
      getFilesWithDotNotation(
        targetKey,
        value,
        prefix ? `${prefix}.${key}` : key,
        result
      );
    }
  });
  return result;
};

export const dotNotationToJson = (keys, values) => {
  const result = {};
  _.zip(keys, values).forEach(([key, value]) => {
    const nestedKeys = key.split(".");
    _.set(result, nestedKeys, value);
  });
  return result;
};

export const mergeObject = (originalObject, newValues) => {
  const mergeRecursive = (obj, src) => {
    for (const key in src) {
      if (_.isObject(src[key])) {
        if (_.isObject(obj[key])) {
          mergeRecursive(obj[key], src[key]);
        } else {
          obj[key] = _.cloneDeep(src[key]);
        }
      } else {
        obj[key] = _.cloneDeep(src[key]);
      }
    }
  };

  const updatedObject = _.cloneDeep(originalObject);
  mergeRecursive(updatedObject, newValues);
  return updatedObject;
};
