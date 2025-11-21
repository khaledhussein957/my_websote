import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/colors";

const COLORS = useThemeColors();

const EducationCard = ({ item, onUpdate, onDelete }: any) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.bookCard}>
      {/* Top Row: Institution + Menu */}
      <View style={styles.row}>
        <Text style={styles.institution}>{item.institution}</Text>

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical" size={22} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.degree}>{item.degree}</Text>

      <Text style={styles.year}>
        {item.startYear} - {item.endYear}
      </Text>

      {item.gpa && <Text style={styles.gpa}>GPA: {item.gpa}</Text>}

      {item.uri && (
        <TouchableOpacity onPress={() => Linking.openURL(item.uri)}>
          <Text style={styles.url}>{item.uri}</Text>
        </TouchableOpacity>
      )}

      {/* Popup Menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                onUpdate(item);
              }}
            >
              <Text style={styles.menuText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                onDelete(item._id);
              }}
            >
              <Text style={[styles.menuText, { color: COLORS.error }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default EducationCard;

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  institution: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
  },
  degree: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
    color: COLORS.text,
  },
  year: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textLight,
  },
  gpa: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  url: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menuBox: {
    width: 200,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
