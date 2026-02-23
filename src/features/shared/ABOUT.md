# Shared Features & Utilities

## Overview
This module contains project-wide shared components and utilities that support the rendering sandbox experience. These are designed to be reusable across any strategy-specific feature.

## Core Utilities
1. **LazyHydrate**: An Intersection Observer wrapper that delays the mounting/hydration of client components until they are visible. This is used to demonstrate performance optimization in CSR.
2. **Standardized UI**: Generic layouts and base components that maintain the premium design language (Zinc aesthetics, deep black backgrounds).

## Context
This feature isn't a specific rendering strategy but a collection of the infrastructure that makes the other demonstrations more robust.
