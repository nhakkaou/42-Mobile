import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { StatusBar, View, StyleSheet, Text } from "react-native";

const Calculator_proj = () => {
  const [expression, setExpression] = useState("0");
  const [result, setResult] = useState("0");

  const handleNumberPress = (number) => {
    console.log(number);
    if (expression === "0") {
      setExpression(number.toString());
    } else {
      if (expression.length <= 23)
        setExpression(expression + number.toString());
    }
  };

  const handleDecimalPress = () => {
    console.log(".");
    setExpression(expression + ".");
  };

  const handleClearPress = () => {
    console.log("AC");
    setExpression("0");
    setResult("0");
  };

  const handleBackspacePress = () => {
    console.log("C");
    if (expression.length === 1) {
      setExpression("0");
    } else {
      setExpression(expression.slice(0, -1));
    }
  };

  const handleOperatorPress = (operator) => {
    console.log(operator);
    if (expression.length <= 23) setExpression(expression + operator);
  };

  const handleEqualsPress = () => {
    try {
      console.log("=");
      const calculatedResult = eval(expression);
      setResult(calculatedResult.toString());
    } catch (e) {
      Alert.alert("Invalid Format !");
      handleClearPress();
    }
  };
  return (
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#130017" }}
    >
      <StatusBar backgroundColor={"#740076"} />
      <View style={styles.appBar}>
        <Text style={{ fontSize: 20, color: "#fff" }}>Calculator</Text>
      </View>

      {/* CAlculator */}

      <View style={styles.textContainer}>
        <Text style={styles.resultnText}>{result}</Text>
        <Text style={styles.expressionText}>{expression}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            title="AC"
            onPress={handleClearPress}
          >
            <Text style={styles.btnTxt}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={handleBackspacePress}
          >
            <Text style={styles.btnTxt}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={() => handleOperatorPress("/")}
          >
            <Text style={styles.btnTxt}>/</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(7)}
          >
            <Text style={styles.btnTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(8)}
          >
            <Text style={styles.btnTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(9)}
          >
            <Text style={styles.btnTxt}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={() => handleOperatorPress("*")}
          >
            <Text style={styles.btnTxt}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(4)}
          >
            <Text style={styles.btnTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(5)}
          >
            <Text style={styles.btnTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(6)}
          >
            <Text style={styles.btnTxt}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={() => handleOperatorPress("-")}
          >
            <Text style={styles.btnTxt}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(1)}
          >
            <Text style={styles.btnTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(2)}
          >
            <Text style={styles.btnTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            title="3"
            onPress={() => handleNumberPress(3)}
          >
            <Text style={styles.btnTxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={() => handleOperatorPress("+")}
          >
            <Text style={styles.btnTxt}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress(0)}
          >
            <Text style={styles.btnTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDecimalPress}>
            <Text style={styles.btnTxt}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnOperators, styles.button]}
            onPress={handleEqualsPress}
          >
            <Text style={styles.btnTxt}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#740076",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#130017",
    flex: 3,
  },
  expressionText: {
    fontSize: 30,
    color: "#FFF",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },
  buttonContainer: {
    flex: 4,
    gap: 8,
  },
  button: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    // backgroundColor: "#363035",
  },
  btnOperators: {
    backgroundColor: "#740076",
    fontWeight: "bold",
  },
  // btnNumber: {
  // },
  btnTxt: {
    fontSize: 27,
    color: "#FFF",
  },
  resultnText: {
    fontSize: 60,
    color: "#FFF",
  },
});
export default Calculator_proj;
