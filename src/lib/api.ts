
export async function getTaskSuggestion(task: string): Promise<string> {
  const response = await fetch("http://127.0.0.1:8000/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task }),
  });

  if (!response.ok) {
    throw new Error("Failed to get suggestion");
  }

  const data = await response.json();
  return data.suggestion;
}

