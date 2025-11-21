import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { notificationApi, Notification } from "@/api/notification";

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: notificationApi.getNotifications,
  });
};

export const useMarkAllRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["markAllRead"],
    mutationFn: notificationApi.markAllRead,

    onSuccess: () => {
      AlertMessage.success("All notifications marked as read!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to mark all as read"
      ),
  });
};

export const useMarkRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["markRead"],
    mutationFn: (notificationId: string) =>
      notificationApi.markRead(notificationId),

    onSuccess: () => {
      AlertMessage.success("Notification marked as read!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to mark as read"
      ),
  });
};
