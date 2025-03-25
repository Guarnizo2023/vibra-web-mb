# Plan de Migración a la Nueva Arquitectura

Este documento detalla los pasos para migrar gradualmente el proyecto actual a la estructura propuesta en `propuesta-arquitectura.md`.

## Fase 1: Preparación (1-2 días)

### 1.1 Crear la Estructura Base de Directorios

```bash
# Dentro de app/
mkdir -p features/activity/{api,components,hooks,screens,store,types,utils}
mkdir -p features/auth/{api,components,hooks,screens,store,types,utils}
mkdir -p features/profile/{api,components,hooks,screens,store,types,utils}
mkdir -p features/notifications/{api,components,hooks,screens,store,types,utils}
mkdir -p shared/{components/{ui,layout},hooks,services/{api,storage},store,types,utils}
```

### 1.2 Configurar Alias de Importación

Actualizar `tsconfig.json` para incluir alias que faciliten las importaciones:

```json
{
  "compilerOptions": {
    "paths": {
      "@features/*": ["./app/features/*"],
      "@shared/*": ["./app/shared/*"],
      "@assets/*": ["./app/assets/*"],
      "@config/*": ["./config/*"]
    }
  }
}
```

### 1.3 Crear Archivos de Barril (Index)

Crear archivos `index.ts` en cada directorio principal para facilitar las importaciones:

```typescript
// Ejemplo para app/shared/components/ui/index.ts
export * from './Button';
export * from './Input';
// etc.
```

## Fase 2: Migración de Componentes Compartidos (2-3 días)

### 2.1 Identificar Componentes UI Reutilizables

1. Revisar todos los componentes en `app/components/ui/`
2. Clasificarlos según el patrón Atomic Design (átomos, moléculas, organismos)
3. Mover a `app/shared/components/ui/`

### 2.2 Migrar Layouts Compartidos

1. Identificar componentes de estructura (layouts, containers, etc.)
2. Mover a `app/shared/components/layout/`

### 2.3 Actualizar Importaciones

Actualizar todas las importaciones en los archivos que utilizan estos componentes.

## Fase 3: Migración de Servicios y Utilidades (2-3 días)

### 3.1 Refactorizar Cliente API Base

1. Mover `app/services/api.ts` a `app/shared/services/api/client.ts`
2. Refactorizar para seguir el patrón de fachada

```typescript
// app/shared/services/api/client.ts
import axios from 'axios';
import config from '@config/env.json';

const apiBaseUrl = config.development.apiBaseUrl;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

// Interceptores y configuración común

export default apiClient;
```

### 3.2 Migrar Servicios Específicos

Crear servicios específicos para cada característica:

```typescript
// app/features/activity/api/activityService.ts
import apiClient from '@shared/services/api/client';
import { Activity, PaginatedResponse } from '@features/activity/types';

export const ActivityService = {
  getDailyActivity: () => 
    apiClient.get('/activities/daily/current').then(res => res.data),
  // Otros métodos...
};
```

### 3.3 Migrar Utilidades Compartidas

1. Mover utilidades generales a `app/shared/utils/`
2. Mover utilidades específicas a sus respectivos módulos

## Fase 4: Migración de Estado (2-3 días)

### 4.1 Refactorizar Estado Global

1. Crear estructura para estado global en `app/shared/store/`
2. Migrar contextos globales (como UserContext)

### 4.2 Migrar Estado Local de Características

1. Mover `app/stores/activity.store.ts` a `app/features/activity/store/activityStore.ts`
2. Refactorizar para seguir patrones consistentes

## Fase 5: Migración de Módulo de Actividades (3-4 días)

### 5.1 Migrar Tipos

1. Mover `app/types/activity.ts` y `app/types/api.ts` a `app/features/activity/types/`
2. Refactorizar y mejorar definiciones de tipos

### 5.2 Migrar Componentes

1. Mover componentes de `app/components/activity/` a `app/features/activity/components/`
2. Separar en componentes y pantallas según corresponda

### 5.3 Migrar Hooks y Queries

1. Mover `app/components/activity/queries/` a `app/features/activity/hooks/`
2. Refactorizar para utilizar los nuevos servicios

## Fase 6: Migración de Otros Módulos (3-4 días por módulo)

Repetir el proceso para cada módulo funcional (auth, profile, notifications, etc.)

## Fase 7: Pruebas y Ajustes (3-4 días)

### 7.1 Pruebas Funcionales

1. Verificar que todas las funcionalidades sigan operando correctamente
2. Corregir problemas de importación o referencias

### 7.2 Optimizaciones

1. Identificar oportunidades de mejora en la nueva estructura
2. Implementar mejoras adicionales

## Fase 8: Documentación (2-3 días)

### 8.1 Actualizar README

Actualizar la documentación principal del proyecto con la nueva estructura

### 8.2 Documentar Convenciones

Crear guías de estilo y convenciones para el desarrollo futuro

## Cronograma Estimado

- **Fase 1**: 1-2 días
- **Fase 2**: 2-3 días
- **Fase 3**: 2-3 días
- **Fase 4**: 2-3 días
- **Fase 5**: 3-4 días
- **Fase 6**: 3-4 días por módulo (estimado 9-12 días para 3 módulos)
- **Fase 7**: 3-4 días
- **Fase 8**: 2-3 días

**Total estimado**: 24-34 días laborables (5-7 semanas)

## Recomendaciones para la Implementación

- Utilizar ramas de Git separadas para cada fase
- Realizar revisiones de código después de cada fase
- Mantener la aplicación funcional en todo momento
- Implementar pruebas automatizadas durante la migración
- Documentar decisiones importantes y cambios en la arquitectura