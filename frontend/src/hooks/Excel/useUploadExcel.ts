import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadExcel } from '@/api/Excel/excelApi';
import { MutationConfig } from '@/types/react-query';

type UseUploadExcelOptions = {
  mutationConfig?: MutationConfig<typeof uploadExcel>;
};

export const useUploadExcel = ({
  mutationConfig,
}: UseUploadExcelOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    ...restConfig,
    mutationFn: uploadExcel,
    onSuccess: (data, variables, ...args) => {
      queryClient.invalidateQueries({
        queryKey: ['excelList'],
      });

      onSuccess?.(data, variables, ...args);
    },
  });
};
