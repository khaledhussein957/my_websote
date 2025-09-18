import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
    title: string;
    value: number;
    change: number;
    changeLabel: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

export default function StatCard({ title, value, change, changeLabel, icon, color }: StatCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: color }]}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardValue}>{value}</Text>
                    <Text style={styles.cardChange}>
                        {change} {changeLabel}
                    </Text>
                </View>
                <Ionicons name={icon} size={32} color="#fff" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: "48%",
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
    cardValue: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "700",
        marginVertical: 4,
    },
    cardChange: {
        fontSize: 12,
        color: "#fff",
    },
});
