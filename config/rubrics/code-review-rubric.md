# Rúbrica de Revisión de Código

## Información General
- **Versión**: 1.0
- **Fecha de creación**: 2025-09-26
- **Escala de puntuación**: 1-10 (donde 10 es excelente)
- **Puntuación mínima para aprobar**: 7

## Categorías de Evaluación

### 1. Calidad de Código (Peso: 25%)

#### Excelente (9-10 puntos)
- Código limpio, legible y bien estructurado
- Seguimiento consistente de convenciones de nomenclatura
- Funciones y clases con responsabilidad única
- Código DRY (Don't Repeat Yourself)
- Uso apropiado de patrones de diseño

#### Bueno (7-8 puntos)
- Código mayormente limpio con algunas inconsistencias menores
- Nomenclatura generalmente consistente
- Algunas funciones podrían ser más concisas
- Duplicación mínima de código

#### Mejorable (5-6 puntos)
- Código funcional pero con problemas de legibilidad
- Inconsistencias en nomenclatura
- Algunas funciones demasiado largas o complejas
- Duplicación notable de código

#### Deficiente (1-4 puntos)
- Código difícil de leer y mantener
- Nomenclatura inconsistente o confusa
- Funciones muy largas o con múltiples responsabilidades
- Mucha duplicación de código

### 2. Arquitectura y Diseño (Peso: 20%)

#### Excelente (9-10 puntos)
- Arquitectura clara y bien definida
- Separación adecuada de responsabilidades
- Buena modularización
- Interfaces bien definidas
- Bajo acoplamiento, alta cohesión

#### Bueno (7-8 puntos)
- Arquitectura generalmente clara
- Separación de responsabilidades mayormente correcta
- Modularización adecuada con mejoras menores posibles

#### Mejorable (5-6 puntos)
- Arquitectura funcional pero no óptima
- Algunas responsabilidades mezcladas
- Módulos podrían estar mejor organizados

#### Deficiente (1-4 puntos)
- Arquitectura confusa o inexistente
- Responsabilidades mal definidas
- Alto acoplamiento entre componentes

### 3. Seguridad (Peso: 20%)

#### Excelente (9-10 puntos)
- No hay vulnerabilidades de seguridad
- Validación adecuada de inputs
- Manejo seguro de datos sensibles
- Implementación correcta de autenticación/autorización
- Logs no exponen información sensible

#### Bueno (7-8 puntos)
- Sin vulnerabilidades críticas
- Validación generalmente adecuada
- Manejo de datos sensibles mayormente correcto

#### Mejorable (5-6 puntos)
- Algunas vulnerabilidades menores
- Validación de inputs incompleta
- Logs podrían exponer información sensible

#### Deficiente (1-4 puntos)
- Vulnerabilidades de seguridad críticas
- Falta validación de inputs
- Exposición de datos sensibles

### 4. Testing (Peso: 15%)

#### Excelente (9-10 puntos)
- Cobertura de tests alta (>80%)
- Tests unitarios, de integración y E2E apropiados
- Tests bien escritos y mantenibles
- Casos edge cubiertos
- Mocking apropiado

#### Bueno (7-8 puntos)
- Cobertura de tests adecuada (60-80%)
- Tests mayormente completos
- Algunos casos edge cubiertos

#### Mejorable (5-6 puntos)
- Cobertura de tests baja (30-60%)
- Tests básicos presentes
- Faltan tests para casos edge

#### Deficiente (1-4 puntos)
- Sin tests o cobertura muy baja (<30%)
- Tests mal escritos o que no funcionan

### 5. Documentación (Peso: 10%)

#### Excelente (9-10 puntos)
- Documentación completa y actualizada
- Comentarios claros y útiles
- README informativo
- Documentación de APIs
- Ejemplos de uso

#### Bueno (7-8 puntos)
- Documentación adecuada
- Comentarios mayormente útiles
- README básico presente

#### Mejorable (5-6 puntos)
- Documentación básica
- Comentarios escasos pero presentes
- README mínimo

#### Deficiente (1-4 puntos)
- Sin documentación o muy escasa
- Comentarios inexistentes o inútiles

### 6. Performance (Peso: 10%)

#### Excelente (9-10 puntos)
- Código optimizado para performance
- Uso eficiente de memoria
- Algoritmos eficientes
- Lazy loading donde apropiado
- Sin memory leaks

#### Bueno (7-8 puntos)
- Performance generalmente buena
- Uso de memoria adecuado
- Algunos aspectos podrían optimizarse

#### Mejorable (5-6 puntos)
- Performance aceptable
- Algunas ineficiencias menores
- Uso de memoria subóptimo

#### Deficiente (1-4 puntos)
- Problemas serios de performance
- Memory leaks o uso excesivo de memoria
- Algoritmos ineficientes

## Criterios Específicos por Tecnología

### Frontend (React/Next.js)
- Uso apropiado de hooks
- Gestión correcta del state
- Optimización de renders
- Accesibilidad (a11y)
- SEO considerations

### Backend/APIs
- Validación de inputs
- Manejo de errores
- Rate limiting
- Documentación de APIs
- Versionado de APIs

### Base de Datos
- Queries optimizadas
- Índices apropiados
- Transacciones donde necesarias
- Migrations bien estructuradas

## Señales de Alerta (Descuentan puntos adicionales)

- **Hard-coded secrets o credenciales**: -5 puntos
- **Console.log o debugging code en producción**: -2 puntos
- **Commented code sin explicación**: -1 punto
- **Magic numbers sin constantes**: -1 punto
- **Funciones con más de 50 líneas**: -1 punto por función
- **Archivos con más de 500 líneas**: -2 puntos por archivo
- **Dependencias no utilizadas**: -1 punto
- **Imports no utilizados**: -1 punto

## Bonificaciones (Puntos extra)

- **Refactoring que mejora código existente**: +1 punto
- **Documentación excepcional**: +1 punto
- **Tests que cubren casos edge complejos**: +1 punto
- **Optimizaciones de performance significativas**: +2 puntos
- **Mejoras de accesibilidad**: +1 punto
- **Implementación de mejores prácticas avanzadas**: +1 punto

## Cálculo de Puntuación Final

1. Calcular puntuación ponderada por categoría
2. Aplicar descuentos por señales de alerta
3. Sumar bonificaciones (máximo +5 puntos)
4. La puntuación final debe estar entre 1-10

## Recomendaciones de Acción por Puntuación

- **9-10**: Excelente trabajo. Aprobar inmediatamente.
- **7-8**: Buen trabajo. Aprobar con comentarios menores.
- **5-6**: Necesita mejoras. Solicitar cambios antes de aprobar.
- **1-4**: Necesita trabajo significativo. Rechazar y solicitar refactoring mayor.
