// AI Mock responses for AI-Powered Patient Triage & Routing
// Used for demos when no API key is configured

export function generateMockResponse(input: string): string {
  return `
Based on your input regarding "Hospitals and health systems":

**Analysis Complete**

Our AI-Powered Patient Triage & Routing system has processed your request. Here's a summary:

1. **Input Received**: ${input}
2. **Processing**: Applied Natural Language Processing (NLP) for understanding patient-reported symptoms.
3. **Result**: Demo response generated

For production use, this would connect to:
- Electronic Health Record (EHR) systems (e.g., Epic, Cerner, Meditech)
- Hospital information systems (HIS)
- Urgent care center management systems

Contact us to enable full AI capabilities.
`
}

export const industryConfig = {
  name: 'Hospitals and health systems',
  idea: 'AI-Powered Patient Triage & Routing',
  targetUsers: 'Hospitals, health systems, urgent care centers, patients.',
  aiCapabilities: [
  "Natural Language Processing (NLP) for understanding patient-reported symptoms.",
  "Machine Learning (ML) for predicting the optimal care setting based on symptoms, medical history, and risk factors.",
  "Predictive modeling for anticipating patient flow and resource needs.",
  "Risk stratification models for prioritizing critical cases."
],
}
