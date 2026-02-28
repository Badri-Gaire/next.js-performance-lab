# DOM & Virtual-DOM Feature

## Overview
This feature demonstrates the internal workings of the Document Object Model (DOM) and the Virtual-DOM (VDOM) abstraction used by frameworks like React and Next.js.

## Educational Goals
1. **Understand Reconciliation**: Show how React creates a new VDOM tree on state changes.
2. **Visualize Diffing**: Direct comparison between "Old VDOM" and "New VDOM" and the resulting "Patches".
3. **Compare Frameworks**: Explain why some frameworks (React) use VDOM while others (Solid, Svelte) skip it for fine-grained reactivity or compile-time optimizations.

## Components
- `DomVdomDemo`: The main interactive workshop.
- `TreeVisualizer`: An animated tree renderer for VNodes.
- `DiffStepper`: A step-by-step progress visualizer for the diffing lifecycle.
- `vdomDiff`: A lightweight educational implementation of the Reconciliation algorithm.

## Performance Insight
The "Reconciliation" phase is a trade-off. While it reduces the number of direct DOM writes (which are expensive), the diffing process itself happens in the JavaScript main thread. New frameworks like Solid and Svelte learn from this by moving the logic to the compilation phase.
