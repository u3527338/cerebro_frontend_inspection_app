import { Box, Center, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

const ProjectCard = ({ detail, callback, is_default_project }) => {
  return (
    <Pressable onPress={() => callback(detail)}>
      {({ isPressed }) => {
        return (
          <VStack
            bg={"primary.200"}
            opacity={isPressed ? 0.8 : 1}
            p={2}
            rounded={"2xl"}
            shadow={1}
            h={150}
            space={1}
            borderWidth={3}
            borderColor={"primary.400"}
            transform={[
              {
                scale: isPressed ? 0.98 : 1,
              },
            ]}
          >
            <HStack justifyContent={"space-between"} paddingBottom={1}>
              <HStack space={4}>
                <Text color={"baseColor.500"} fontSize={"xl"} bold>
                  {detail.project.project_code} - {detail.project.title}
                </Text>
                {is_default_project ? (
                  <Text color={"primary.800"} bold>
                    default
                  </Text>
                ) : null}
              </HStack>
              {detail.admin ? (
                <Text color={"primary.900"} fontSize={"xs"} bold>
                  ADMIN
                </Text>
              ) : null}
            </HStack>

            <Text color={"baseColor.500"} bold>
              {detail.project.description}
            </Text>
          </VStack>
        );
      }}
    </Pressable>
  );
};

export default ProjectCard;
