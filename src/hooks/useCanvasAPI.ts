import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { PostItColor } from '@/types/canvas';
import {
  ApiCanvas,
  CreateCanvasRequest,
  UpdateCanvasRequest,
  CreatePostItRequest,
  UpdatePostItRequest,
  ReorderPostItsRequest,
  ListCanvasResponse,
} from '@/types/api';

export function useCanvasAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    const message = err.response?.data?.message || err.message || 'Erro desconhecido';
    setError(message);
    console.error('API Error:', err);
    throw new Error(message);
  };

  // Canvas Operations
  const createCanvas = useCallback(async (data: CreateCanvasRequest): Promise<ApiCanvas> => {
    setLoading(true);
    setError(null);
    try {
      const canvas = await api.post<ApiCanvas>('/canvases', data);
      return canvas;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const listCanvases = useCallback(async (page = 1, limit = 10): Promise<ListCanvasResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<ListCanvasResponse>(`/canvases?page=${page}&limit=${limit}`);
      return response;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCanvas = useCallback(async (id: string): Promise<ApiCanvas> => {
    setLoading(true);
    setError(null);
    try {
      const canvas = await api.get<ApiCanvas>(`/canvases/${id}`);
      return canvas;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCanvas = useCallback(async (id: string, data: UpdateCanvasRequest): Promise<ApiCanvas> => {
    setLoading(true);
    setError(null);
    try {
      const canvas = await api.patch<ApiCanvas>(`/canvases/${id}`, data);
      return canvas;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCanvas = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/canvases/${id}`);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // PostIt Operations
  const createPostIt = useCallback(
    async (canvasId: string, blockType: string, data: CreatePostItRequest) => {
      setLoading(true);
      setError(null);
      try {
        const postIt = await api.post(
          `/postits/canvases/${canvasId}/blocks/${blockType}/postits`,
          data
        );
        return postIt;
      } catch (err) {
        return handleError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updatePostIt = useCallback(async (postItId: string, data: UpdatePostItRequest) => {
    setLoading(true);
    setError(null);
    try {
      const postIt = await api.patch(`/postits/${postItId}`, data);
      return postIt;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePostIt = useCallback(async (postItId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/postits/${postItId}`);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reorderPostIts = useCallback(
    async (canvasId: string, blockType: string, data: ReorderPostItsRequest) => {
      setLoading(true);
      setError(null);
      try {
        const postIts = await api.patch(
          `/postits/canvases/${canvasId}/blocks/${blockType}/postits/reorder`,
          data
        );
        return postIts;
      } catch (err) {
        return handleError(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Export Canvas
  const exportCanvasPDF = useCallback(async (canvasId: string): Promise<Blob> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${api.post}/../canvases/${canvasId}/export/pdf`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao exportar PDF');
      }

      const blob = await response.blob();
      return blob;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    // Canvas
    createCanvas,
    listCanvases,
    getCanvas,
    updateCanvas,
    deleteCanvas,
    // PostIt
    createPostIt,
    updatePostIt,
    deletePostIt,
    reorderPostIts,
    // Export
    exportCanvasPDF,
  };
}
