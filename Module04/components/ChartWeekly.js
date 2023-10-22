import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ firstData, secondData, labels }) => {
  console.log("labels", labels);
  return (
    <ScrollView horizontal>
      <View style={{ flex: 1 }}>
        {firstData && (
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: firstData,
                },
                { data: secondData },
              ],
            }}
            width={firstData.length * 100} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="C"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "rgba(255,255,255, 0.6)",
              backgroundGradientTo: "rgba(255,255,255, 0.6)",
              backgroundGradientFromOpacity: 0.2,
              backgroundGradientToOpacity: 0.2,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "1",
                strokeWidth: "3",
                stroke: "#fff",
              },
            }}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Chart;
