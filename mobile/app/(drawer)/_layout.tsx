import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/colors";
import { useLogout } from "@/hooks/useAuth";
import { TouchableOpacity, Text, View, Modal } from "react-native";
import { useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerContentComponentProps, DrawerItemList } from "@react-navigation/drawer";
import { Redirect, useRouter } from "expo-router";
import { useCheckAuth } from "@/hooks/useAuth";
import NetInfo from "@react-native-community/netinfo";

export default function DrawerLayout() {
  const colors = useThemeColors();

  const logout = useLogout();
  const [showModal, setShowModal] = useState(false);

  const openConfirm = () => setShowModal(true);
  const closeConfirm = () => setShowModal(false);

  const confirmLogout = () => {
    closeConfirm();
    logout.mutate();
  };

  const [networkError, setNetworkError] = useState(false);

  const { data: authData, isLoading } = useCheckAuth();

  // Monitor network
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setNetworkError(!state.isConnected);
    });
    return () => unsub();
  }, []);

  if (networkError) return <Redirect href="/networkError" />
  if (isLoading) return null;
  if (!authData) return <Redirect href="/(auth)/loginScreen" />

  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1 }}
        style={{ backgroundColor: colors.background }}
      >
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </View>

        {/* LOGOUT BUTTON */}
        <View
          style={{
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: colors.text + "22",
          }}
        >
          <TouchableOpacity
            onPress={openConfirm}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.success} />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: colors.text,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Drawer */}
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          drawerStyle: {
            backgroundColor: colors.background,
            width: 270,
          },
          drawerLabelStyle: {
            fontSize: 16,
            marginLeft: -10,
            color: colors.text,
          },
          drawerActiveTintColor: colors.success,
          drawerActiveBackgroundColor: colors.success + "22",
          drawerInactiveTintColor: colors.text + "99",
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Dashboard",
            drawerIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="category"
          options={{
            title: "Categories",
            drawerIcon: ({ color }) => (
              <Ionicons name="folder-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="education"
          options={{
            title: "Educations",
            drawerIcon: ({ color }) => (
              <Ionicons name="school-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="experience"
          options={{
            title: "Experiences",
            drawerIcon: ({ color }) => (
              <Ionicons name="briefcase-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="news"
          options={{
            title: "News",
            drawerIcon: ({ color }) => (
              <Ionicons name="newspaper-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="project"
          options={{
            title: "Projects",
            drawerIcon: ({ color }) => (
              <Ionicons name="code-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="techstack"
          options={{
            title: "TechStack",
            drawerIcon: ({ color }) => (
              <Ionicons name="hardware-chip-outline" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="testimonial"
          options={{
            title: "Testimonial",
            drawerIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={color} />
            ),
          }}
        />
      </Drawer>

      {/* CONFIRMATION MODAL */}
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={closeConfirm}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000055",
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: colors.background,
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.text,
                marginBottom: 10,
              }}
            >
              Logout
            </Text>

            <Text style={{ color: colors.text + "AA", marginBottom: 25 }}>
              Are you sure you want to logout?
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={closeConfirm}
                style={{ marginRight: 20 }}
              >
                <Text style={{ color: colors.text }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmLogout}>
                <Text style={{ color: "red", fontWeight: "600" }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
