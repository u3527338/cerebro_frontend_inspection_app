import React, {useState} from "react";
import {BarChart, LineChart, PieChart, XAxis, YAxis} from "react-native-svg-charts";
import {HStack, VStack} from "native-base";
import {G, Text} from "react-native-svg";
import {Dimensions, useWindowDimensions} from "react-native";

export default function PieChartArea({inputData={}, highLight="completed", highLightItem="", setHighLightItem}) {
  const layout = useWindowDimensions();

  const hMin = 38
  const hMax = 55
  const lMin = 49
  const lMax = 55
  const randomColor = () => ('hsla(' + Math.floor(Math.random()*(hMax - hMin + 1) + hMin) + ', 100%, ' + Math.floor(Math.random()*(lMax - lMin + 1) + lMin)+'%, 1)')
  const colorList = ["#FFEFBE", "#FFD658", "#FEC001", "#ECB200", "#CF9D02", "#FFD658"]

  const [selectedSlice, setSelectedSlice] = useState({label: '', value: 0});
  const [labelWidth, setLabelWidth] = useState(0);

  const keys = Object.keys(inputData);
  const colors = ["#FFEFBE", "#FFD658", "#FEC001", "#ECB200", "#CF9D02", "#FFD658"]
  const data = keys.map((key, index) => {
    return {
      key,
      amount: inputData[key][highLight],
      svg: {fill: index > colorList.length ? randomColor() : colors[index]},
      // onPress: () => setSelectedSlice({label: key, value: values[index]})
      arc: highLightItem === key ? { outerRadius: '120%', cornerRadius: 2,} : {},
      onPress: () => setHighLightItem(key)
    }
  })

  const Labels = ({slices}) => {

    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice;
      return (
        <G key={`PIE_L_${index}`}>
          <Text x={labelCentroid[0]} y={labelCentroid[1]} fill={"black"} textAnchor={"middle"} fontSize={12}>
            {data.key === highLightItem ? data.amount : ""}
          </Text>
        </G>
      )
    })
  }

  const CenterText = () => (
    <G>
      <Text x={"0"} y={"0"} fill={"gray"} textAnchor={"middle"} fontSize={32}>
        {Object.keys(inputData).map(key => inputData[key][highLight]).reduce((p,c,i,a) => p + c)}
      </Text>
      <Text x={"0"} y={"20"} fill={"gray"} textAnchor={"middle"} fontSize={16}>
        Total
      </Text>
    </G>
  )

  return (
    <>
      <PieChart style={{height: layout.width * 0.55, width: layout.width * 0.55}}
                outerRadius={'80%'}
                innerRadius={'45%'}
                data={data}
                valueAccessor={({ item }) => item.amount}
      >
        <Labels />
        <CenterText />
      </PieChart>

    </>
  )
}