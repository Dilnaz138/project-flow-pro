
const API_URL = 'https://projectflow-ai-backend.onrender.com'

export async function getTaskSuggestion(task: string): Promise<string> {
  const response = await fetch(`${API_URL}/suggest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  })

  if (!response.ok) {
    throw new Error('Failed to get suggestion')
  }

  const data: { suggestion: string } = await response.json()
  return data.suggestion
}
