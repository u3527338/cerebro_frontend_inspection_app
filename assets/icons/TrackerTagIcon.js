import React from "react";
import {Center, Icon} from "native-base";
import {G, Path} from "react-native-svg";


export const TrackerTagIcon = (props) => {

  return <Center>
    <Icon viewBox="0 0 20 20" {...props}>

      <G id="tracker-tag" transform="translate(-0.01 -0.01)">
        <Path id="Path_4914" data-name="Path 4914"
              d="M19.109,7.857,12.163.911a3.052,3.052,0,0,0-4.33,0L.911,7.832a3.052,3.052,0,0,0,0,4.33l6.946,6.946a3.052,3.052,0,0,0,4.33,0l6.921-6.921A3.052,3.052,0,0,0,19.109,7.857ZM9.985,1.287a.74.74,0,0,1,.738.738.732.732,0,0,1-1.464,0A.737.737,0,0,1,9.985,1.287Zm5.369,9a.4.4,0,0,1-.4.4H13.915A3.966,3.966,0,0,1,10.686,13.9v1.076a.4.4,0,0,1-.4.4H9.7a.4.4,0,0,1-.4-.4V13.9a4,4,0,0,1-3.229-3.217h-1a.4.4,0,0,1-.4-.4v-.6a.4.4,0,0,1,.4-.4h1A3.967,3.967,0,0,1,9.284,6.068V5.029a.4.4,0,0,1,.4-.4h.6a.4.4,0,0,1,.4.4V6.055A3.967,3.967,0,0,1,13.9,9.272h1.039a.4.4,0,0,1,.4.4v.613Z"
              transform="translate(0 0)" fill={props.fill ? props.fill : "#FFF"}/>
        <Path id="Path_4915" data-name="Path 4915"
              d="M8.516,5.85a2.666,2.666,0,1,0,2.666,2.666A2.66,2.66,0,0,0,8.516,5.85Zm0,4.506a1.84,1.84,0,1,1,1.84-1.84A1.843,1.843,0,0,1,8.516,10.356Z"
              transform="translate(1.469 1.469)" fill={props.fill ? props.fill : "#FFF"}/>
      </G>

    </Icon>
  </Center>
}