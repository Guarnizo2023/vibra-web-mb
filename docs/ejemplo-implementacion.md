# Ejemplo de Implementación de la Nueva Arquitectura

Este documento muestra un ejemplo práctico de cómo se implementaría la nueva arquitectura propuesta, utilizando el módulo de actividades como caso de estudio.

## Estructura de Directorios del Módulo de Actividades

```
app/features/activity/
├── api/
│   ├── activityService.ts       # Servicios API específicos de actividades
│   └── index.ts                 # Archivo de barril para exportaciones
├── components/
│   ├── ActivityHistoryList.tsx  # Lista de historial de actividades
│   ├── DailyActivityCard.tsx    # Tarjeta de actividad diaria
│   ├── EmotionBadge.tsx         # Componente de insignia de emoción
│   ├── QuestionSection.tsx      # Sección de preguntas
│   └── index.ts                 # Archivo de barril para exportaciones
├── hooks/
│   ├── useActivities.ts         # Hook para obtener lista de actividades
│   ├── useDailyActivity.ts      # Hook para obtener actividad diaria
│   ├── useSubmitResponse.ts     # Hook para enviar respuestas
│   └── index.ts                 # Archivo de barril para exportaciones
├── screens/
│   ├── ActivityHistoryScreen.tsx # Pantalla de historial de actividades
│   ├── DailyActivityScreen.tsx   # Pantalla de actividad diaria
│   └── index.ts                  # Archivo de barril para exportaciones
├── store/
│   ├── activityStore.ts          # Estado local de actividades
│   └── index.ts                  # Archivo de barril para exportaciones
├── types/
│   ├── activity.ts               # Tipos de actividades
│   ├── response.ts               # Tipos de respuestas
│   └── index.ts                  # Archivo de barril para exportaciones
└── utils/
    ├── scoreUtils.ts             # Utilidades de puntuación
    └── index.ts                  # Archivo de barril para exportaciones
```

## Ejemplos de Implementación

### 1. Cliente API Base (Shared)

```typescript
// app/shared/services/api/client.ts
import axios from 'axios';
import config from '@config/env.json';

const apiBaseUrl = config.development.apiBaseUrl;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para JWT
apiClient.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

### 2. Servicio de Actividades

```typescript
// app/features/activity/api/activityService.ts
import apiClient from '@shared/services/api/client';
import { Activity, ActivityResponse, PaginatedResponse } from '../types';

export const ActivityService = {
  /**
   * Obtiene una actividad por su ID
   * @param activityId - ID de la actividad
   */
  getActivityById: (activityId: string) =>
    apiClient.get<ActivityResponse>(`/activities/${activityId}`),

  /**
   * Obtiene la actividad diaria actual
   */
  getDailyActivity: () =>
    apiClient.get<ActivityResponse>('/activities/daily/current').then(res => res.data),

  /**
   * Envía respuestas a una actividad
   * @param activityId - ID de la actividad
   * @param userId - ID del usuario
   * @param data - Datos de respuesta
   */
  submitResponse: (activityId: string, userId: string, data: any) =>
    apiClient.post(`/activities/${activityId}/${userId}/submit`, {
      params: { id: activityId, userId },
      answers: [...data]
    }),

  /**
   * Obtiene el historial de actividades
   * @param page - Número de página
   * @param userId - ID del usuario
   */
  getActivityHistory: (page = 1, userId = '') =>
    apiClient.get<PaginatedResponse<Activity>>('/activities', {
      params: { page, limit: 10, userId, emotion: 'all' }
    }).then(res => res.data),

  /**
   * Obtiene la lista de emociones disponibles
   */
  getEmotionsList: () => apiClient.get<string[]>('/activities/emotions/list')
};
```

### 3. Hooks de Actividades

```typescript
// app/features/activity/hooks/useActivities.ts
import { useQuery } from '@tanstack/react-query';
import { ActivityService } from '../api';
import { useUser } from '@shared/hooks/useUser';
import { PaginatedResponse, Activity } from '../types';

/**
 * Hook para obtener el historial de actividades
 * @param page - Número de página
 */
export const useActivities = (page = 1) => {
  const { user } = useUser();

  return useQuery<PaginatedResponse<Activity>>(
    ['activities', page, user?.id],
    () => ActivityService.getActivityHistory(page, user?.id),
    {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    }
  );
};

// app/features/activity/hooks/useDailyActivity.ts
import { useQuery } from '@tanstack/react-query';
import { ActivityService } from '../api';
import { ActivityResponse } from '../types';

/**
 * Hook para obtener la actividad diaria actual
 */
export const useDailyActivity = () => {
  return useQuery<ActivityResponse>(
    ['daily-activity'],
    ActivityService.getDailyActivity,
    {
      staleTime: 1000 * 60 * 5 // 5 minutos
    }
  );
};

// app/features/activity/hooks/useSubmitResponse.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityService } from '../api';

/**
 * Hook para enviar respuestas a una actividad
 */
export const useSubmitResponse = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { activityId: string; userId: string; answers: any }) =>
      ActivityService.submitResponse(data.activityId, data.userId, data.answers),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['daily-activity']);
        queryClient.invalidateQueries(['rankings']);
      }
    }
  );
};
```

### 4. Estado Local de Actividades

```typescript
// app/features/activity/store/activityStore.ts
import { create } from 'zustand';

interface ActivityState {
  currentStep: number;
  responses: Record<string, any>[];
  mediaStatus: 'loading' | 'ready' | 'error';
  startTime: number;
  actions: {
    initialize: (steps: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    addResponse: (response: any) => void;
    reset: () => void;
  };
}

export const useActivityStore = create<ActivityState>((set) => ({
  currentStep: 0,
  responses: [],
  mediaStatus: 'loading',
  startTime: Date.now(),
  actions: {
    initialize: (steps: number) => set({ 
      currentStep: 0, 
      responses: new Array(steps) 
    }),
    nextStep: () => set((state) => ({
      currentStep: state.currentStep + 1
    })),
    prevStep: () => set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0)
    })),
    addResponse: (response: any) => set((state) => ({
      responses: [...state.responses, response]
    })),
    reset: () => set({
      currentStep: 0,
      responses: [],
      mediaStatus: 'loading',
      startTime: Date.now()
    })
  },
}));
```

### 5. Pantalla de Actividad Diaria

```typescript
// app/features/activity/screens/DailyActivityScreen.tsx
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { router } from 'expo-router';

// Hooks
import { useUser } from '@shared/hooks/useUser';
import { useDailyActivity, useSubmitResponse } from '../hooks';
import { useActivityStore } from '../store';

// Componentes
import { QuestionSection, ScoreCounter } from '../components';
import { ErrorScreen } from '@shared/components/ui';
import { MediaPlayer, ProgressBar } from '@shared/components/ui';

// Utilidades
import { calculateScore, calculateMaxScore } from '../utils';

const DailyActivityScreen = () => {
  const tailwind = useTailwind();
  const { user } = useUser();
  const { data, isLoading, error } = useDailyActivity();
  const { mutate } = useSubmitResponse();
  const { currentStep, responses, actions } = useActivityStore();
  const startTime = 60;

  const currentScore = calculateScore(responses as any);
  const maxScore = calculateMaxScore(data?.activity?.questions?.length || 0);

  useEffect(() => {
    if (data) {
      console.log("Data received:", data.activity);
      console.log("Current Step:", currentStep);
    }
  }, [data]);

  const handleSubmit = async (answers: Record<string, string>) => {
    if (!data) return;

    const responseDto = {
      activityId: data.activity?._id,
      userId: user.id,
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
        responseTime: Date.now() - startTime
      }))
    };

    console.log("Submitting response:", responseDto);
    mutate(responseDto, {
      onSuccess: () => {
        Alert.alert('¡Éxito!', 'Respuesta enviada correctamente');
        router.push('/');
      },
      onError: (error) => {
        Alert.alert('Error', 'No se pudo enviar la respuesta');
        console.error(error);
      }
    });
  };

  if (isLoading) {
    return (
      <View style={tailwind("flex-1 justify-center items-center")}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !data) {
    return <ErrorScreen message="No se pudo cargar la actividad" />;
  }

  return (
    <SafeAreaView style={tailwind("flex-1 bg-white")}>
      <View style={tailwind("p-4")}>
        <Text style={tailwind("text-2xl font-bold")}>{data.activity.title}</Text>
        <ScoreCounter current={currentScore} max={maxScore} />
        <ProgressBar 
          current={currentStep} 
          total={data.activity.questions?.length || 0} 
        />
        
        {data.activity.resources?.length > 0 && (
          <MediaPlayer 
            url={data.activity.resources[0].url} 
            type={data.activity.resources[0].type} 
          />
        )}
        
        <QuestionSection 
          questions={data.activity.questions || []} 
          currentStep={currentStep} 
          onSubmit={handleSubmit} 
        />
      </View>
    </SafeAreaView>
  );
};

export default DailyActivityScreen;
```

## Beneficios de la Nueva Estructura

1. **Organización Clara**: Cada archivo tiene un propósito específico y está ubicado en un directorio que refleja su función.

2. **Importaciones Simplificadas**: Los archivos de barril (index.ts) permiten importaciones más limpias.

3. **Separación de Responsabilidades**: La lógica de negocio, la UI y la comunicación con API están claramente separadas.

4. **Reutilización**: Los componentes y hooks están diseñados para ser reutilizables.

5. **Mantenibilidad**: Es fácil encontrar y modificar código relacionado con una característica específica.

6. **Escalabilidad**: Nuevas características pueden agregarse siguiendo el mismo patrón sin afectar a las existentes.

7. **Documentación**: El código está bien documentado con JSDoc, facilitando su comprensión y mantenimiento.

## Conclusión

Este ejemplo muestra cómo la nueva arquitectura propuesta mejora significativamente la organización, mantenibilidad y escalabilidad del código. La estructura feature-first permite un desarrollo más eficiente y facilita la colaboración entre equipos, mientras que la separación clara de responsabilidades hace que el código sea más fácil de entender y mantener.