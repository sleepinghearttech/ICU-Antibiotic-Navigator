import React, { useState, useCallback, useMemo } from 'react';
import { 
  Stethoscope, 
  ShieldAlert, 
  History, 
  AlertCircle, 
  Activity, 
  Wind, 
  Droplets, 
  Brain, 
  Zap,
  Loader2,
  RefreshCcw,
  CheckCircle2,
  Info,
  Heart,
  Eye,
  Microscope,
  Layers,
  ChevronDown,
  ChevronUp,
  Crosshair,
  Thermometer,
  UserPlus,
  Syringe,
  Waves,
  Bug,
  Dna,
  Settings2,
  Copy,
  Check,
  Globe,
  Ear,
  ShieldCheck,
  FlaskConical,
  Tablets,
  Database,
  UserCog,
  Scale,
  User,
  Palette,
  Calculator,
  Beaker,
  Scissors,
  Smile,
  Shield,
  HeartPulse,
  ArrowRightLeft,
  BookOpen,
  AlertTriangle,
  Download,
  Moon,
  Sun,
  Lightbulb,
  Clock,
  Flame,
  GripVertical,
  Search,
  MessageSquare,
  Send,
  Mic,
  MicOff,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { GoogleGenAI } from '@google/genai';
import { cn } from './lib/utils';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';

// --- Custom Medical Icons (SVG) ---

const LungsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v5" />
    <path d="M12 8c-1.5 1-3.5 1-5.5 2-2.5 1.5-3.5 4-3.5 7.5 0 3.5 2.5 5.5 6 5.5h1c1 0 2-1 2-2V8z" />
    <path d="M12 8c1.5 1 3.5 1 5.5 2 2.5 1.5 3.5 4 3.5 7.5 0 3.5-2.5 5.5-6 5.5h-1c-1 0-2-1-2-2V8z" />
    <path d="M9 12c-1 0-2 1-2 2s1 2 2 2" />
    <path d="M15 12c1 0 2 1 2 2s-1 2-2 2" />
    <path d="M8 15c-1 0-2 1-2 2" />
    <path d="M16 15c1 0 2 1 2 2" />
  </svg>
);

const StomachIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2c0 2 0 4 0 4" />
    <path d="M12 6c-4 0-7 2-7 7 0 5 4 9 9 9s7-4 7-9c0-3-2-6-5-7-1-.5-2-1-4-1z" />
    <path d="M14 18c-1 1-3 1-4 0" />
    <path d="M17 18l2 2" />
  </svg>
);

const BladderIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 2l1 4" />
    <path d="M16 2l-1 4" />
    <path d="M12 6c-5 0-8 4-8 8 0 5 4 9 8 9s8-4 8-9c0-4-3-8-8-8z" />
    <path d="M12 21v2" />
  </svg>
);

const UterusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21v-7" />
    <path d="M12 14c-3.5 0-6-3-6-6.5S8.5 2 12 2s6 2 6 5.5-2.5 6.5-6 6.5z" />
    <path d="M6 7.5C4 7.5 2 6 2 4" />
    <path d="M18 7.5c2 0 4-1.5 4-3.5" />
    <circle cx="2" cy="4" r="1" />
    <circle cx="22" cy="4" r="1" />
  </svg>
);

const BoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1 0-2-1-2-1l-6 6s1 1 1 2a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3c1 0 2 1 2 1l6-6s-1-1-1-2a3 3 0 0 1 3-3z" />
    <path d="M18.5 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    <path d="M5.5 19.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const ToothIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 3h10c1.5 0 2.5 1.5 2.5 3.5v4c0 4.5-2.5 7-5 9l-1 4.5h-3l-1-4.5c-2.5-2-5-4.5-5-9V6.5C4.5 4.5 5.5 3 7 3z" />
    <path d="M10 3v5" />
    <path d="M14 3v5" />
  </svg>
);

const ScalpelIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l16-16" />
    <path d="M19 5l2-2-2-2-2 2 2 2z" />
    <path d="M15 9l-5 5" />
    <path d="M18 6l-3 3" />
  </svg>
);

const FungiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21v-9" />
    <path d="M12 12l-5-5m5 5l5-5" />
    <path d="M7 7l-2-2m2 2l2-2" />
    <path d="M17 7l2-2m-2 2l-2-2" />
    <circle cx="5" cy="5" r="1" />
    <circle cx="19" cy="5" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="15" cy="5" r="1" />
  </svg>
);

const BacteriaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h12a2 2 0 0 1 0 4H4a2 2 0 0 1 0-4z" />
    <path d="M8 16h12a2 2 0 0 1 0 4H8a2 2 0 0 1 0-4z" />
    <path d="M2 4h12a2 2 0 0 1 0 4H2a2 2 0 0 1 0-4z" />
    <path d="M16 12l2 2" />
    <path d="M20 18l2 2" />
    <path d="M14 6l2 2" />
  </svg>
);

const EntOcularIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="7" cy="12" r="5" />
    <circle cx="7" cy="12" r="1.5" />
    <path d="M16 8c2.5 0 5 2.5 5 5s-2.5 5-5 5" />
    <path d="M18 10c1.5 0 3 1.5 3 3s-1.5 3-3 3" />
    <path d="M19 13h2" />
  </svg>
);

// --- Types ---

type AllergyStatus = 'None' | 'Non-mild' | 'Severe';

interface SystemLever {
  id: string;
  label: string;
}

interface SystemSubtype {
  id: string;
  label: string;
}

interface OrganSystem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subtypes: SystemSubtype[];
  levers: SystemLever[];
}

// --- Constants ---

const ICU_ANTIBIOTICS = [
  "Ceftriaxone",
  "Piperacillin/Tazobactam",
  "Meropenem",
  "Vancomycin",
  "Linezolid",
  "Levofloxacin",
  "Metronidazole",
  "Amoxicillin/Clavulanate",
  "Cefepime",
  "Azithromycin",
  "Ciprofloxacin",
  "Clindamycin",
  "Doxycycline",
  "Ertapenem",
  "Gentamicin",
  "Imipenem/Cilastatin",
  "Tigecycline",
  "Colistin",
  "Teicoplanin",
  "Daptomycin"
];

const ORGAN_SYSTEMS: OrganSystem[] = [
  {
    id: 'respiratory',
    label: 'Respiratory',
    icon: <LungsIcon />,
    subtypes: [
      { id: 'cap', label: 'CAP' },
      { id: 'hap', label: 'HAP' },
      { id: 'vap', label: 'VAP' },
      { id: 'vat', label: 'VAT (Tracheobronchitis)' },
      { id: 'atypical', label: 'Atypical Pneumonia' },
      { id: 'empyema', label: 'Empyema/Abscess' },
      { id: 'copd_ae', label: 'AE-COPD' },
      { id: 'aspiration_pneu', label: 'Aspiration Pneumonitis' },
      { id: 'lung_abscess', label: 'Lung Abscess' },
    ],
    levers: [
      { id: 'mrsa_risk', label: 'MRSA Risk' },
      { id: 'pseudomonas_risk', label: 'Pseudomonas Risk' },
      { id: 'aspiration', label: 'Aspiration' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'recent_flu', label: 'Post-Flu' },
      { id: 'structural_lung', label: 'Structural Lung Disease' },
      { id: 'recent_hosp', label: 'Recent Hosp (>48h)' },
      { id: 'prior_pseudomonas', label: 'Prior Pseudomonas' },
    ],
  },
  {
    id: 'tb',
    label: 'Tuberculosis',
    icon: <BacteriaIcon />,
    subtypes: [
      { id: 'pulmonary_tb', label: 'Pulmonary TB' },
      { id: 'miliary_tb', label: 'Miliary TB' },
      { id: 'cns_tb', label: 'CNS TB' },
      { id: 'mdr_tb', label: 'Suspected MDR-TB' },
      { id: 'extra_pulmonary', label: 'Extra-pulmonary TB' },
    ],
    levers: [
      { id: 'prior_treatment', label: 'Prior TB Treatment' },
      { id: 'hiv_positive', label: 'HIV Positive' },
      { id: 'contact_history', label: 'MDR Contact' },
      { id: 'steroid_use', label: 'Steroid Use' },
      { id: 'diabetes', label: 'Uncontrolled Diabetes' },
    ],
  },
  {
    id: 'abdominal',
    label: 'Abdominal',
    icon: <StomachIcon />,
    subtypes: [
      { id: 'peritonitis', label: 'Peritonitis' },
      { id: 'sbp', label: 'SBP (Spontaneous)' },
      { id: 'biliary', label: 'Biliary Sepsis' },
      { id: 'abscess', label: 'IA Abscess' },
      { id: 'liver_abscess', label: 'Liver Abscess' },
      { id: 'c_diff', label: 'C. diff (Severe)' },
      { id: 'pancreatitis', label: 'Infected Pancreatitis' },
      { id: 'ischemic_bowel', label: 'Ischemic Bowel' },
      { id: 'typhlitis', label: 'Typhlitis' },
    ],
    levers: [
      { id: 'esbl_risk', label: 'ESBL Risk' },
      { id: 'recent_surgery', label: 'Recent GI Surgery' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'vre_risk', label: 'VRE Risk' },
      { id: 'tertiary_peritonitis', label: 'Tertiary Peritonitis' },
      { id: 'cirrhosis', label: 'Cirrhosis/Ascites' },
      { id: 'cpe_risk', label: 'CPE Risk' },
    ],
  },
  {
    id: 'endovascular',
    label: 'Endovascular',
    icon: <Heart className="w-4 h-4" />,
    subtypes: [
      { id: 'crbsi', label: 'CRBSI/CLABSI' },
      { id: 'ie', label: 'Endocarditis' },
      { id: 'pacemaker', label: 'CIED/Pacemaker' },
      { id: 'unknown', label: 'Unknown Source' },
      { id: 'neutropenic', label: 'Neutropenic Sepsis' },
      { id: 'thrombophlebitis', label: 'Suppurative Thrombophlebitis' },
      { id: 'mycotic_aneurysm', label: 'Mycotic Aneurysm' },
    ],
    levers: [
      { id: 'prosthetic_valve', label: 'Prosthetic Valve' },
      { id: 'ivdu', label: 'IV Drug Use' },
      { id: 'central_line', label: 'Central Line' },
      { id: 'cpe_risk', label: 'CPE/MDR Risk' },
      { id: 'dialysis_access', label: 'Dialysis Access' },
      { id: 'vascular_graft', label: 'Vascular Graft' },
    ],
  },
  {
    id: 'urinary',
    label: 'Urinary',
    icon: <BladderIcon />,
    subtypes: [
      { id: 'cystitis', label: 'Cystitis' },
      { id: 'pyelonephritis', label: 'Pyelonephritis' },
      { id: 'urosepsis', label: 'Urosepsis' },
      { id: 'renal_abscess', label: 'Renal/Perinephric Abscess' },
      { id: 'pyonephrosis', label: 'Pyonephrosis' },
      { id: 'cauti', label: 'CAUTI' },
      { id: 'prostatitis', label: 'Prostatitis' },
      { id: 'emphysematous_pyelo', label: 'Emphysematous Pyelo' },
    ],
    levers: [
      { id: 'esbl_risk', label: 'ESBL Risk' },
      { id: 'structural', label: 'Structural Abnormality' },
      { id: 'mdr_risk', label: 'MDR Risk' },
      { id: 'recent_instrumentation', label: 'Recent Procedure' },
      { id: 'pregnancy', label: 'Pregnancy' },
      { id: 'nephrolithiasis', label: 'Nephrolithiasis' },
      { id: 'catheter', label: 'Indwelling Catheter' },
    ],
  },
  {
    id: 'cns',
    label: 'CNS',
    icon: <Brain className="w-4 h-4" />,
    subtypes: [
      { id: 'meningitis', label: 'Meningitis' },
      { id: 'encephalitis', label: 'Encephalitis' },
      { id: 'abscess', label: 'Brain Abscess' },
      { id: 'shunt', label: 'Shunt Infection' },
      { id: 'ventriculitis', label: 'Ventriculitis' },
      { id: 'spinal_abscess', label: 'Spinal Abscess' },
    ],
    levers: [
      { id: 'post_neurosurgery', label: 'Post-Neurosurgery' },
      { id: 'trauma', label: 'Head Trauma' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'listeria_risk', label: 'Listeria Risk' },
      { id: 'csf_leak', label: 'CSF Leak' },
    ],
  },
  {
    id: 'skin',
    label: 'Skin/Soft Tissue',
    icon: <Layers className="w-4 h-4" />,
    subtypes: [
      { id: 'cellulitis', label: 'Cellulitis' },
      { id: 'necfasc', label: 'Necrotizing Fasciitis' },
      { id: 'fournier', label: 'Fournier Gangrene' },
      { id: 'diabetic_foot', label: 'Diabetic Foot' },
      { id: 'bite', label: 'Animal/Human Bite' },
      { id: 'erysipelas', label: 'Erysipelas' },
      { id: 'tss', label: 'Toxic Shock (TSS)' },
      { id: 'purpura', label: 'Purpura Fulminans' },
    ],
    levers: [
      { id: 'mrsa_risk', label: 'MRSA Risk' },
      { id: 'pseudomonas_risk', label: 'Pseudomonas Risk' },
      { id: 'necrotizing_features', label: 'Necrotizing Features' },
      { id: 'animal_bite', label: 'Animal/Human Bite' },
      { id: 'water_exposure', label: 'Water Exposure' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'gas_risk', label: 'GAS/Toxic Shock' },
      { id: 'clostridial', label: 'Clostridial Myonecrosis' },
      { id: 'lymphedema', label: 'Lymphedema' },
      { id: 'ivdu', label: 'IVDU' },
    ],
  },
  {
    id: 'ent_ocular',
    label: 'ENT / Ocular',
    icon: <EntOcularIcon />,
    subtypes: [
      { id: 'sinusitis', label: 'Sinusitis' },
      { id: 'epiglottitis', label: 'Epiglottitis' },
      { id: 'neck_space', label: 'Deep Neck Space' },
      { id: 'endophthalmitis', label: 'Endophthalmitis' },
      { id: 'orbital_cellulitis', label: 'Orbital Cellulitis' },
    ],
    levers: [
      { id: 'odontogenic', label: 'Odontogenic' },
      { id: 'recent_intubation', label: 'Recent Intubation' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'fungal_risk', label: 'Fungal Risk' },
    ],
  },
  {
    id: 'pelvic',
    label: 'Pelvic / OBG',
    icon: <UterusIcon />,
    subtypes: [
      { id: 'pid', label: 'PID' },
      { id: 'post_partum', label: 'Post-partum Sepsis' },
      { id: 'chorioamnionitis', label: 'Chorioamnionitis' },
      { id: 'pelvic_abscess', label: 'Pelvic Abscess' },
      { id: 'endometritis', label: 'Endometritis' },
      { id: 'septic_abortion', label: 'Septic Abortion' },
      { id: 'pelvic_cellulitis', label: 'Pelvic Cellulitis' },
    ],
    levers: [
      { id: 'recent_procedure', label: 'Recent Procedure' },
      { id: 'sti_risk', label: 'STI Risk' },
      { id: 'retained_products', label: 'Retained Products' },
      { id: 'pregnancy', label: 'Active Pregnancy' },
      { id: 'iud', label: 'IUD in situ' },
    ],
  },
  {
    id: 'bone',
    label: 'Bone / Joint',
    icon: <BoneIcon />,
    subtypes: [
      { id: 'osteomyelitis', label: 'Osteomyelitis' },
      { id: 'septic_arthritis', label: 'Septic Arthritis' },
      { id: 'prosthetic_joint', label: 'Prosthetic Joint Infection' },
    ],
    levers: [
      { id: 'mrsa_risk', label: 'MRSA Risk' },
      { id: 'prosthetic_material', label: 'Prosthetic Material' },
      { id: 'chronic_osteomyelitis', label: 'Chronic Osteomyelitis' },
      { id: 'recent_trauma', label: 'Recent Trauma' },
      { id: 'sickle_cell', label: 'Sickle Cell' },
      { id: 'chronic_wound', label: 'Chronic Wound' },
      { id: 'ivdu', label: 'IV Drug Use' },
    ],
  },
  {
    id: 'tropical',
    label: 'Tropical / Travel',
    icon: <Globe className="w-4 h-4" />,
    subtypes: [
      { id: 'leptospirosis', label: 'Leptospirosis' },
      { id: 'melioidosis', label: 'Melioidosis' },
      { id: 'malaria', label: 'Severe Malaria' },
      { id: 'scrub_typhus', label: 'Scrub Typhus' },
      { id: 'enteric_fever', label: 'Enteric Fever (Typhoid)' },
    ],
    levers: [
      { id: 'water_exposure', label: 'Water/Soil Exposure' },
      { id: 'recent_travel', label: 'Recent Travel' },
      { id: 'animal_exposure', label: 'Animal Exposure' },
      { id: 'monsoon', label: 'Monsoon Season' },
    ],
  },
  {
    id: 'fungal',
    label: 'Fungal / Opportunistic',
    icon: <FungiIcon />,
    subtypes: [
      { id: 'candidemia', label: 'Candidemia' },
      { id: 'aspergillosis', label: 'Aspergillosis' },
      { id: 'mucormycosis', label: 'Mucormycosis' },
      { id: 'pcp', label: 'PCP (Pneumocystis)' },
    ],
    levers: [
      { id: 'neutropenia', label: 'Neutropenia' },
      { id: 'steroids', label: 'High-dose Steroids' },
      { id: 'tpn', label: 'TPN Use' },
      { id: 'broad_spectrum', label: 'Prior Broad Spectrum' },
    ],
  },
  {
    id: 'viral',
    label: 'Viral / Emerging',
    icon: <Bug className="w-4 h-4" />,
    subtypes: [
      { id: 'influenza', label: 'Severe Influenza' },
      { id: 'covid', label: 'Severe COVID-19' },
      { id: 'dengue', label: 'Dengue Shock' },
      { id: 'hsv', label: 'HSV Encephalitis' },
    ],
    levers: [
      { id: 'outbreak', label: 'Local Outbreak' },
      { id: 'travel', label: 'Recent Travel' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
    ],
  },
  {
    id: 'dental',
    label: 'Dental / Oral',
    icon: <ToothIcon />,
    subtypes: [
      { id: 'ludwig', label: 'Ludwig Angina' },
      { id: 'dental_abscess', label: 'Dental Abscess' },
      { id: 'periodontitis', label: 'Severe Periodontitis' },
      { id: 'necrotizing_gingivitis', label: 'Necrotizing Gingivitis' },
      { id: 'periapical_cellulitis', label: 'Periapical Cellulitis' },
    ],
    levers: [
      { id: 'odontogenic', label: 'Odontogenic Source' },
      { id: 'immunocompromised', label: 'Immunocompromised' },
      { id: 'recent_extraction', label: 'Recent Extraction' },
      { id: 'anaerobic_risk', label: 'High Anaerobic Risk' },
    ],
  },
  {
    id: 'surgical',
    label: 'Surgical / Trauma',
    icon: <ScalpelIcon />,
    subtypes: [
      { id: 'ssi', label: 'Surgical Site (SSI)' },
      { id: 'post_op_peritonitis', label: 'Post-Op Peritonitis' },
      { id: 'trauma_sepsis', label: 'Trauma Sepsis' },
      { id: 'burns', label: 'Burn Infection' },
      { id: 'prophylaxis', label: 'Surgical Prophylaxis' },
      { id: 'mediastinitis', label: 'Mediastinitis' },
      { id: 'post_craniotomy', label: 'Post-Craniotomy' },
    ],
    levers: [
      { id: 'implant', label: 'Prosthetic/Implant' },
      { id: 'necrotic', label: 'Necrotic Tissue' },
      { id: 'recent_major_op', label: 'Recent Major Op' },
      { id: 'mdr_colonization', label: 'Known MDR Carrier' },
      { id: 'open_fracture', label: 'Open Fracture' },
      { id: 'bowel_prep', label: 'Bowel Prep Failure' },
      { id: 're_exploration', label: 'Re-exploration' },
      { id: 'massive_transfusion', label: 'Massive Transfusion' },
    ],
  },
];

// --- Components ---

const TogglePill = React.memo(({ 
  label, 
  active, 
  onClick, 
  icon: Icon,
  theme = 'slate'
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
  icon?: any;
  theme?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all duration-200 text-[9px] font-bold uppercase tracking-wider",
      active 
        ? (theme === 'dark' ? "bg-slate-100 border-slate-100 text-slate-950 shadow-sm" : "bg-slate-950 border-slate-950 text-white shadow-sm")
        : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-500 hover:bg-slate-700" : "bg-white border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50")
    )}
  >
    {Icon && <Icon className="w-3 h-3" />}
    {label}
  </button>
));

const RadioGroup = React.memo(({ 
  options, 
  value, 
  onChange,
  theme = 'slate'
}: { 
  options: string[]; 
  value: string; 
  onChange: (val: any) => void;
  theme?: string;
}) => (
  <div className={cn(
    "flex p-0.5 rounded border transition-colors",
    theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
  )}>
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={cn(
          "flex-1 px-2 py-0.5 rounded text-[8px] font-black transition-all duration-200 uppercase tracking-tighter",
          value === opt 
            ? (theme === 'dark' ? "bg-slate-100 text-slate-950 shadow-sm" : "bg-white text-slate-950 shadow-sm")
            : (theme === 'dark' ? "text-slate-100 hover:text-white" : "text-slate-900 hover:text-black")
        )}
      >
        {opt}
      </button>
    ))}
  </div>
));

const CollapsibleSection = React.memo(({ 
  title, 
  isOpen, 
  onToggle, 
  icon: Icon,
  children,
  accentColor = 'slate',
  theme = 'slate'
}: { 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void;
  icon: any;
  children: React.ReactNode;
  accentColor?: string;
  theme?: string;
}) => (
  <div className={cn(
    "px-6 py-4 border-b transition-colors",
    theme === 'dark' ? "border-slate-800 bg-slate-900/50" : "border-slate-100 bg-slate-50/30"
  )}>
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full group"
    >
      <div className="flex items-center gap-2">
        <Icon className={cn(
          "w-4 h-4 transition-colors",
          theme === 'dark' ? "text-slate-100 group-hover:text-white" : "text-slate-900 group-hover:text-black"
        )} />
        <span className={cn(
          "text-xs font-black uppercase tracking-widest transition-colors",
          theme === 'dark' ? "text-slate-100 group-hover:text-white" : "text-slate-900 group-hover:text-black"
        )}>{title}</span>
      </div>
      {isOpen ? 
        <ChevronUp className="w-4 h-4 text-slate-400" /> : 
        <ChevronDown className="w-4 h-4 text-slate-400" />
      }
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className={cn(
            "mt-4 p-4 rounded-xl border space-y-3",
            theme === 'dark' ? "bg-slate-800/50 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-800",
          )}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

export default function App() {
  // --- State ---
  const [septicShock, setSepticShock] = useState(false);
  const [priorAbx, setPriorAbx] = useState(false);
  const [allergy, setAllergy] = useState<AllergyStatus>('None');
  
  // Patient Profile / Renal
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [creatinine, setCreatinine] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [subtypes, setSubtypes] = useState<Record<string, string[]>>({});
  const [levers, setLevers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'slate'>('slate');
  const [accentColor, setAccentColor] = useState<'slate' | 'emerald' | 'blue' | 'indigo' | 'rose'>('slate');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [guidelineMode, setGuidelineMode] = useState<'indian' | 'international'>('indian');
  const [showAlternative, setShowAlternative] = useState(false);
  const [showIsolated, setShowIsolated] = useState(false);
  const [showInvestigations, setShowInvestigations] = useState(false);
  const [showRationale, setShowRationale] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const [showDDI, setShowDDI] = useState(false);
  const [showDeEscalation, setShowDeEscalation] = useState(false);
  const [showPearls, setShowPearls] = useState(false);
  const [showGuideline, setShowGuideline] = useState(false);
  const [showPathogenMatrix, setShowPathogenMatrix] = useState(false);

  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [isParsingVoice, setIsParsingVoice] = useState(false);
  const [voiceReview, setVoiceReview] = useState<{ summary: string; data: any } | null>(null);
  const recognitionRef = React.useRef<any>(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Prior Antibiotics Details
  const [priorAbxDrugs, setPriorAbxDrugs] = useState<string[]>([]);
  const [priorAbxDuration, setPriorAbxDuration] = useState<string>('');
  const [wantsUpgrade, setWantsUpgrade] = useState(false);

  // DDI Search
  const [ddiSearchQuery, setDdiSearchQuery] = useState('');
  const [ddiSearchResult, setDdiSearchResult] = useState<string | null>(null);
  const [isSearchingDDI, setIsSearchingDDI] = useState(false);

  // Refinement Chat State
  const [refinementHistory, setRefinementHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [refinementInput, setRefinementInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const chatRef = React.useRef<any>(null);

  // --- Handlers ---
  const [copied, setCopied] = useState(false);

  const crclValue = useMemo(() => {
    if (!age || !weight || !creatinine) return null;
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const c = parseFloat(creatinine);
    if (isNaN(a) || isNaN(w) || isNaN(c) || c === 0) return null;
    
    let crcl = ((140 - a) * w) / (72 * c);
    if (gender === 'Female') crcl *= 0.85;
    return Math.round(crcl);
  }, [age, weight, creatinine, gender]);

  const renalStatus = useMemo(() => {
    if (crclValue === null) return 'Normal';
    if (crclValue < 15) return 'ESRD/Dialysis';
    if (crclValue < 30) return 'Severe Impairment';
    if (crclValue < 60) return 'Moderate Impairment';
    return 'Normal';
  }, [crclValue]);

  const spectrumData = useMemo(() => {
    if (!result || !result.includes('### SPECTRUM OF ACTIVITY')) return [];
    const section = result.split('### SPECTRUM OF ACTIVITY')[1]?.split('###')[0];
    const lines = section?.split('\n').filter(l => l.includes(':'));
    return lines?.map(l => {
      const parts = l.split(':');
      const subject = parts[0].replace(/^[-*]\s*/, '').trim();
      const score = parseInt(parts[1]?.replace(/[^0-9]/g, '')) || 0;
      return {
        subject,
        A: score,
        fullMark: 100,
      };
    }) || [];
  }, [result]);

  const copyToClipboard = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result]);

  const exportToPDF = useCallback(async () => {
    const element = document.getElementById('regimen-result');
    if (!element) return;

    try {
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [img.width / 2, img.height / 2]
      });
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width / 2, img.height / 2);
      pdf.save(`Antibiotic_Regimen_${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error('PDF Export Error:', err);
    }
  }, [theme]);

  const toggleSystem = useCallback((id: string) => {
    setSelectedSystems(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }, []);

  const toggleSubtype = useCallback((systemId: string, subtypeId: string) => {
    setSubtypes(prev => {
      const current = prev[systemId] || [];
      const next = current.includes(subtypeId)
        ? current.filter(id => id !== subtypeId)
        : [...current, subtypeId];
      return { ...prev, [systemId]: next };
    });
  }, []);

  const toggleLever = useCallback((systemId: string, leverId: string) => {
    setLevers(prev => {
      const current = prev[systemId] || [];
      const next = current.includes(leverId) 
        ? current.filter(l => l !== leverId) 
        : [...current, leverId];
      return { ...prev, [systemId]: next };
    });
  }, []);

  const isManuallyStoppingRef = React.useRef(false);

  const startVoiceInput = useCallback(() => {
    if (isListening) {
      isManuallyStoppingRef.current = true;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const SpeechGrammarList = (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    // Add medical grammar to help recognition
    if (SpeechGrammarList) {
      const grammar = `#JSGF V1.0; grammar medical; public <antibiotic> = ${ICU_ANTIBIOTICS.join(' | ')} ;`;
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = speechRecognitionList;
    }

    let finalTranscript = '';
    isManuallyStoppingRef.current = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setVoiceTranscript("");
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setVoiceTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        setError("Microphone access was denied. Please check your browser settings.");
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        // Ignore or handle
      } else {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    recognition.onend = async () => {
      if (isManuallyStoppingRef.current) {
        setIsListening(false);
        recognitionRef.current = null;
        if (finalTranscript.trim()) {
          await parseVoiceContext(finalTranscript);
        }
      } else if (isListening) {
        // Auto-restart if it ended unexpectedly but we are still "listening"
        try {
          recognition.start();
        } catch (e) {
          console.error("Failed to restart recognition:", e);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
        recognitionRef.current = null;
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Speech recognition start error:", err);
      setError("Failed to start speech recognition.");
      setIsListening(false);
    }
  }, [isListening]);

  const parseVoiceContext = async (transcript: string) => {
    if (!transcript.trim()) return;
    setIsParsingVoice(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Build a comprehensive dictionary for the AI
      const medicalDictionary = [
        ...ICU_ANTIBIOTICS,
        ...ORGAN_SYSTEMS.map(s => s.label),
        ...ORGAN_SYSTEMS.flatMap(s => s.subtypes.map(st => st.label)),
        ...ORGAN_SYSTEMS.flatMap(s => s.levers.map(l => l.label)),
        "Septic Shock", "Severe Sepsis", "Creatinine", "Renal", "Allergy", "Penicillin", "Broad-spectrum"
      ].join(', ');

      const prompt = `
        You are an expert medical scribe and ICU specialist. Parse the following clinician's dictation into structured data and a point-wise summary.
        
        Transcript: "${transcript}"
        
        MEDICAL DICTIONARY (Use this to map misheard words to correct terms):
        ${medicalDictionary}
        
        AVAILABLE SYSTEMS & IDs:
        ${ORGAN_SYSTEMS.map(s => `- ${s.label} (ID: ${s.id})`).join('\n')}
        
        JSON Schema for 'data':
        {
          "age": string (number),
          "weight": string (number),
          "creatinine": string (number),
          "gender": "Male" | "Female",
          "septicShock": boolean,
          "priorAbx": boolean,
          "allergy": "None" | "Non-mild" | "Severe",
          "selectedSystems": string[] (IDs from the list above),
          "subtypes": Record<systemId, string[]> (subtype IDs),
          "levers": Record<systemId, string[]> (lever IDs)
        }
        
        INSTRUCTIONS:
        1. Map misheard words in the transcript to the most likely medical term from the dictionary.
           Example: "neuropian" -> "Meropenem", "sector an accident" -> "Ceftriaxone", "urinary success" -> "Urinary Sepsis".
        2. Extract patient parameters (age, weight, creatinine, etc.).
        3. Identify the suspected organ systems, subtypes, and modifiers (levers).
        4. Return a JSON object with two fields:
           - "summary": A point-wise Markdown summary of the findings. Mention any corrections made (e.g., "Interpreted 'neuropian' as Meropenem").
           - "data": The parsed JSON object matching the schema.
        
        Only return the JSON object.
      `;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      
      if (response.text) {
        const result = JSON.parse(response.text);
        setVoiceReview(result);
      }
      
    } catch (err) {
      console.error("Error parsing voice context:", err);
      setError("Failed to parse voice context. Please review manually.");
    } finally {
      setIsParsingVoice(false);
    }
  };

  const [shouldAutoGenerate, setShouldAutoGenerate] = useState(false);

  const acceptVoiceReview = () => {
    if (!voiceReview) return;
    const { data } = voiceReview;
    
    if (data.age) setAge(data.age);
    if (data.weight) setWeight(data.weight);
    if (data.creatinine) setCreatinine(data.creatinine);
    if (data.gender) setGender(data.gender);
    if (data.septicShock !== undefined) setSepticShock(data.septicShock);
    if (data.priorAbx !== undefined) setPriorAbx(data.priorAbx);
    if (data.allergy) setAllergy(data.allergy);
    
    if (data.selectedSystems) {
      setSelectedSystems(prev => [...new Set([...prev, ...data.selectedSystems])]);
    }
    
    if (data.subtypes) {
      setSubtypes(prev => {
        const next = { ...prev };
        Object.entries(data.subtypes).forEach(([sysId, stIds]) => {
          next[sysId] = [...new Set([...(next[sysId] || []), ...(stIds as string[])])];
        });
        return next;
      });
    }
    
    if (data.levers) {
      setLevers(prev => {
        const next = { ...prev };
        Object.entries(data.levers).forEach(([sysId, lIds]) => {
          next[sysId] = [...new Set([...(next[sysId] || []), ...(lIds as string[])])];
        });
        return next;
      });
    }
    
    setVoiceReview(null);
    setShouldAutoGenerate(true);
  };

  const generateRegimen = useCallback(async () => {
    if (selectedSystems.length === 0) {
      setError("Please select at least one organ system.");
      return;
    }

    // --- Intelligent Caching ---
    const cacheKey = JSON.stringify({
      selectedSystems,
      subtypes,
      levers,
      septicShock,
      priorAbx,
      allergy,
      age,
      weight,
      creatinine,
      gender,
      guidelineMode
    });

    const cachedResult = localStorage.getItem(cacheKey);
    if (cachedResult && cachedResult.trim().length > 100) { // Ensure cache is substantial
      setResult(cachedResult);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(""); // Start with empty string for streaming
    setRefinementHistory([]); // Reset refinement history on new generation
    chatRef.current = null;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const systemDetails = selectedSystems.map(sysId => {
        const system = ORGAN_SYSTEMS.find(s => s.id === sysId);
        const selectedSubtypes = subtypes[sysId]?.map(stId => system?.subtypes.find(st => st.id === stId)?.label).filter(Boolean) || [];
        const activeLevers = levers[sysId]?.map(lId => system?.levers.find(l => l.id === lId)?.label).filter(Boolean) || [];
        return `- System: ${system?.label}\n  - Subtypes: ${selectedSubtypes.join(', ') || 'Not specified'}\n  - Modifiers: ${activeLevers.join(', ') || 'None'}`;
      }).join('\n');

      const crcl = crclValue;
      const renalStatus = crcl !== null ? `${crcl} mL/min` : "Normal";

      const systemInstruction = `
        You are an Expert ICU Pharmacologist and Infectious Disease Specialist. 
        Your task is to provide a comprehensive, evidence-based empiric antibiotic regimen for critically ill patients.
        
        STRICT GUIDELINE ADHERENCE:
        - If MODE is INDIAN: Use ONLY ICMR 2024, IJCCM, and NCDC Guidelines.
        - If MODE is INTERNATIONAL: Use ONLY IDSA, CDC, WHO, and Surviving Sepsis Campaign.
        
        OUTPUT FORMATTING:
        - Use Markdown headers (###) for sections.
        - Bold drug names (**Drug Name**).
        - Use tables for pathogen coverage and stewardship calendars.
        - Be concise but medically precise.
        - NEVER hallucinate guidelines.
        - If a loading dose is required, it MUST be mentioned.
        - Ensure the response is complete and covers all requested sections.
      `;

      const prompt = `
        STRICT GUIDELINE MODE: ${guidelineMode.toUpperCase()}
        
        Patient Parameters:
        - Septic Shock / Severe Sepsis: ${septicShock ? 'Yes' : 'No'}
        - Prior Broad-Spectrum ABX (90 days): ${priorAbx ? 'Yes' : 'No'}
        ${priorAbx ? `- Current/Prior ABX: ${priorAbxDrugs.join(', ')} for ${priorAbxDuration} days` : ''}
        ${priorAbx && wantsUpgrade ? '- USER REQUEST: Provide an UPGRADE over the current regimen. An upgrade MUST offer either: 1) Broader spectrum, 2) Improved PK/PD, or 3) Escalation based on suspected MDR risk.' : ''}
        - Penicillin Allergy: ${allergy}
        - Renal Function: ${renalStatus}
        ${voiceTranscript ? `- Additional Voice Context: ${voiceTranscript}` : ''}
        ${crcl !== null ? `- Age: ${age}, Gender: ${gender}, Weight: ${weight}kg, Creatinine: ${creatinine}mg/dL` : ''}

        Suspected Sources:
        ${systemDetails || 'None specified (provide general ICU empiric guidance if possible, or ask for source)'}

        REQUIRED SECTIONS (Use exact headers in this order):
        1. ### PRIMARY UNIFIED REGIMEN
        2. ### ALTERNATIVE REGIMEN
        3. ### PATHOGEN COVERAGE MATRIX (TABLE)
        4. ### SPECTRUM OF ACTIVITY (GRAPH DATA)
        5. ### NECESSARY INVESTIGATIONS
        6. ### ISOLATED REGIMENS
        7. ### CLINICAL RATIONALE
        8. ### MONITORING & DURATION
        9. ### DRUG-DRUG INTERACTION ALERTS
        10. ### DE-ESCALATION FLOWCHART
        11. ### CLINICAL PEARLS
        12. ### GUIDELINE REFERENCE
      `;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        }
      });

      let fullText = "";
      let hasStarted = false;
      for await (const chunk of responseStream) {
        if (chunk.text) {
          if (!hasStarted) {
            setResult(""); // Clear placeholder on first real chunk
            hasStarted = true;
          }
          fullText += chunk.text;
          setResult(fullText);
        }
      }

      if (!fullText || fullText.trim().length < 100) {
        console.warn("Empty or short response received, retrying once...");
        // Simple retry logic
        const retryResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: { systemInstruction }
        });
        if (retryResponse.text && retryResponse.text.length > 100) {
          fullText = retryResponse.text;
          setResult(fullText);
        } else {
          throw new Error("The model returned an incomplete response. Please check your inputs and try again.");
        }
      }

      // Cache the final result
      localStorage.setItem(cacheKey, fullText);
      setShouldAutoGenerate(false); // Reset auto-generate flag
    } catch (err: any) {
      console.error("Regimen Generation Error:", err);
      setError(err.message || "An error occurred while generating the regimen. Please try again.");
      setResult(null); // Clear the empty result on error
    } finally {
      setLoading(false);
    }
  }, [selectedSystems, subtypes, levers, septicShock, priorAbx, priorAbxDrugs, priorAbxDuration, wantsUpgrade, allergy, age, weight, creatinine, gender, guidelineMode, crclValue]);

  // Clear result when parameters change to prevent stale guidance
  React.useEffect(() => {
    if (!loading) setResult(null);
  }, [selectedSystems, subtypes, levers, septicShock, priorAbx, priorAbxDrugs, priorAbxDuration, wantsUpgrade, allergy, age, weight, creatinine, gender]);

  // Auto-regenerate if mode changes and we have a result
  React.useEffect(() => {
    if (result && !loading) {
      generateRegimen();
    }
  }, [guidelineMode]);

  // Handle auto-generation after voice review
  React.useEffect(() => {
    if (shouldAutoGenerate && !loading && !voiceReview) {
      generateRegimen();
    }
  }, [shouldAutoGenerate, loading, voiceReview, generateRegimen]);

  const searchDDI = async () => {
    if (!ddiSearchQuery || !result) return;
    setIsSearchingDDI(true);
    setDdiSearchResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const currentRegimen = result.split('### ALTERNATIVE REGIMEN')[showAlternative ? 1 : 0].split('###')[0];
      const prompt = `
        Current Antibiotic Regimen:
        ${currentRegimen}

        Question: Are there any critical drug-drug interactions between this regimen and the drug "${ddiSearchQuery}"?
        
        Provide a concise, clinical response focusing on ICU-relevant interactions. If no major interactions, state "No major clinical interactions identified."
      `;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setDdiSearchResult(response.text);
    } catch (err) {
      setDdiSearchResult("Error searching for interactions.");
    } finally {
      setIsSearchingDDI(false);
    }
  };

  const handleRefine = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!refinementInput.trim() || !result || isRefining) return;

    const userMsg = refinementInput.trim();
    setRefinementInput("");
    setRefinementHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsRefining(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      if (!chatRef.current) {
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: `You are an expert ICU Pharmacologist. You have already provided an initial antibiotic regimen. 
            The user is now asking questions or suggesting modifications. 
            Always consult the latest 2024/2025 guidelines (ICMR for Indian mode, IDSA/SSC for Global mode) using Google Search if needed.
            If the user suggests removing a drug or coverage (e.g., Gram-positive), explain the clinical consequences but respect their decision if they persist, and provide the best modified regimen.
            Maintain the same structured format for the regimen if it changes.`,
            tools: [{ googleSearch: {} }],
          },
        });
        // Seed the chat with the initial result
        await chatRef.current.sendMessage({ message: `Initial Context and Regimen:\n${result}` });
      }

      const response = await chatRef.current.sendMessage({ message: userMsg });
      setRefinementHistory(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (err: any) {
      setRefinementHistory(prev => [...prev, { role: 'model', text: `Error: ${err.message || "Failed to process request."}` }]);
    } finally {
      setIsRefining(false);
    }
  };

  const reset = () => {
    setSepticShock(false);
    setPriorAbx(false);
    setPriorAbxDrugs([]);
    setPriorAbxDuration('');
    setWantsUpgrade(false);
    setAllergy('None');
    setAge('');
    setWeight('');
    setCreatinine('');
    setGender('Male');
    setSelectedSystems([]);
    setSubtypes({});
    setLevers({});
    setResult(null);
    setError(null);
    setDdiSearchQuery('');
    setDdiSearchResult(null);
    setVoiceTranscript("");
    setRefinementHistory([]);
  };

  return (
    <div className={cn(
      "min-h-screen font-sans selection:bg-slate-200 flex flex-col transition-colors duration-300",
      theme === 'dark' ? "dark bg-slate-950 text-slate-100" : (theme === 'slate' ? "bg-slate-50 text-slate-900" : "bg-white text-slate-900")
    )}>
      {/* Header - Glassmorphism */}
      <header className={cn(
        "border-b shrink-0 sticky top-0 z-40 backdrop-blur-md",
        theme === 'dark' ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
      )}>
        <div className="max-w-[1600px] mx-auto px-4 h-14 sm:h-12 flex flex-col sm:flex-row items-center justify-between py-1 sm:py-0 gap-1 sm:gap-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={cn(
              "p-1.5 rounded-lg shadow-sm transition-colors",
              accentColor === 'emerald' ? "bg-emerald-600" : 
              accentColor === 'blue' ? "bg-blue-600" : 
              accentColor === 'indigo' ? "bg-indigo-600" : 
              accentColor === 'rose' ? "bg-rose-600" : "bg-slate-900"
            )}>
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h1 className={cn(
                "text-[10px] sm:text-xs font-black tracking-tighter uppercase leading-none",
                theme === 'dark' ? "text-white" : "text-slate-900"
              )}>ICU Antibiotic Navigator</h1>
              <p className="text-[6px] sm:text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Clinical Decision Support System</p>
            </div>
            <div className="flex sm:hidden items-center gap-2">
              <button onClick={() => setIsSettingsOpen(true)} className="p-1.5 text-slate-400"><Palette className="w-4 h-4" /></button>
              <button onClick={reset} className="p-1.5 text-slate-400"><RefreshCcw className="w-4 h-4" /></button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center">
            <div className={cn(
              "flex items-center p-0.5 rounded-xl border transition-all shadow-sm w-full sm:w-auto",
              theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
            )}>
              <button
                onClick={() => setGuidelineMode('indian')}
                className={cn(
                  "flex-1 sm:flex-none px-3 sm:px-4 py-1 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all",
                  guidelineMode === 'indian' 
                    ? (accentColor === 'emerald' ? "bg-emerald-600 text-white shadow-md" : "bg-slate-900 text-white shadow-md")
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                Indian
              </button>
              <button
                onClick={() => setGuidelineMode('international')}
                className={cn(
                  "flex-1 sm:flex-none px-3 sm:px-4 py-1 rounded-lg text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all",
                  guidelineMode === 'international' 
                    ? (accentColor === 'emerald' ? "bg-emerald-600 text-white shadow-md" : "bg-slate-900 text-white shadow-md")
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                Int'l
              </button>
            </div>
            
            <div className="hidden sm:flex items-center gap-3">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
                title="Settings"
              >
                <Palette className="w-4 h-4" />
              </button>
              <button 
                onClick={reset}
                className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100"
                title="Reset"
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-3 grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          
          {/* Patient Profile & Global Params */}
          <section className={cn(
            "p-3 rounded-lg border shadow-sm space-y-3 shrink-0",
            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          )}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-3">
                <h4 className={cn(
                  "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>
                  <User className="w-3 h-3" />
                  Patient Profile
                </h4>
                <button
                  onClick={startVoiceInput}
                  disabled={isParsingVoice}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded-full text-[8px] font-black uppercase transition-all",
                    isListening 
                      ? "bg-rose-500 text-white animate-pulse" 
                      : (theme === 'dark' ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200")
                  )}
                  title={isListening ? "Stop Recording" : "Start Recording"}
                >
                  {isListening ? <MicOff className="w-2.5 h-2.5" /> : <Mic className="w-2.5 h-2.5" />}
                  {isListening ? "Stop Recording" : (isParsingVoice ? "Parsing..." : "Voice Context")}
                </button>
              </div>
              
              <AnimatePresence>
                {voiceTranscript && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "p-3 rounded-xl border space-y-2",
                      theme === 'dark' ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Live Transcription</span>
                      {isListening && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />}
                    </div>
                    <p className={cn(
                      "text-[10px] font-medium leading-relaxed italic",
                      theme === 'dark' ? "text-slate-300" : "text-slate-600"
                    )}>
                      {voiceTranscript || "Listening for patient details..."}
                    </p>
                  </motion.div>
                )}

                {voiceReview && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "p-4 rounded-xl border shadow-xl space-y-4",
                      theme === 'dark' ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-2 text-emerald-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Review Parsed Findings</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Original Transcript</span>
                        <div className={cn(
                          "p-3 rounded-lg border text-[10px] font-medium italic max-h-40 overflow-y-auto",
                          theme === 'dark' ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600"
                        )}>
                          {voiceTranscript}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">AI Summary</span>
                        <div className="prose prose-xs dark:prose-invert max-h-40 overflow-y-auto">
                          <ReactMarkdown>{voiceReview.summary}</ReactMarkdown>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={acceptVoiceReview}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                          accentColor === 'rose' ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        )}
                      >
                        <Send className="w-3 h-3" />
                        Accept & Generate Regimen
                      </button>
                      <button
                        onClick={() => {
                          setVoiceReview(null);
                          setVoiceTranscript("");
                        }}
                        className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900"
                      >
                        Discard
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {crclValue && (
                <div className={cn(
                  "flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[8px] font-black uppercase",
                  accentColor === 'emerald' ? "bg-emerald-50 text-emerald-900" : 
                  accentColor === 'blue' ? "bg-blue-50 text-blue-900" : 
                  accentColor === 'indigo' ? "bg-indigo-50 text-indigo-900" : 
                  accentColor === 'rose' ? "bg-rose-50 text-rose-900" : (theme === 'dark' ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-900")
                )}>
                  <Calculator className="w-2.5 h-2.5" />
                  CrCl: {crclValue} mL/min
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-1">
                <label className={cn(
                  "text-[7px] font-black uppercase tracking-wider",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>Age</label>
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Yrs"
                  className={cn(
                    "w-full px-1.5 py-1 text-[10px] font-bold rounded border outline-none transition-all",
                    theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                />
              </div>
              <div className="space-y-1">
                <label className={cn(
                  "text-[7px] font-black uppercase tracking-wider",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>Weight</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="kg"
                  className={cn(
                    "w-full px-1.5 py-1 text-[10px] font-bold rounded border outline-none transition-all",
                    theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                />
              </div>
              <div className="space-y-1">
                <label className={cn(
                  "text-[7px] font-black uppercase tracking-wider",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>Creatinine</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  placeholder="mg/dL"
                  className={cn(
                    "w-full px-1.5 py-1 text-[10px] font-bold rounded border outline-none transition-all",
                    theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                />
              </div>
              <div className="space-y-1">
                <label className={cn(
                  "text-[7px] font-black uppercase tracking-wider",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>Gender</label>
                <RadioGroup 
                  options={['Male', 'Female']} 
                  value={gender} 
                  onChange={setGender} 
                  theme={theme}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <TogglePill 
                label="Shock" 
                active={septicShock} 
                onClick={() => setSepticShock(!septicShock)}
                icon={AlertCircle}
                theme={theme}
              />
              <TogglePill 
                label="Prior Abx" 
                active={priorAbx} 
                onClick={() => setPriorAbx(!priorAbx)}
                icon={History}
                theme={theme}
              />
              <div className="flex-1 space-y-1">
                <label className={cn(
                  "text-[7px] font-black uppercase tracking-wider",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>Penicillin Allergy</label>
                <RadioGroup 
                  options={['None', 'Non-mild', 'Severe']} 
                  value={allergy} 
                  onChange={setAllergy} 
                  theme={theme}
                />
              </div>
            </div>

            <AnimatePresence>
              {priorAbx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={cn(
                    "p-3 rounded-xl border space-y-3 mt-2",
                    theme === 'dark' ? "bg-slate-800/50 border-slate-700" : "bg-slate-50 border-slate-200"
                  )}>
                    <div className="space-y-2">
                      <label className={cn(
                        "text-[10px] font-black uppercase tracking-widest transition-colors",
                        theme === 'dark' ? "text-slate-300" : "text-slate-600"
                      )}>Select Current/Prior Antibiotics</label>
                        <div className="flex flex-wrap gap-1.5">
                          {ICU_ANTIBIOTICS.map((abx, idx) => (
                            <button
                              key={`${abx}-${idx}`}
                              onClick={() => {
                                if (priorAbxDrugs.includes(abx)) {
                                  setPriorAbxDrugs(priorAbxDrugs.filter(d => d !== abx));
                                } else {
                                  setPriorAbxDrugs([...priorAbxDrugs, abx]);
                                }
                              }}
                              className={cn(
                                "px-2 py-1 rounded-lg text-[8px] font-bold transition-all border",
                                priorAbxDrugs.includes(abx)
                                  ? (accentColor === 'emerald' ? "bg-emerald-600 border-emerald-500 text-white shadow-sm" : "bg-slate-900 dark:bg-slate-100 border-slate-800 dark:border-slate-200 text-white dark:text-slate-900 shadow-sm")
                                  : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900")
                              )}
                            >
                              {abx}
                            </button>
                          ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className={cn(
                          "text-[10px] font-black uppercase tracking-widest transition-colors",
                          theme === 'dark' ? "text-slate-300" : "text-slate-600"
                        )}>Duration (Days)</label>
                        <input 
                          type="number" 
                          value={priorAbxDuration}
                          onChange={(e) => setPriorAbxDuration(e.target.value)}
                          placeholder="e.g. 5"
                          className={cn(
                            "w-full px-2 py-1.5 text-[10px] font-bold rounded-lg border outline-none transition-all",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200"
                          )}
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => setWantsUpgrade(!wantsUpgrade)}
                          className={cn(
                            "w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-widest transition-all",
                            wantsUpgrade
                              ? "bg-amber-500 border-amber-400 text-white shadow-md"
                              : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900")
                          )}
                        >
                          <Zap className={cn("w-3 h-3", wantsUpgrade ? "fill-current" : "")} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest transition-colors",
                            wantsUpgrade ? "text-white" : (theme === 'dark' ? "text-slate-300" : "text-slate-600")
                          )}>
                            {wantsUpgrade ? 'Upgrade Requested' : 'Seek Upgrade?'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Organ Systems Grid - Bento Style */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className={cn(
                "text-xs font-black uppercase tracking-widest flex items-center gap-1.5",
                theme === 'dark' ? "text-slate-100" : "text-slate-900"
              )}>
                <Layers className="w-4 h-4" />
                Suspected Sources
              </h4>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => {
                    setSepticShock(true);
                    setPriorAbx(true);
                    setSelectedSystems(['lungs']);
                    setSubtypes({ lungs: ['vap'] });
                  }}
                  className={cn(
                    "px-2 py-1 text-[8px] font-black rounded uppercase tracking-widest transition-colors",
                    theme === 'dark' ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  )}
                >
                  Sepsis Bundle
                </button>
                <button 
                  onClick={() => {
                    setSelectedSystems(['urinary']);
                    setSubtypes({ urinary: ['uti'] });
                  }}
                  className={cn(
                    "px-2 py-1 text-[8px] font-black rounded uppercase tracking-widest transition-colors",
                    theme === 'dark' ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  )}
                >
                  Empiric UTI
                </button>
              </div>
            </div>
            <div className={cn(
              "grid grid-cols-2 sm:grid-cols-3 gap-3",
            )}>
              {ORGAN_SYSTEMS.map((system) => (
                <button
                  key={system.id}
                  onClick={() => toggleSystem(system.id)}
                  className={cn(
                    "flex flex-col items-start justify-between p-3 rounded-2xl transition-all duration-300 group relative border shadow-sm h-20",
                    selectedSystems.includes(system.id)
                      ? (accentColor === 'emerald' ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-200" : "bg-slate-950 border-slate-900 text-white shadow-slate-200")
                      : (theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-100 hover:border-slate-600" : "bg-white border-slate-100 text-slate-900 hover:border-slate-300 hover:shadow-md")
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-xl transition-colors",
                    selectedSystems.includes(system.id) 
                      ? "bg-white/20" 
                      : (theme === 'dark' ? "bg-slate-800" : "bg-slate-50 group-hover:bg-slate-100")
                  )}>
                    {React.isValidElement(system.icon) && React.cloneElement(system.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
                  </div>
                  
                  <div className="text-left">
                    <span className="text-xs font-black uppercase tracking-tighter leading-none block">{system.label}</span>
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest mt-1 block",
                      selectedSystems.includes(system.id) ? "text-white opacity-90" : (theme === 'dark' ? "text-slate-300" : "text-slate-600")
                    )}>
                      {system.subtypes.length} Subtypes
                    </span>
                  </div>

                  {selectedSystems.includes(system.id) && (
                    <motion.div 
                      layoutId={`check-${system.id}`}
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Modifiers */}
            <AnimatePresence>
              {selectedSystems.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 py-2">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em]",
                      theme === 'dark' ? "text-slate-100" : "text-slate-900"
                    )}>Configure Details Below</span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {selectedSystems.map(sysId => {
                    const system = ORGAN_SYSTEMS.find(s => s.id === sysId);
                    if (!system) return null;
                    return (
                      <motion.div 
                        key={sysId}
                        layout
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                          "p-3 rounded-xl border shadow-sm space-y-3",
                          theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "p-1 rounded-lg transition-colors",
                              theme === 'dark' ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-900"
                            )}>{system.icon}</div>
                            <h3 className={cn(
                              "text-xs font-black uppercase tracking-tight transition-colors",
                              theme === 'dark' ? "text-slate-100" : "text-slate-900"
                            )}>{system.label}</h3>
                          </div>
                          <button 
                            onClick={() => toggleSystem(sysId)}
                            className={cn(
                              "text-[8px] font-black uppercase transition-colors px-2 py-1 rounded-md",
                              theme === 'dark' ? "text-slate-400 hover:text-red-400 hover:bg-red-400/10" : "text-slate-600 hover:text-red-700 hover:bg-red-50"
                            )}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className={cn(
                              "text-[8px] font-black uppercase tracking-widest mb-2 transition-colors",
                              theme === 'dark' ? "text-slate-100" : "text-slate-900"
                            )}>Subtypes</p>
                            <div className="flex flex-wrap gap-1.5">
                              {system.subtypes.map(st => (
                                <button
                                  key={`${sysId}-subtype-${st.id}`}
                                  onClick={() => toggleSubtype(sysId, st.id)}
                                  className={cn(
                                    "px-2 py-1 rounded-lg text-[10px] font-bold border transition-all",
                                    subtypes[sysId]?.includes(st.id)
                                      ? (theme === 'dark' ? "bg-slate-100 border-slate-200 text-slate-950 shadow-sm" : "bg-slate-950 border-slate-950 text-white shadow-sm")
                                      : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-100 hover:text-white" : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-white hover:border-slate-300")
                                  )}
                                >
                                  {st.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className={cn(
                              "text-[8px] font-black uppercase tracking-widest mb-2 transition-colors",
                              theme === 'dark' ? "text-slate-100" : "text-slate-900"
                            )}>Levers / Modifiers</p>
                            <div className="grid grid-cols-1 gap-1.5">
                              {system.levers.map(lever => (
                                <button
                                  key={`${sysId}-lever-${lever.id}`}
                                  onClick={() => toggleLever(sysId, lever.id)}
                                  className={cn(
                                    "flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-left",
                                    levers[sysId]?.includes(lever.id)
                                      ? (theme === 'dark' ? "bg-emerald-900/40 border-emerald-700 text-emerald-300 shadow-sm" : "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm")
                                      : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-100 hover:text-white" : "bg-slate-50 border-slate-100 text-slate-900 hover:bg-white hover:border-slate-200")
                                  )}
                                >
                                  {levers[sysId]?.includes(lever.id) ? <CheckCircle2 className="w-3 h-3" /> : <div className={cn("w-3 h-3 rounded-full border", theme === 'dark' ? "border-slate-600" : "border-slate-300")} />}
                                  {lever.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          
          {/* Action Button */}
          <div className="space-y-3 shrink-0">
            <button
              onClick={generateRegimen}
              disabled={loading || selectedSystems.length === 0}
              className={cn(
                "w-full py-3 rounded-lg font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2",
                loading || selectedSystems.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : (theme === 'dark' 
                      ? "bg-white text-slate-950 hover:bg-slate-100" 
                      : cn(
                          "text-white hover:brightness-110 active:scale-[0.98] border-b-4 active:border-b-0",
                          accentColor === 'emerald' ? "bg-emerald-600 border-emerald-800" : 
                          accentColor === 'blue' ? "bg-blue-600 border-blue-800" : 
                          accentColor === 'indigo' ? "bg-indigo-600 border-indigo-800" : 
                          accentColor === 'rose' ? "bg-rose-600 border-rose-800" : "bg-slate-900 border-slate-700"
                        )
                    )
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Synthesizing Regimen...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  Generate Empiric Regimen
                </>
              )}
            </button>

            {/* Settings Modal Overlay */}
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={cn(
                      "w-full max-w-sm p-6 rounded-2xl border shadow-2xl space-y-6",
                      theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "text-xs font-black uppercase tracking-widest flex items-center gap-2",
                        theme === 'dark' ? "text-slate-100" : "text-slate-900"
                      )}>
                        <Palette className="w-4 h-4" />
                        Interface Settings
                      </h3>
                      <button onClick={() => setIsSettingsOpen(false)} className={cn(
                        "transition-colors",
                        theme === 'dark' ? "text-slate-400 hover:text-slate-100" : "text-slate-400 hover:text-slate-900"
                      )}>
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          theme === 'dark' ? "text-slate-100" : "text-slate-900"
                        )}>Theme Mode</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['light', 'dark', 'slate'] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => setTheme(t)}
                              className={cn(
                                "py-2 rounded-lg border text-[9px] font-black uppercase transition-all",
                                theme === t 
                                  ? (accentColor === 'emerald' ? "bg-emerald-600 border-emerald-600 text-white" : "bg-slate-900 border-slate-900 text-white")
                                  : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100")
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          theme === 'dark' ? "text-slate-100" : "text-slate-900"
                        )}>Accent Color</label>
                        <div className="grid grid-cols-5 gap-2">
                          {(['slate', 'emerald', 'blue', 'indigo', 'rose'] as const).map(c => (
                            <button
                              key={c}
                              onClick={() => setAccentColor(c)}
                              className={cn(
                                "h-8 rounded-lg border transition-all flex items-center justify-center",
                                accentColor === c ? "ring-2 ring-offset-2 ring-slate-400" : "",
                                c === 'slate' ? "bg-slate-900" : 
                                c === 'emerald' ? "bg-emerald-500" : 
                                c === 'blue' ? "bg-blue-500" : 
                                c === 'indigo' ? "bg-indigo-500" : "bg-rose-500"
                              )}
                            >
                              {accentColor === c && <Check className="w-4 h-4 text-white" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className={cn(
                        "text-[8px] font-bold uppercase tracking-tight text-center",
                        theme === 'dark' ? "text-slate-400" : "text-slate-500"
                      )}>
                        Changes are applied instantly to the dashboard
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Future Provisions Section */}
            <div className={cn(
              "p-3 rounded-lg border shadow-sm space-y-3",
              theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            )}>
              <div className={cn(
                "flex items-center justify-between border-b pb-2",
                theme === 'dark' ? "border-slate-800" : "border-slate-100"
              )}>
                <h4 className={cn(
                  "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                  theme === 'dark' ? "text-slate-100" : "text-slate-900"
                )}>
                  <Settings2 className="w-3 h-3" />
                  Advanced Stewardship
                </h4>
                <span className={cn(
                  "px-1.5 py-0.5 text-[7px] font-black rounded uppercase tracking-widest",
                  theme === 'dark' ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-900"
                )}>Provisioned</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    localStorage.clear();
                    setError("Cache cleared successfully.");
                    setTimeout(() => setError(null), 3000);
                  }}
                  className={cn(
                    "flex flex-col gap-1 p-2 rounded border group transition-all",
                    theme === 'dark' ? "bg-slate-800 border-slate-700 hover:border-slate-500" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Database className={cn("w-3 h-3", theme === 'dark' ? "text-slate-100" : "text-slate-900")} />
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-tighter",
                      theme === 'dark' ? "text-slate-100" : "text-slate-900"
                    )}>Clear Cache</span>
                  </div>
                  <p className={cn(
                    "text-[7px] font-bold leading-tight",
                    theme === 'dark' ? "text-slate-300" : "text-slate-600"
                  )}>Reset all stored regimens</p>
                </button>
                <div className={cn(
                  "flex flex-col gap-1 p-2 rounded border opacity-50 cursor-not-allowed group",
                  theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
                )}>
                  <div className="flex items-center gap-1.5">
                    <UserCog className={cn("w-3 h-3", theme === 'dark' ? "text-slate-100" : "text-slate-900")} />
                    <span className={cn(
                      "text-[8px] font-black uppercase tracking-tighter",
                      theme === 'dark' ? "text-slate-100" : "text-slate-900"
                    )}>Auto-Subtype</span>
                  </div>
                  <p className={cn(
                    "text-[7px] font-bold leading-tight",
                    theme === 'dark' ? "text-slate-300" : "text-slate-600"
                  )}>Automated patient data analysis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className={cn(
            "flex-1 rounded-lg border shadow-sm flex flex-col relative",
            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
            !result && !loading && "items-center justify-center p-6 text-center"
          )}>
            
            {result && (
              <div className={cn(
                "border-b px-4 py-2 flex items-center justify-between shrink-0",
                theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
              )}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-slate-500" />
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                      {guidelineMode === 'indian' ? 'ICMR/IJCCM Evidence' : 'IDSA/WHO Evidence'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowAlternative(!showAlternative)}
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black transition-all border",
                      showAlternative 
                        ? "bg-amber-50 border-amber-200 text-amber-700" 
                        : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
                    )}
                  >
                    <ArrowRightLeft className="w-2.5 h-2.5" />
                    {showAlternative ? 'SHOW PRIMARY' : 'SHOW ALTERNATIVE'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                    onClick={copyToClipboard}
                    className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 border rounded text-[8px] font-black transition-colors",
                      theme === 'dark' ? "bg-slate-700 border-slate-600 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
                    )}
                   >
                    {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                    {copied ? 'COPIED' : 'COPY'}
                   </button>
                   <div className={cn(
                     "flex items-center gap-1 px-1.5 py-0.5 rounded border",
                     theme === 'dark' ? "bg-emerald-900/40 text-emerald-300 border-emerald-800" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                   )}>
                     <ShieldCheck className="w-2.5 h-2.5" />
                     <span className="text-[8px] font-black uppercase tracking-tighter">Verified</span>
                   </div>
                </div>
              </div>
            )}

            <div className="flex-1 p-0">
              {loading ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <Loader2 className={cn(
                      "w-10 h-10 animate-spin", 
                      accentColor === 'emerald' ? "text-emerald-500" : 
                      accentColor === 'blue' ? "text-blue-500" : 
                      accentColor === 'indigo' ? "text-indigo-500" : 
                      accentColor === 'rose' ? "text-rose-500" : (theme === 'dark' ? "text-white" : "text-slate-900")
                    )} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={cn("w-1 h-1 rounded-full", theme === 'dark' ? "bg-white" : "bg-slate-900")} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className={cn("font-black text-[10px] uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
                      Consulting {guidelineMode === 'indian' ? 'Indian' : 'International'} Guidelines
                    </p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic font-serif">
                      {guidelineMode === 'indian' ? 'ICMR • IJCCM • NCDC' : 'IDSA • CDC • WHO • SSC'}
                    </p>
                  </div>
                </div>
              ) : result ? (
                <div className="flex flex-col" id="regimen-result">
                  {/* Highlighted Regimen Header */}
                  <div className={cn(
                    "p-6 sm:p-8 border-b-4 relative shrink-0 min-h-fit",
                    theme === 'dark' 
                      ? (accentColor === 'emerald' ? "bg-emerald-950/30 border-emerald-500/30" : "bg-slate-900/80 border-slate-700")
                      : (accentColor === 'emerald' ? "bg-emerald-50/80 border-emerald-500/20" : "bg-slate-50 border-slate-500/20")
                  )}>
                    {/* Decorative Background Element */}
                    <div className={cn(
                      "absolute -right-12 -top-12 w-48 h-48 rounded-full opacity-10 blur-3xl",
                      accentColor === 'emerald' ? "bg-emerald-600" : "bg-slate-900"
                    )} />

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-3 rounded-2xl shadow-xl ring-4 ring-white/50",
                          accentColor === 'emerald' ? "bg-emerald-600" : "bg-slate-900"
                        )}>
                          <Zap className="w-6 h-6 text-white fill-current" />
                        </div>
                        <div>
                          <h2 className={cn(
                            "text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] mb-1",
                            theme === 'dark' ? "text-slate-100" : "text-slate-900"
                          )}>Unified Optimized Regimen</h2>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm",
                              showAlternative ? "bg-amber-500 text-white" : (theme === 'dark' ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white")
                            )}>
                              {showAlternative ? 'Alternative Empiric Choice' : 'Primary Empiric Choice'}
                            </span>
                            <div className={cn(
                              "flex items-center gap-1.5 px-2 py-0.5 rounded-full border",
                              theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white/50 border-slate-200"
                            )}>
                              <Globe className={cn("w-2.5 h-2.5", theme === 'dark' ? "text-slate-100" : "text-slate-400")} />
                              <span className={cn(
                                "text-[8px] font-black uppercase tracking-widest",
                                theme === 'dark' ? "text-slate-100" : "text-slate-500"
                              )}>
                                {guidelineMode === 'indian' ? 'ICMR 2024' : 'IDSA/WHO'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button 
                          onClick={exportToPDF}
                          className={cn(
                            "flex-1 sm:flex-none flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all shadow-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-500 hover:text-white" : "bg-white border-slate-200 text-slate-900 hover:border-slate-400 hover:text-slate-950"
                          )}
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">PDF</span>
                        </button>
                        <button 
                          onClick={() => setShowAlternative(!showAlternative)}
                          className={cn(
                            "flex-1 sm:flex-none flex flex-row sm:flex-col items-center gap-2 sm:gap-1 px-5 py-2.5 rounded-2xl border-2 transition-all shadow-md group justify-center",
                            showAlternative 
                              ? (theme === 'dark' ? "bg-amber-950/40 border-amber-600 text-amber-300" : "bg-amber-50 border-amber-400 text-amber-700")
                              : (theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-100 hover:border-slate-500 hover:text-white" : "bg-white border-slate-200 text-slate-900 hover:border-slate-400 hover:text-slate-950")
                          )}
                        >
                          <ArrowRightLeft className={cn("w-4 h-4 transition-transform duration-300", showAlternative && "rotate-180")} />
                          <span className="text-[8px] font-black uppercase tracking-tighter">
                            {showAlternative ? 'Switch to Primary' : 'Switch to Alternative'}
                          </span>
                        </button>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "prose prose-sm max-w-none relative z-10",
                      "prose-strong:text-lg sm:prose-strong:text-xl prose-strong:font-black prose-strong:inline prose-strong:tracking-tight prose-strong:leading-none",
                      "prose-p:text-xs sm:prose-p:text-sm prose-p:font-bold prose-p:mb-2",
                      theme === 'dark' ? "prose-p:text-slate-300" : "prose-p:text-slate-700",
                      theme === 'dark'
                        ? (accentColor === 'emerald' ? "prose-strong:text-emerald-400" : "prose-strong:text-slate-100")
                        : (accentColor === 'emerald' ? "prose-strong:text-emerald-900" : "prose-strong:text-slate-900")
                    )}>
                      <ReactMarkdown>
                        {result.split('### ALTERNATIVE REGIMEN')[showAlternative ? 1 : 0].split('###')[showAlternative ? 0 : 1]}
                      </ReactMarkdown>
                    </div>

                    {/* Quick Reference Badge */}
                    <div className={cn(
                      "mt-6 flex items-center gap-4 border-t pt-4 relative z-10",
                      theme === 'dark' ? "border-slate-800" : "border-slate-200/50"
                    )}>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className={cn("w-3 h-3", theme === 'dark' ? "text-emerald-400" : "text-emerald-600")} />
                        <span className={cn("text-[9px] font-black uppercase", theme === 'dark' ? "text-slate-100" : "text-slate-900")}>Stewardship Verified</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className={cn("w-3 h-3", theme === 'dark' ? "text-amber-400" : "text-amber-500")} />
                        <span className={cn("text-[9px] font-black uppercase", theme === 'dark' ? "text-slate-100" : "text-slate-900")}>Renal Adjusted</span>
                      </div>
                    </div>
                  </div>

                  {/* Refinement Chat Interface */}
                  <div className={cn(
                    "border-t p-6 space-y-6",
                    theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-slate-50/50 border-slate-100"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={cn(
                            "text-xs font-black uppercase tracking-widest",
                            theme === 'dark' ? "text-slate-100" : "text-slate-900"
                          )}>Regimen Refinement</h3>
                          <p className={cn(
                            "text-[10px] font-bold",
                            theme === 'dark' ? "text-slate-300" : "text-slate-600"
                          )}>Ask questions or suggest modifications to this regimen</p>
                        </div>
                      </div>
                      {isRefining && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span className="text-[10px] font-black uppercase tracking-widest">AI Thinking...</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {refinementHistory.map((msg, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex flex-col gap-1.5 max-w-[90%] sm:max-w-[80%]",
                            msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                          )}
                        >
                          <div className={cn(
                            "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                            msg.role === 'user' 
                              ? "bg-emerald-600 text-white rounded-tr-none" 
                              : (theme === 'dark' ? "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700" : "bg-white text-slate-900 rounded-tl-none border border-slate-100")
                          )}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 px-1">
                            {msg.role === 'user' ? 'Clinical User' : 'ICU Pharmacologist AI'}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <form onSubmit={handleRefine} className="relative group">
                      <input 
                        type="text"
                        value={refinementInput}
                        onChange={e => setRefinementInput(e.target.value)}
                        placeholder="e.g., 'Is gram-positive coverage necessary here?' or 'Remove Vancomycin'"
                        className={cn(
                          "w-full pl-4 pr-12 py-4 rounded-2xl text-sm border-2 transition-all outline-none shadow-sm",
                          theme === 'dark' 
                            ? "bg-slate-900 border-slate-800 text-slate-100 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10" 
                            : "bg-white border-slate-200 text-slate-900 focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5"
                        )}
                      />
                      <button 
                        type="submit"
                        disabled={isRefining || !refinementInput.trim()}
                        className={cn(
                          "absolute right-2 top-2 bottom-2 px-4 rounded-xl transition-all flex items-center justify-center",
                          !refinementInput.trim() || isRefining
                            ? "bg-slate-100 text-slate-300"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md active:scale-95"
                        )}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>

                    {refinementHistory.length === 0 && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          "Why this specific dose?",
                          "Remove gram-positive coverage",
                          "Any alternative for renal failure?",
                          "What are the side effects?"
                        ].map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => setRefinementInput(suggestion)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all",
                              theme === 'dark' 
                                ? "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200" 
                                : "border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800"
                            )}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pathogen Coverage Matrix Collapsible */}
                  {result.includes('### PATHOGEN COVERAGE MATRIX') && (
                    <CollapsibleSection
                      title="Pathogen Coverage Matrix"
                      isOpen={showPathogenMatrix}
                      onToggle={() => setShowPathogenMatrix(!showPathogenMatrix)}
                      icon={Activity}
                      theme={theme}
                    >
                      <div className="prose prose-xs dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result.split('### PATHOGEN COVERAGE MATRIX')[1]?.split('###')[0] || ''}
                        </ReactMarkdown>
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Spectrum of Activity Graph */}
                  {spectrumData.length > 0 && (
                    <div className={cn(
                      "p-4 rounded-xl border mb-4",
                      theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                    )}>
                      <h4 className={cn(
                        "text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2",
                        theme === 'dark' ? "text-slate-100" : "text-slate-900"
                      )}>
                        <Crosshair className="w-3 h-3" />
                        Spectrum of Activity
                      </h4>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={spectrumData}>
                            <PolarGrid stroke={theme === 'dark' ? "#475569" : "#cbd5e1"} />
                            <PolarAngleAxis 
                              dataKey="subject" 
                              tick={{ fontSize: 8, fontWeight: 900, fill: theme === 'dark' ? "#f1f5f9" : "#0f172a" }} 
                            />
                            <Radar
                              name="Coverage"
                              dataKey="A"
                              stroke={accentColor === 'emerald' ? "#10b981" : "#6366f1"}
                              fill={accentColor === 'emerald' ? "#10b981" : "#6366f1"}
                              fillOpacity={0.5}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* Necessary Investigations Collapsible */}
                  {result.includes('### NECESSARY INVESTIGATIONS') && (
                    <CollapsibleSection
                      title="Necessary Investigations"
                      isOpen={showInvestigations}
                      onToggle={() => setShowInvestigations(!showInvestigations)}
                      icon={Microscope}
                      theme={theme}
                    >
                      {result.split('### NECESSARY INVESTIGATIONS')[1]?.split('###')[0]?.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*')).map((line, idx) => (
                        <div key={idx} className={cn(
                          "flex items-start gap-2 p-2 rounded-lg border",
                          theme === 'dark' ? "bg-amber-900/30 border-amber-800" : "bg-amber-50 border-amber-100"
                        )}>
                          <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <div className={cn(
                            "text-[10px] font-bold",
                            theme === 'dark' ? "text-amber-100" : "text-amber-950"
                          )}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {line.replace(/^[-*]\s*/, '')}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </CollapsibleSection>
                  )}

                  {/* Isolated Regimens Collapsible */}
                  {result.includes('### ISOLATED REGIMENS') && (
                    <CollapsibleSection
                      title="Isolated Regimens"
                      isOpen={showIsolated}
                      onToggle={() => setShowIsolated(!showIsolated)}
                      icon={Layers}
                      theme={theme}
                    >
                      {result.split('### ISOLATED REGIMENS')[1]?.split('###')[0]?.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*')).map((line, idx) => (
                        <div key={idx} className={cn(
                          "flex items-start gap-2 p-2 rounded-lg border",
                          theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-100"
                        )}>
                          <div className="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <div className={cn(
                            "text-[10px] font-bold prose-strong:text-indigo-800 dark:prose-strong:text-indigo-300",
                            theme === 'dark' ? "text-slate-100" : "text-slate-900"
                          )}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {line.replace(/^[-*]\s*/, '')}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </CollapsibleSection>
                  )}

                  {/* Detailed Breakdown */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {result.includes('### CLINICAL RATIONALE') && (
                      <CollapsibleSection
                        title="Clinical Rationale"
                        isOpen={showRationale}
                        onToggle={() => setShowRationale(!showRationale)}
                        icon={Lightbulb}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### CLINICAL RATIONALE')[1]?.split('###')[0] || ''}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### MONITORING & DURATION') && (
                      <CollapsibleSection
                        title="Monitoring & Duration"
                        isOpen={showMonitoring}
                        onToggle={() => setShowMonitoring(!showMonitoring)}
                        icon={Clock}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### MONITORING & DURATION')[1]?.split('###')[0] || ''}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### DRUG-DRUG INTERACTION ALERTS') && (
                      <CollapsibleSection
                        title="Critical DDI Alerts"
                        isOpen={showDDI}
                        onToggle={() => setShowDDI(!showDDI)}
                        icon={AlertTriangle}
                        theme={theme}
                      >
                        <div className="space-y-4">
                          <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {result.split('### DRUG-DRUG INTERACTION ALERTS')[1]?.split('###')[0] || ''}
                            </ReactMarkdown>
                          </div>
                          
                          <div className={cn(
                            "p-3 rounded-xl border space-y-2",
                            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
                          )}>
                            <label className={cn(
                              "text-[8px] font-black uppercase tracking-widest",
                              theme === 'dark' ? "text-slate-300" : "text-slate-600"
                            )}>Search Specific Interaction</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                value={ddiSearchQuery}
                                onChange={(e) => setDdiSearchQuery(e.target.value)}
                                placeholder="Enter drug name (e.g. Amiodarone)"
                                className={cn(
                                  "flex-1 px-2 py-1.5 text-[10px] font-bold rounded-lg border outline-none transition-all",
                                  theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
                                )}
                              />
                              <button
                                onClick={searchDDI}
                                disabled={isSearchingDDI || !ddiSearchQuery}
                                className={cn(
                                  "px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                  accentColor === 'emerald' ? "bg-emerald-600 text-white" : "bg-slate-900 text-white",
                                  (isSearchingDDI || !ddiSearchQuery) && "opacity-50 cursor-not-allowed"
                                )}
                              >
                                {isSearchingDDI ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                                Search
                              </button>
                            </div>
                            
                            {ddiSearchResult && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                  "mt-2 p-2 rounded-lg text-[9px] font-medium border",
                                  ddiSearchResult.includes('No major') 
                                    ? (theme === 'dark' ? "bg-emerald-900/30 border-emerald-800 text-emerald-100" : "bg-emerald-50 border-emerald-100 text-emerald-900")
                                    : (theme === 'dark' ? "bg-amber-900/30 border-amber-800 text-amber-100" : "bg-amber-50 border-amber-100 text-amber-900")
                                )}
                              >
                                <ReactMarkdown>{ddiSearchResult}</ReactMarkdown>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### DE-ESCALATION FLOWCHART') && (
                      <CollapsibleSection
                        title="De-escalation Flowchart & Stewardship Calendar"
                        isOpen={showDeEscalation}
                        onToggle={() => setShowDeEscalation(!showDeEscalation)}
                        icon={ArrowRightLeft}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert prose-p:text-slate-900 dark:prose-p:text-slate-100 prose-strong:text-slate-950 dark:prose-strong:text-white font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### DE-ESCALATION FLOWCHART')[1]?.split('###')[0] || ''}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### COST-CONSCIOUS ALTERNATIVES') && (
                      <CollapsibleSection
                        title="Cost-Conscious Alternatives"
                        isOpen={true} // Default open for visibility
                        onToggle={() => {}} // Static for now
                        icon={Scale}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### COST-CONSCIOUS ALTERNATIVES')[1]?.split('###')[0] || ''}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### CLINICAL PEARLS') && (
                      <CollapsibleSection
                        title="Clinical Pearls"
                        isOpen={showPearls}
                        onToggle={() => setShowPearls(!showPearls)}
                        icon={Zap}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### CLINICAL PEARLS')[1]?.split('###')[0] || ''}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}

                    {result.includes('### GUIDELINE REFERENCE') && (
                      <CollapsibleSection
                        title="Guideline Reference"
                        isOpen={showGuideline}
                        onToggle={() => setShowGuideline(!showGuideline)}
                        icon={BookOpen}
                        theme={theme}
                      >
                        <div className="prose prose-xs max-w-none dark:prose-invert font-bold">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {result.split('### GUIDELINE REFERENCE')[1]?.split('###')[0] || 'Reference not provided.'}
                          </ReactMarkdown>
                        </div>
                      </CollapsibleSection>
                    )}
                  </div>
                </div>
              ) : error ? (
                <div className="text-center space-y-2">
                  <AlertCircle className="w-6 h-6 text-red-500 mx-auto" />
                  <p className="text-red-600 text-[10px] font-black uppercase">{error}</p>
                  <button onClick={generateRegimen} className="text-[9px] font-black text-slate-900 underline">RETRY</button>
                </div>
              ) : (
                <div className="flex flex-col items-center opacity-40">
                  <Settings2 className="w-10 h-10 text-slate-300 mb-3" />
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting Parameters</h3>
                  <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter mt-1">Configure sources to generate regimen</p>
                </div>
              )}
            </div>

            {result && (
              <div className="bg-slate-900 px-4 py-1.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-slate-500" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Evidence Synthesis Complete</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[7px] font-black text-slate-500">ICMR</span>
                  <span className="text-[7px] font-black text-slate-500">IJCCM</span>
                  <span className="text-[7px] font-black text-slate-500">IDSA</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .prose-xs {
          font-size: 0.7rem;
          line-height: 1.25;
        }
        .prose {
          color: inherit !important;
          max-width: none;
        }
        .prose p, .prose li, .prose strong, .prose span, .prose h1, .prose h2, .prose h3, .prose h4 {
          color: inherit !important;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.7rem;
        }
        .prose th, .prose td {
          border: 1px solid #e2e8f0;
          padding: 0.4rem;
          text-align: left;
        }
        .dark .prose th, .dark .prose td {
          border-color: #334155;
        }
        .prose th {
          background-color: #f8fafc;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #1e293b !important;
        }
        .dark .prose th {
          background-color: #1e293b;
          color: #f1f5f9 !important;
        }
        .prose td {
          color: inherit !important;
          font-weight: 700;
        }
      `}} />
    </div>
  );
}
