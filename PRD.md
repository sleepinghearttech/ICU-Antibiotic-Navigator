# Product Requirement Document: ICU Antibiotic Navigator

## 1. Product Overview
The **ICU Antibiotic Navigator** is a high-precision clinical decision support tool designed for ICU physicians and pharmacologists. It generates optimized, guideline-based empiric antibiotic regimens for critically ill patients based on suspected infection sources, patient-specific risk factors, and renal function.

## 2. Target Audience
- ICU Physicians / Intensivists
- Clinical Pharmacologists
- Infectious Disease Specialists
- Medical Residents in critical care settings

## 3. Key Features & Functional Requirements

### 3.1. Infection Source Selection
- **Organ Systems**: Users can select multiple suspected sources (e.g., Lungs, GI, Urinary, Skin/Soft Tissue, CNS, Bone/Joint).
- **Subtypes**: Each organ system has specific subtypes (e.g., Lungs -> HAP, CAP, VAP, Aspiration).
- **Levers/Modifiers**: Clinical risk factors specific to the source (e.g., MDR Risk, MRSA Risk, Pseudomonas Risk, ESBL Risk).

### 3.2. Patient Parameter Inputs
- **Global Risk Factors**: Toggle for Septic Shock/Severe Sepsis and Prior Broad-Spectrum Antibiotic use (within 90 days).
- **Allergy Profile**: Selection for Penicillin allergy status (None, Rash/Minor, Anaphylaxis/Severe).
- **Renal Function Calculator**: Inputs for Age, Weight (kg), Serum Creatinine (mg/dL), and Gender to calculate Creatinine Clearance (CrCl) using the Cockcroft-Gault equation.

### 3.3. Guideline Modes
- **Toggle Switch**: Ability to switch between **Indian Guidelines** (ICMR, IJCCM) and **International Guidelines** (IDSA, CDC, Surviving Sepsis Campaign).
- **Auto-Regeneration**: Changing the guideline mode should automatically trigger a re-generation of the regimen if inputs are already provided.

### 3.4. AI-Driven Regimen Generation
- **Unified Regimen**: A single, consolidated antibiotic plan covering all suspected sources.
- **Alternative Regimen**: A backup plan for drug shortages or specific contraindications.
- **Isolated Regimens (Collapsible)**: A breakdown showing what the recommendation would be for each individual source if it were isolated.
- **Clinical Intelligence**:
    - Drug-Drug Interaction (DDI) alerts.
    - De-escalation roadmap.
    - Clinical pearls (PK/PD tips, loading doses).
    - Specific guideline references.
    - Renal dose adjustments based on calculated CrCl.

### 3.5. Utility Features
- **PDF Export**: Generate a clean, professional PDF report of the regimen.
- **Copy to Clipboard**: Quick copy of the full text.
- **Reset**: Clear all inputs and results.
- **Stale State Management**: Results should clear automatically when inputs change to prevent reliance on outdated guidance.

## 4. User Interface & Experience (UX)

### 4.1. Aesthetic & Design
- **Technical/Medical Precision**: The UI should feel like a high-end medical instrument—clean, dense but scannable, and authoritative.
- **Themes**: Support for Light, Dark, and a specialized "Slate" (high-contrast professional) mode.
- **Accent Colors**: Customizable UI accents (Emerald, Blue, Indigo, Rose, Slate).
- **Typography**: Use high-legibility sans-serif (e.g., Inter) with monospace accents for data values.

### 4.2. Layout
- **Dashboard View**: A split-pane or grid layout.
    - **Left/Top**: Input controls (Organ systems, Patient data).
    - **Right/Bottom**: Result display with real-time streaming text.
- **Interactive Elements**:
    - Organ system cards with custom medical icons.
    - Glassmorphism effects for headers and overlays.
    - Smooth transitions and animations (using Framer Motion/Motion).

## 5. Technical Requirements
- **Frontend**: React (TypeScript) with Tailwind CSS.
- **AI Integration**: Google Gemini API (using `@google/genai` SDK).
- **PDF Generation**: `html-to-image` and `jsPDF`.
- **Icons**: `lucide-react`.
- **State Management**: React Hooks (useState, useEffect, useMemo).

## 6. AI Prompting Logic
The system must use a sophisticated prompt that:
1.  Identifies the **Strict Guideline Mode**.
2.  Processes patient parameters (Allergy, Renal, Shock).
3.  Synthesizes multiple infection sources into a single "Unified Regimen" to avoid redundant broad-spectrum coverage (Antibiotic Stewardship).
4.  Provides specific dosing and frequencies adjusted for the calculated CrCl.
5.  Outputs in structured Markdown for rich UI rendering.

## 7. Design Goals for Claude
- **Better Visual Hierarchy**: Use whitespace and borders to separate clinical logic from patient data.
- **Enhanced Icons**: Use more descriptive or custom-styled medical iconography.
- **Mobile Responsiveness**: Ensure the "Dashboard" feel translates perfectly to mobile devices.
- **Micro-interactions**: Subtle feedback when toggling levers or selecting subtypes.
