import React from "react";
import {BarChart, LineChart, XAxis, YAxis} from "react-native-svg-charts";
import {HStack, VStack} from "native-base";
import primary from "../../../../themes/colors/primary";
import moment from "moment";
import secondary from "../../../../themes/colors/secondary";
import {Text} from "react-native-svg";
import * as scale from 'd3-scale'
import {useWindowDimensions} from "react-native";

export default function TotalSubmitChartArea({data}) {
  const layout = useWindowDimensions();

  const Labels = ({x, y, bandwidth, data}) => (
    data.map((value, index) => (
      // console.log(value, x(index), y(value) , bandwidth)
      <Text key={`chart_label_${index}`}
            x={x(index) + (bandwidth / 2)}
            y={y(value) - 8}
            fontSize={12}
            fill={'black'}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
      >
        {value}
      </Text>
    ))
  )

  return (
    <HStack h={layout.width * 0.35} w={"auto"} space={2} mb={5}>
      <YAxis data={data}
             numberOfTicks={4}
             contentInset={{top: 30, bottom: 10}}
             svg={{fontSize: 10, fill: "gray", fontWeight: "bold"}}
      />
      <VStack h={"100%"} w={"85%"} space={3}>

        <BarChart style={{height: "100%", width: "100%"}}
                  data={data}
                  svg={{fill: secondary[500]}}
                  spacingInner={0.5}
                  spacingOuter={0.4}
                  contentInset={{top: 30, bottom: 10}}
        >
          <Labels/>
        </BarChart>
        <XAxis data={data}
               scale={scale.scaleBand}
               formatLabel={(value, index) => moment().utcOffset('+0800').subtract(7 - value, 'days').format("DD/MM")}
               contentInset={{left: 2, right: 2}}
               svg={{
                 fontSize: 10,
                 fill: '#617485'
               }}
        />
      </VStack>

    </HStack>
  )
}