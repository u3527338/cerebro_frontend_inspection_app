import React from "react";
import {Center, Icon} from "native-base";
import {G, Path} from "react-native-svg";


export const BeaconWaveIcon = (props) => {

  return <Center>
    <Icon viewBox="0 0 16.694 16" {...props}>
      <G id="beacon-wave" transform="translate(-0.035 -0.362)">
        <Path id="Path_4906" data-name="Path 4906"
              d="M11.36,2.1,8.53.465a.709.709,0,0,0-.734,0L4.967,2.1a.749.749,0,0,0-.377.639v3.27a.739.739,0,0,0,.367.639L7.493,8.115V15.7a.66.66,0,1,0,1.32,0V8.115l2.536-1.467a.739.739,0,0,0,.367-.639V2.739A.688.688,0,0,0,11.36,2.1Z"
              transform="translate(0.219 0)" fill={props.fill ? props.fill : "#FEC001"}/>
        <Path id="Path_4907" data-name="Path 4907"
              d="M2.325,1.442A.541.541,0,0,0,1.56.677a5.237,5.237,0,0,0,0,7.388A.541.541,0,0,0,2.325,7.3,4.149,4.149,0,0,1,2.325,1.442Z"
              transform="translate(0 0.008)" fill={props.fill ? props.fill : "#FEC001"}/>
        <Path id="Path_4908" data-name="Path 4908"
              d="M2.991,2.137a3.061,3.061,0,0,0,0,4.328A.541.541,0,0,0,3.756,5.7a1.973,1.973,0,0,1,0-2.8.541.541,0,0,0-.765-.765Z"
              transform="translate(0.099 0.078)" fill={props.fill ? props.fill : "#FEC001"}/>
        <Path id="Path_4909" data-name="Path 4909"
              d="M13.787,7.3a.541.541,0,0,0,.765.765,5.237,5.237,0,0,0,0-7.388.541.541,0,1,0-.765.765A4.149,4.149,0,0,1,13.787,7.3Z"
              transform="translate(0.652 0.008)" fill={props.fill ? props.fill : "#FEC001"}/>
        <Path id="Path_4910" data-name="Path 4910"
              d="M13.092,6.465a3.061,3.061,0,0,0,0-4.328.541.541,0,1,0-.765.765,1.973,1.973,0,0,1,0,2.8.541.541,0,1,0,.765.765Z"
              transform="translate(0.582 0.078)" fill={props.fill ? props.fill : "#FEC001"}/>
      </G>
    </Icon>
  </Center>
}


