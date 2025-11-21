import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertMessage from "@/components/AlerMessageController";
import { newsApi, NewsData } from "@/api/news";

export const useNews = () => {
  return useQuery<NewsData[]>({
    queryKey: ["news"],
    queryFn: newsApi.getNews,
  });
};

export const useNewsBySlug = (slug: string | undefined) => {
  return useQuery<NewsData>({
    queryKey: ["news", slug],
    queryFn: () => newsApi.getNewsBySlug(slug!),
    enabled: !!slug,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createNews"],
    mutationFn: (data: NewsData) => newsApi.createNews(data),
    onSuccess: () => {
      AlertMessage.success("News created successfully!");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create news"
      ),
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateNews"],
    mutationFn: ({ id, data }: { id: string; data: NewsData }) =>
      newsApi.updateNews(id, data),
    onSuccess: () => {
      AlertMessage.success("News updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update news"
      ),
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteNews"],
    mutationFn: (id: string) => newsApi.deleteNews(id),
    onSuccess: () => {
      AlertMessage.success("News deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error: any) =>
      AlertMessage.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete news"
      ),
  });
};
