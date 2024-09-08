import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletewish } from "../api/wishlist";
import { cleardata } from "../api/CartApi";

export default function useMutaionCart(fn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getcartapi"] });
      queryClient.invalidateQueries({ queryKey: ["getwish"] });

      if (fn == cleardata) {
        queryClient.setQueriesData("getcartapi", null);
      }
      if (fn == deletewish) {
        queryClient.setQueriesData("getwish", null);
      }
    },
  });
}
