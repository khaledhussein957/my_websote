import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardData } from "./dashboardApi";

interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    data: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        fetchDashboardStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardSuccess(state, action: PayloadAction<DashboardData>) {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDashboardFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearDashboard(state) {
            state.data = null;
            state.error = null;
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const {
    fetchDashboardStart,
    fetchDashboardSuccess,
    fetchDashboardFailure,
    clearDashboard,
    setLoading,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
