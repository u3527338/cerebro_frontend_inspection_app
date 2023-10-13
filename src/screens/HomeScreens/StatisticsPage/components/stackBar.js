import React from 'react'
import {useWindowDimensions} from 'react-native'
import {Text as SVGText} from 'react-native-svg'
import {StackedBarChart, Grid, YAxis, XAxis} from 'react-native-svg-charts'
import {scaleBand} from 'd3-scale'
import {HStack, Text, VStack} from "native-base";


export default function StackedBarChartExample({data}) {

  const layout = useWindowDimensions();

  const keys = ["completed", "rejected", "pending", "overdue"]
  const colors = ["#3FB6B6", "#FF6480", "#44CEF7", "#FFD658"]

  const maxData = Math.max(...data.map((value, index) => keys.map(key => value[key]).reduce((a, b) => a + b)))
  const x_label = Array.from({length: 6}, (x, i) => i * Math.round(maxData/100) * 100 / 5)

  const Labels = ({x, y, bandwidth, data}) => (
    data.map((value, index) => {
        const total = keys.map(key => value[key]).reduce((a, b) => a + b)

        return <SVGText key={`statistic_label_${index}`}
                        x={x(total) + 10}
                        y={y(index) + (bandwidth / 2)}
                        fontSize={14}
                        fill={'gray'}
                        alignmentBaseline={'middle'}
        >
          {total}
        </SVGText>
      }
    )
  )

  return (
    <>
      <HStack h={layout.height * 0.5} pr={70} space={2}>
        <YAxis data={data}
               spacingInner={0.55}
               scale={scaleBand}
               svg={{fontSize: 10, fill: "grey"}}
               yAccessor={ ({item}) => {
                 return(item.title.length > 9) ? item.title.slice(0, 9) + " ..." : item.title
               }}
        />
        <VStack h={"100%"} w={"100%"} space={3}>
          <StackedBarChart style={{height: "100%", width: "100%"}}
                           data={data}
                           colors={colors}
                           keys={keys}
                           horizontal={true}
                           spacingInner={0.55}
                           numberOfTicks={3}
                           contentInset={{right: 50, left: 2}}
          >
            <Grid direction={Grid.Direction.VERTICAL}/>
            <Labels/>
          </StackedBarChart>
          <XAxis data={x_label}
                 scale={scaleBand}
                 formatLabel={(value, index) => x_label[value]}
                 contentInset={{left: -layout.width * 0.055, right: layout.width * 0.04}}
                 svg={{fontSize: 10, fill: '#617485',}}
          />
        </VStack>
      </HStack>

    </>

  )
}