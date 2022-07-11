import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export const ErrorModal = ({ isOpen, setIsOpen, errorMsg, type }) => {
  const ModalIcon = () => {
    switch (type) {
      case "error":
        return <MaterialIcons name="error-outline" size={24} color="red" />;
      case "warning":
        return <AntDesign name="warning" size={20} color="#AB7A00" />;
      case "success":
        return <AntDesign name="checkcircleo" size={20} color="green" />;
      default:
        return <View></View>;
    }
  };

  const modalColor = () => {
    switch (type) {
      case "error":
        return { color: "red" };
      case "warning":
        return { color: "#AB7A00" };
      case "success":
        return { color: "green" };
      default:
        return { color: "black" };
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.modalView}>
          {ModalIcon()}
          <Text style={[{ marginLeft: 5 }, modalColor()]}>{errorMsg}</Text>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
});
